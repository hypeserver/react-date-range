import classnames from 'classnames';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  addDays,
} from 'date-fns';

export interface IStyles { [key: string]: string }

export interface DateOptions {
  locale?: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export enum DisplayMode {
  DATE = 'date',
  DATE_RANGE = 'dateRange',
}

export interface Preview {
  startDate: Date
  endDate: Date
  color?: string
}


export interface Range {
  startDate?: Date
  endDate?: Date
  // FIXME?
  isStartEdge?: boolean | null
  isEndEdge?: boolean | null
  isInRange?: boolean | null
  color?: string | null
  autoFocus?: boolean
  disabled?: boolean
}

interface CalFocusDAteOptions {
  shownDate: Date
  date: Date
  months: number
  ranges: Range[]
  focusedRange: number
  displayMode: DisplayMode
}

export function calcFocusDate(currentFocusedDate: Date, props: CalFocusDAteOptions): Date {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval: {start?: Date, end?: Date};
  if (displayMode === DisplayMode.DATE_RANGE) {
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
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

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

export function findNextRangeIndex(ranges: Range[], currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}

export function getMonthDisplayRange(date: Date, dateOptions: DateOptions, fixedHeight: boolean) {
  const startDateOfMonth = startOfMonth(date);
  const endDateOfMonth = endOfMonth(date);
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

export function generateStyles(sources: IStyles[]) {
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
