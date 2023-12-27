import classnames from 'classnames';
import dateFns from 'date-fns';

export function calcFocusDate(currentFocusedDate, props) {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate,
    };
  } else {
    targetInterval = {
      start: date,
      end: date,
    };
  }
  targetInterval.start = dateFns.startOfMonth(targetInterval.start || new Date());
  targetInterval.end = dateFns.endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  if (dateFns.differenceInCalendarMonths(targetInterval.start, targetInterval.end) > months) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

export function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}

export function getMonthDisplayRange(date, dateOptions, fixedHeight) {
  const startDateOfMonth = dateFns.startOfMonth(date, dateOptions);
  const endDateOfMonth = dateFns.endOfMonth(date, dateOptions);
  const startDateOfCalendar = dateFns.startOfWeek(startDateOfMonth, dateOptions);
  let endDateOfCalendar = dateFns.endOfWeek(endDateOfMonth, dateOptions);
  if (
    fixedHeight &&
    dateFns.differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar) <= 34
  ) {
    endDateOfCalendar = dateFns.addDays(endDateOfCalendar, 7);
  }
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth,
  };
}

export function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter(source => Boolean(source))
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach(key => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}

export function calcNewSelection(
  value,
  isSingleValue,
  focusedRange,
  ranges,
  onChange,
  maxDate,
  moveRangeOnFirstSelection,
  retainEndDateOnFirstSelection,
  disabledDates
) {
  const focusedRangeIndex = focusedRange[0];
  const selectedRange = ranges[focusedRangeIndex];
  if (!selectedRange || !onChange) return {};

  let { startDate, endDate } = selectedRange;
  const now = new Date();
  let nextFocusRange;
  if (!isSingleValue) {
    startDate = value.startDate;
    endDate = value.endDate;
  } else if (focusedRange[1] === 0) {
    // startDate selection
    const dayOffset = dateFns.differenceInCalendarDays(endDate || now, startDate);
    const calculateEndDate = () => {
      if (moveRangeOnFirstSelection) {
        return dateFns.addDays(value, dayOffset);
      }
      if (retainEndDateOnFirstSelection) {
        if (!endDate || dateFns.isBefore(value, endDate)) {
          return endDate;
        }
        return value;
      }
      return value || now;
    };
    startDate = value;
    endDate = calculateEndDate();
    if (maxDate) endDate = dateFns.min([endDate, maxDate]);
    nextFocusRange = [focusedRange[0], 1];
  } else {
    endDate = value;
  }

  // reverse dates if startDate before endDate
  let isStartDateSelected = focusedRange[1] === 0;
  if (dateFns.isBefore(endDate, startDate)) {
    isStartDateSelected = !isStartDateSelected;
    [startDate, endDate] = [endDate, startDate];
  }

  const inValidDatesWithinRange = disabledDates.filter(disabledDate =>
    dateFns.isWithinInterval(disabledDate, {
      start: startDate,
      end: endDate,
    })
  );

  if (inValidDatesWithinRange.length > 0) {
    if (isStartDateSelected) {
      startDate = dateFns.addDays(dateFns.max(inValidDatesWithinRange), 1);
    } else {
      endDate = dateFns.addDays(dateFns.min(inValidDatesWithinRange), -1);
    }
  }

  if (!nextFocusRange) {
    const nextFocusRangeIndex = findNextRangeIndex(ranges, focusedRange[0]);
    nextFocusRange = [nextFocusRangeIndex, 0];
  }
  return {
    wasValid: !(inValidDatesWithinRange.length > 0),
    range: { startDate, endDate },
    nextFocusRange: nextFocusRange,
  };
}
