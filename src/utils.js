import classnames from 'classnames';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  addDays,
  subDays,
  getWeekOfMonth,
  nextSunday,
  isSunday,
  lastDayOfWeek,
} from 'date-fns';

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
  targetInterval.start = startOfMonth(targetInterval.start || new Date());
  targetInterval.end = endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate =
    (focusedRange[1]
      ? targetInterval.end || targetInterval.start
      : targetInterval.start || targetInterval.end) ||
    shownDate ||
    new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  if (differenceInCalendarMonths(targetInterval.start, targetInterval.end) > months) {
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
  const startDateOfMonth = startOfMonth(date, dateOptions);
  const endDateOfMonth = endOfMonth(date, dateOptions);
  const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
  let endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);
  if (fixedHeight && differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = addDays(endDateOfCalendar, 7);
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

export function calculateBroadcastWeekNumber(currentDate) {
  const isDecember = (currentDate.getMonth() + 1) === 12;
  if (isDecember && getWeekOfMonth(currentDate) === 6) {
    return 1;
  }
  if (
    isDecember
    && getWeekOfMonth(currentDate) === 5
    && !isSunday(currentDate)
    && (nextSunday(currentDate).getMonth() + 1) !== 12
  ) {
    return 1;
  };
  const firstDayOfTheYearDate = new Date(currentDate.getFullYear(), 0, 1);
  const firstDayOfTheYear = firstDayOfTheYearDate.getDay();
  const yearStartsOnSunday = firstDayOfTheYear === 0;
  const broadcastStartOfWeek1Day = subDays(firstDayOfTheYearDate, yearStartsOnSunday ? 6 : firstDayOfTheYear - 1);
  const days = Math.floor((currentDate - broadcastStartOfWeek1Day) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);
  return weekNumber;
}

export function shouldRenderBroadcastDay(calendarDate, calendarMonth) {
  const weekOfMonth = getWeekOfMonth(calendarDate, { weekStartsOn: 1 });
  if (weekOfMonth <= 4 && calendarDate.getMonth() === calendarMonth) {
    return true;
  }
  if (weekOfMonth === 6 && calendarDate.getMonth() === calendarMonth) {
    return false;
  }
  if (
    weekOfMonth === 5
    && calendarDate.getMonth() === calendarMonth
    && lastDayOfWeek(calendarDate, { weekStartsOn: 1 }).getMonth() !== calendarMonth
  ) {
    return false;
  };
  if (weekOfMonth === 1 && calendarDate.getMonth() !== calendarMonth) {
    return false;
  }
  return true;
}
