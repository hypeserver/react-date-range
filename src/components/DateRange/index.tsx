import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar, { CalendarProps } from '../Calendar';
import { rangeShape } from '../DayCell';
import { findNextRangeIndex, generateStyles } from '../../utils';
import { isBefore, differenceInCalendarDays, addDays, min, isWithinInterval, max } from 'date-fns';
import classnames from 'classnames';
import coreStyles from '../../styles';
import { DisplayMode, DateRange as DateRangeObject } from '../../utilsTypes';
import { Preview, Styles } from '../DayCell/types';
import { InputRange } from '../../defaultRangesTypes';


export interface DateRangeProps extends Omit<CalendarProps, 'onChange'> {
  focusedRange: number[]
  initialFocusedRange: number[]
  moveRangeOnFirstSelection: boolean
  retainEndDateOnFirstSelection: boolean
  className: string
  onChange: (ranges: [{ [key: string]: DateRangeObject }]) => void
  ranges: DateRangeObject[]
}

interface DateRangeState {
  preview: Preview | null
  focusedRange: number[]
}

class DateRange extends Component<DateRangeProps, DateRangeState> {
  static propTypes = {};
  static defaultProps = {}
  styles: Styles
  calendar: Calendar | null = null

  // FIXME: context
  constructor(props: DateRangeProps, context: any) {
    super(props, context);
    this.state = {
      focusedRange: props.initialFocusedRange || [findNextRangeIndex(props.ranges), 0],
      preview: null,
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }

  calcNewSelection = (value: Date | DateRangeObject, isSingleValue = true): Preview | undefined => {
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
    if (!selectedRange || !onChange) return undefined
    let { startDate, endDate } = selectedRange;
    const now = new Date();
    let nextFocusRange;
    // FIXME: get rid of isSingleValue
    if (!isSingleValue) {
      startDate = (value as DateRangeObject).startDate;
      endDate = (value as DateRangeObject).endDate;
    } else if (focusedRange[1] === 0) {
      // startDate selection
      const dayOffset = differenceInCalendarDays(endDate || now, startDate);
      const calculateEndDate = () => {
        if (moveRangeOnFirstSelection) {
          return addDays(value as Date, dayOffset);
        }
        if (retainEndDateOnFirstSelection) {
          if (!endDate || isBefore(value as Date, endDate)) {
            return endDate;
          }
          return value;
        }
        return value || now;
      };
      startDate = value as Date;
      endDate = calculateEndDate() as Date;
      if (maxDate) endDate = min([endDate, maxDate]);
      nextFocusRange = [focusedRange[0], 1];
    } else {
      endDate = value as Date;
    }

    // reverse dates if startDate before endDate
    let isStartDateSelected = focusedRange[1] === 0;
    if (isBefore(endDate, startDate)) {
      isStartDateSelected = !isStartDateSelected;
      [startDate, endDate] = [endDate, startDate];
    }

    const inValidDatesWithinRange = disabledDates.filter(disabledDate =>
      isWithinInterval(disabledDate, {
        start: startDate,
        end: endDate,
      })
    );

    if (inValidDatesWithinRange.length > 0) {
      if (isStartDateSelected) {
        startDate = addDays(max(inValidDatesWithinRange), 1);
      } else {
        endDate = addDays(min(inValidDatesWithinRange), -1);
      }
    }

    if (!nextFocusRange) {
      const nextFocusRangeIndex = findNextRangeIndex(this.props.ranges, focusedRange[0]);
      nextFocusRange = [nextFocusRangeIndex, 0];
    }
    return {
      range: { startDate, endDate },
    } as Preview;
  };

  setSelection = (value: Date | DateRangeObject, isSingleValue: boolean) => {
    const { onChange, ranges, onRangeFocusChange } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange) return;
    const newSelection = this.calcNewSelection(value, isSingleValue);
    onChange({
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
  handleRangeFocusChange = (focusedRange: number[]) => {
    this.setState({ focusedRange });
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  };

  updatePreview = (val?: Preview) => {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const { rangeColors, ranges } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const color = ranges[focusedRange[0]]?.color || rangeColors[focusedRange[0]] || this.props.color;
    this.setState({ preview: { ...val.range, color } as Preview });
  };

  render() {
    return (
      <Calendar
        {...this.props}
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        onPreviewChange={value => {
          this.updatePreview(value ? this.calcNewSelection(value) : undefined);
        }}
        displayMode={DisplayMode.DATE_RANGE}
        classNames={classnames(this.styles.dateRangeWrapper, this.props.className)}
        onChange={(val) => this.setSelection(val as Date, true)}
        updateRange={(val) => this.setSelection(val as DateRangeObject, false)}
        ref={target => {
          this.calendar = target;
        }}
      />
    );
  }
}

DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  retainEndDateOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: [],
};

DateRange.propTypes = {
  ...Calendar.propTypes,
  onChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  className: PropTypes.string,
  ranges: PropTypes.arrayOf(rangeShape),
  moveRangeOnFirstSelection: PropTypes.bool,
  retainEndDateOnFirstSelection: PropTypes.bool,
};

export default DateRange;
