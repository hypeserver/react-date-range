import React, { useEffect, useRef, useState } from 'react';
import Calendar from '../Calendar';
import { findNextRangeIndex, generateStyles } from '../../utils';
import { isBefore, differenceInCalendarDays, addDays, min, isWithinInterval, max } from 'date-fns';
import coreStyles, { ClassNames } from '../../styles';
import { DateRangeProps, isNoEndDateRange, isRangeValue, isSureRange, NotFullyEmptyRange, Preview, MaybeEmptyRange, RangeFocus, SureStartEndDate } from '../../types';
import classnames from 'classnames';
import { compose } from 'ramda';

type DefaultComponentProps = {
  classNames?: Partial<ClassNames>;
  ranges?: NotFullyEmptyRange[];
  moveRangeOnFirstSelection?: boolean;
  retainEndDateOnFirstSelection?: boolean;
  rangeColors?: string[];
  disabledDates?: Date[],
};
export type DateRangeDCP = DefaultComponentProps;

type ComponentProps = DateRangeProps & DefaultComponentProps & { nextPreviewRange?: MaybeEmptyRange; };
export type DateRangeCP = ComponentProps;

export type RangeSelection = {
  wasValid: boolean;
  range: {
    startDate: Date;
    endDate: Date | null;
  };
  nextFocusRange: RangeFocus;
};


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

const getRes = compose(computeRange, flipIfReversed, computeStartDateEndDate);

export const calcNewSelectionGen = (props: Readonly<ComponentProps>, stateFocusedRange: RangeFocus) => (value: Date | MaybeEmptyRange | undefined): RangeSelection | undefined => {

  if (value === undefined) return undefined;

  const focusedRange = props.focusedRange || stateFocusedRange;
  const {
    ranges,
    onChange,
    maxDate,
    moveRangeOnFirstSelection,
    retainEndDateOnFirstSelection,
    disabledDates,
  } = props;
  const focusedRangeIndex = focusedRange[0];
  const selectedRange = ranges && ranges[focusedRangeIndex];

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
    disabledDates: disabledDates || [],
    moveRangeOnFirstSelection: moveRangeOnFirstSelection || false,
    ranges,
    retainEndDateOnFirstSelection: retainEndDateOnFirstSelection || false,
    maxDate,
  });

};

const setSelectionGen = (props: ComponentProps, stateFocusedRange: RangeFocus, setFocusedRange: React.Dispatch<React.SetStateAction<RangeFocus>>, setPreview: React.Dispatch<React.SetStateAction<Preview | null>>) => (value: Date | SureStartEndDate<Date>) => {
  const { onChange, ranges, onRangeFocusChange } = props;
  const focusedRange = props.focusedRange || stateFocusedRange;
  const focusedRangeIndex = focusedRange[0];
  const selectedRange = ranges && ranges[focusedRangeIndex];
  if (!selectedRange) return;
  const newSelection = calcNewSelectionGen(props, focusedRange)(value);
  if (!newSelection) {
    throw new Error('Bug, expecting new selection to not be undefined');
  }
  onChange && onChange({
    [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
      ...selectedRange,
      ...newSelection.range,
    },
  });

  setFocusedRange(newSelection.nextFocusRange);
  setPreview(null);
  onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
};

const handleRangeFocusChangeGen = (setFocusedRange: React.Dispatch<React.SetStateAction<RangeFocus>>, props: ComponentProps) => (focusedRange: RangeFocus) => {
  setFocusedRange(focusedRange);
  props.onRangeFocusChange && props.onRangeFocusChange(focusedRange);
};

const updatePreviewGen = (setPreview: React.Dispatch<React.SetStateAction<Preview | null>>, props: ComponentProps, stateFocusedRange: RangeFocus) => (newSelection?: RangeSelection) => {
  if (newSelection === undefined) {
    setPreview(null);
    return;
  }
  const { rangeColors, ranges } = props;
  const focusedRange = props.focusedRange || stateFocusedRange;
  const color = (ranges && ranges[focusedRange[0]]?.color) || (rangeColors && rangeColors[focusedRange[0]]);
  setPreview({ ...newSelection.range, color });
};

export const defaultProps: DefaultComponentProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  retainEndDateOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: [],
}

export function getInitialFocusedRange(initialFocusedRange: ComponentProps["initialFocusedRange"], ranges: ComponentProps["ranges"]) {
  return initialFocusedRange || [findNextRangeIndex(ranges || []), 0];
}

const DateRange: React.FC<ComponentProps> = props => {

  const allProps: ComponentProps = { ...defaultProps, ...props };
  const { initialFocusedRange, ranges, classNames, className, nextPreviewRange } = allProps;
  const [focusedRange, setFocusedRange] = useState<RangeFocus>(getInitialFocusedRange(initialFocusedRange, ranges));
  const [preview, setPreview] = useState<Preview | null>(null);
  const styles = generateStyles([coreStyles, classNames]);
  const calendarRef = useRef(null);
  const setSelection = setSelectionGen(allProps, focusedRange, setFocusedRange, setPreview);
  const handleRangeFocusChange = handleRangeFocusChangeGen(setFocusedRange, allProps);
  const updatePreview = updatePreviewGen(setPreview, allProps, focusedRange);
  const calcNewSelection = calcNewSelectionGen(props, focusedRange);
  const fullUpdatePreview = compose(updatePreview, calcNewSelection);

  useEffect(() => {
    fullUpdatePreview(nextPreviewRange);
    return () => {
    }
  }, [nextPreviewRange, fullUpdatePreview])

  return (
    <Calendar
      {...allProps}
      ref={calendarRef}
      focusedRange={focusedRange}
      onRangeFocusChange={handleRangeFocusChange}
      preview={preview}
      onPreviewChange={fullUpdatePreview}
      displayMode={"dateRange"}
      className={classnames(styles.dateRangeWrapper, className)}
      onChange={setSelection}
      updateRange={setSelection}
    />
  );

}

export default DateRange;
