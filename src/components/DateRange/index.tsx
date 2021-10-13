import React, { Component } from 'react';
import Calendar from '../Calendar';
import { findNextRangeIndex, generateStyles } from '../../utils';
import { isBefore, differenceInCalendarDays, addDays, min, isWithinInterval, max } from 'date-fns';
import coreStyles, { ClassNames } from '../../styles';
import { DateRangeProps, isNoEndDateRange, isRangeValue, isSureRange, NotFullyEmptyRange, Preview, MaybeEmptyRange, RangeFocus, SureStartEndDate } from '../../types';
import classnames from 'classnames';
import { compose } from 'ramda';

type DefaultComponentProps = {
  classNames: Partial<ClassNames>;
  ranges: NotFullyEmptyRange[];
  moveRangeOnFirstSelection: boolean;
  retainEndDateOnFirstSelection: boolean;
  rangeColors: string[];
  disabledDates: Date[],
}

type ComponentState = {
  focusedRange: RangeFocus;
  preview: null | Preview;
}

const calculateEndDate = (value: Date, now: Date, endDate: Date | null, dayOffset: number, moveRangeOnFirstSelection: boolean, retainEndDateOnFirstSelection: boolean, maxDate?: Date) => {
  const userEndDate = (() => {
    if (moveRangeOnFirstSelection) {
      return addDays(value, dayOffset);
    }
    if (retainEndDateOnFirstSelection) {
      if (!endDate || isBefore(value, endDate)) {
        return endDate;
      }
      return value;
    }
    return value || now;
  })();
  const nextEndDate = maxDate ? (userEndDate ? min([userEndDate, maxDate]) : maxDate) : userEndDate ;
  // if (nextEndDate === null) {
  //   throw new Error('Bug! endDate is null, and it should not. RetainEndDateOnFirstSelection tiggers buggy behavior, what should the endDate be now that retainEDFS is true?');
  // }
  return nextEndDate;
};

type ShapeChangingParams = { value: Date | MaybeEmptyRange; };
type BaseParams = { focusedRange: RangeFocus; disabledDates: Date[]; ranges: MaybeEmptyRange[]; }
type ComputeProps = BaseParams & ShapeChangingParams & { selectedRange: NotFullyEmptyRange; moveRangeOnFirstSelection: boolean; retainEndDateOnFirstSelection: boolean; maxDate?: Date; };
function computeStartDateEndDate({ value, selectedRange, focusedRange, disabledDates, moveRangeOnFirstSelection, retainEndDateOnFirstSelection, ranges, maxDate }: ComputeProps) {
  const base = {
    isStartDateSelected: focusedRange[1] === 0,
    focusedRange,
    disabledDates,
    ranges,
  }
  if (isRangeValue(value)) {
    if (!isSureRange(value)) {
      console.log(value);
      throw new Error('Bug, expecting value to be a SureRange (aka startDate and endDate instanceof Date), but not the case!');
    }
    return {
      ...base,
      startDate: value.startDate,
      endDate: value.endDate,
    };
  }
  if (focusedRange[1] === 0) {
    // startDate selection
    const now = new Date();
    const dayOffset = differenceInCalendarDays(selectedRange.endDate || now, selectedRange.startDate);
    return {
      ...base,
      startDate: value,
      endDate: calculateEndDate(value, now, selectedRange.endDate, dayOffset, moveRangeOnFirstSelection, retainEndDateOnFirstSelection, maxDate),
      nextFocusRange: [focusedRange[0], 1] as RangeFocus,
    };
  } else {
    return {
      ...base,
      startDate: selectedRange.startDate,
      endDate: value,
    }
  }
}

type FlipProps = BaseParams & NotFullyEmptyRange & { nextFocusRange?: RangeFocus; isStartDateSelected: boolean; };
const flipIfReversed = (params: FlipProps) => {
  const { startDate, endDate, isStartDateSelected } = params;
  return endDate && isBefore(endDate, startDate)
    ? {
      ...params,
      isStartDateSelected: !isStartDateSelected,
      startDate: endDate,
      endDate: startDate,
    }
    : params;
}

const getNextFocusRange = (ranges: MaybeEmptyRange[], focusedRange: RangeFocus, nextFocusRange?: RangeFocus): RangeFocus => {
  if (nextFocusRange) return nextFocusRange;
  const nextFocusRangeIndex = findNextRangeIndex(ranges, focusedRange[0]);
  return [nextFocusRangeIndex, 0];
}

const computeRange = ({ disabledDates, startDate, endDate, isStartDateSelected, focusedRange, nextFocusRange, ranges }: FlipProps) => {
  const inValidDatesWithinRange = disabledDates.filter(disabledDate =>
    endDate && isWithinInterval(disabledDate, {
      start: startDate,
      end: endDate,
  }));

  const wasValid = !(inValidDatesWithinRange.length > 0);

  const range = {
    startDate: !wasValid && isStartDateSelected
      ? addDays(max(inValidDatesWithinRange), 1)
      : startDate,
    endDate: !wasValid && !isStartDateSelected
      ? addDays(min(inValidDatesWithinRange), -1)
      : endDate,
  };

  return {
    wasValid,
    range,
    nextFocusRange: getNextFocusRange(ranges, focusedRange, nextFocusRange),
  };
}

type CalcNewSelectionRet = {
  wasValid: boolean;
  range: {
    startDate: Date;
    endDate: Date | null;
  };
  nextFocusRange: RangeFocus;
} | undefined;

const getRes = compose(computeRange, flipIfReversed, computeStartDateEndDate);

type ComponentProps = DateRangeProps & DefaultComponentProps;

class DateRange extends Component<ComponentProps, ComponentState> {
  public static defaultProps: DefaultComponentProps = {
    classNames: {},
    ranges: [],
    moveRangeOnFirstSelection: false,
    retainEndDateOnFirstSelection: false,
    rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
    disabledDates: [],
  };
  styles: Partial<ClassNames>;
  calendar: Calendar | null;

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      focusedRange: props.initialFocusedRange || [findNextRangeIndex(this.props.ranges), 0],
      preview: null,
    };
    this.styles = generateStyles([coreStyles, this.props.classNames]);
    this.calendar = null;
  }

  calcNewSelection = (value: Date | MaybeEmptyRange): CalcNewSelectionRet => {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const {
      ranges,
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      retainEndDateOnFirstSelection,
      disabledDates,
    } = this.props;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];

    if (!selectedRange || !onChange) return;

    if (!isSureRange(selectedRange) && !isNoEndDateRange(selectedRange)) {
      console.log('selectedRange', selectedRange);
      console.log('value', value);
      throw new Error('Bug, expecting selected range to be a sure range or no end date range, but it is neither');
    }

    return getRes({
      value,
      selectedRange,
      focusedRange,
      disabledDates,
      moveRangeOnFirstSelection,
      ranges,
      retainEndDateOnFirstSelection,
      maxDate,
    });

  };

  setSelection = (value: Date | SureStartEndDate<Date>) => {
    const { onChange, ranges, onRangeFocusChange } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange) return;
    const newSelection = this.calcNewSelection(value);
    if (!newSelection) {
      throw new Error('Bug, expecting new selection to not be undefined');
    }
    onChange && onChange({
      [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
        ...selectedRange,
        ...newSelection.range,
      },
    });
    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null,
    });
    onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
  };
  handleRangeFocusChange = (focusedRange: RangeFocus) => {
    this.setState({ focusedRange });
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  };

  updatePreview = (val?: { range: NotFullyEmptyRange; }) => {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const { rangeColors, ranges } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const color = ranges[focusedRange[0]]?.color || rangeColors[focusedRange[0]];
    this.setState({ preview: { ...val.range, color } });
  };
  render() {
    return (
      <Calendar
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        onPreviewChange={(date?: Date) => {
          const newSelection = date ? this.calcNewSelection(date) : undefined;
          this.updatePreview(newSelection);
        } }
        {...this.props}
        displayMode={"dateRange"}
        className={classnames(this.styles.dateRangeWrapper, this.props.className)}
        onChange={this.setSelection}
        updateRange={this.setSelection}
        ref={target => {
          this.calendar = target;
        } }
      />
    );
  }
}

export default DateRange;
