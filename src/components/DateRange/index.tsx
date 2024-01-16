import React from 'react';
import Calendar, { CalendarProps } from '../Calendar';
import { type DateRange } from '../DayCell';
import { findNextRangeIndex, generateStyles } from '../../utils';
import Styles from '../../styles';
import { addDays, differenceInCalendarDays, isBefore, isWithinInterval, max, min } from 'date-fns';
import classnames from 'classnames';

export type DateRangeProps = {
  onChange: (dateRange: DateRange) => void,
  onRangeFocusChange?: (range: number[]) => void,
  className?: string,
  ranges?: DateRange[],
  moveRangeOnFirstSelection?: boolean,
  retainEndDateOnFirstSelection?: boolean,
  previewRange?: DateRange,
} & CalendarProps;

export default function DateRange({
  ariaLabels,
  weekStartsOn,
  weekdayDisplayFormat,
  editableDateInputs,
  endDatePlaceholder,
  showMonthAndYearPickers,
  onShownDateChange,
  preventSnapRefocus,
  preview,
  scroll,
  showDateDisplay,
  showMonthArrow,
  showPreview,
  shownDate,
  startDatePlaceholder,
  date,
  dateDisplayFormat,
  dayContentRenderer,
  dayDisplayFormat,
  direction,
  disabledDay,
  dragSelectionEnabled,
  fixedHeight,
  locale,
  calendarFocus,
  className,
  monthDisplayFormat,
  months,
  onChange,
  classNames = {},
  ranges = [],
  moveRangeOnFirstSelection = false,
  retainEndDateOnFirstSelection = false,
  rangeColors = ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates = [],
  initialFocusedRange,
  focusedRange,
  maxDate,
  minDate,
  onRangeFocusChange,
  color,
  previewRange
}: DateRangeProps) {

  const refs = React.useRef({
    styles: generateStyles([Styles, classNames])
  });

  const [state, setState] = React.useState({
    focusedRange: initialFocusedRange || [findNextRangeIndex(ranges, 0)],
    preview: null
  });

  React.useEffect(() => {
    updatePreview(previewRange ? calcNewSelection(previewRange, !previewRange.endDate) : null)
  }, [previewRange]);

  const calcNewSelection = (value: DateRange | Date, isSingleValue = true) => {
    const focusedRangeInternal = (focusedRange || state.focusedRange);
    const focusedRangeIndex = focusedRangeInternal[0];
    const selectedRange = ranges[focusedRangeIndex];

    if (!selectedRange || !onChange) return {};

    let { startDate, endDate } = selectedRange;

    const now = new Date();

    let nextFocusRange: undefined | number[];

    if (!isSingleValue) {
      startDate = (value as DateRange).startDate;
      endDate = (value as DateRange).endDate;
    } else if (focusedRangeInternal[1] === 0) {
      const dayOffset = differenceInCalendarDays(endDate || now, startDate);

      const calculateEndDate = () => {
        if (moveRangeOnFirstSelection) {
          return addDays(value as Date, dayOffset);
        }

        if (retainEndDateOnFirstSelection) {
          if (!endDate || isBefore(value as Date, endDate)) {
            return endDate;
          }
          return value as Date;
        }

        return (value as Date || now);
      }

      startDate = value as Date;
      endDate = calculateEndDate();
      if (maxDate) endDate = min([endDate, maxDate]);

      nextFocusRange = [focusedRangeInternal[0], 1];
    } else {
      endDate = value as Date;
    }

    // reverse dates if startDate before endDate
    let isStartDateSelected = focusedRangeInternal[1] === 0;
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
      const nextFocusRangeIndex = findNextRangeIndex(ranges, focusedRangeInternal[0]);
      nextFocusRange = [nextFocusRangeIndex, 0];
    }

    return {
      wasValid: !(inValidDatesWithinRange.length > 0),
      range: { startDate, endDate },
      nextFocusRange: nextFocusRange,
    };

  }

  const setSelection = (value: DateRange | Date, isSingleValue?: boolean) => {
    const focusedRangeIndex = (focusedRange || state.focusedRange)[0];

    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange || !onChange) return;

    const newSelection = calcNewSelection(value, isSingleValue);

    const toChange = {
      [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
        ...selectedRange,
        ...newSelection.range,
      },
    };
    
    onChange?.(toChange as unknown as DateRange);

    setState(s => ({ ...s, focusedRange: newSelection.nextFocusRange, preview: null }));

    onRangeFocusChange?.(newSelection.nextFocusRange);
  }

  const handleRangeFocusChange = (focusedRange: number[]) => {
    setState(s => ({ ...s, focusedRange }));
    onRangeFocusChange?.(focusedRange);
  }

  const updatePreview = (val?: {
    wasValid?: boolean,
    range?: DateRange,
    nextFocusRange?: number[],
  }) => {

    if (!val) {
      setState(s => ({ ...s, preview: null }));
      return;
    }

    const focusedRangeInternal = focusedRange || state.focusedRange;
    const colorInternal = ranges[focusedRangeInternal[0]]?.color || rangeColors[focusedRangeInternal[0]] || color;

    setState((s => ({ ...s, preview: { ...val.range, color: colorInternal } })));
  }
  
  return (
    <Calendar
      focusedRange={focusedRange || state.focusedRange}
      onRangeFocusChange={handleRangeFocusChange}
      preview={preview || state.preview}
      onPreviewChange={value => {
        updatePreview(value ? calcNewSelection(value) : null);
      }}
      ariaLabels={ariaLabels}
      weekStartsOn={weekStartsOn}
      weekdayDisplayFormat={weekdayDisplayFormat}
      editableDateInputs={editableDateInputs}
      endDatePlaceholder={endDatePlaceholder}
      showMonthAndYearPickers={showMonthAndYearPickers}
      onShownDateChange={onShownDateChange}
      preventSnapRefocus={preventSnapRefocus}
      scroll={scroll}
      showDateDisplay={showDateDisplay}
      showMonthArrow={showMonthArrow}
      showPreview={showPreview}
      shownDate={shownDate}
      startDatePlaceholder={startDatePlaceholder}
      date={date}
      dateDisplayFormat={dateDisplayFormat}
      dayContentRenderer={dayContentRenderer}
      dayDisplayFormat={dayDisplayFormat}
      direction={direction}
      disabledDay={disabledDay}
      dragSelectionEnabled={dragSelectionEnabled}
      fixedHeight={fixedHeight}
      locale={locale}
      calendarFocus={calendarFocus}
      displayMode='dateRange'
      className={classnames(refs.current.styles.dateRangeWrapper, className)}
      onChange={setSelection}
      updateRange={val => setSelection(val, false)}
      monthDisplayFormat={monthDisplayFormat}
      months={months}
      classNames={classNames}
      ranges={ranges}
      rangeColors={rangeColors}
      disabledDates={disabledDates}
      initialFocusedRange={initialFocusedRange}
      maxDate={maxDate}
      minDate={minDate}
      color={color}
    />
  )
} 