import classnames from 'classnames';
import { DateInputType, Range } from '../src/types'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  addDays,
} from 'date-fns';
import coreStyles, { ClassNames, CoreStyles } from './styles';

export type DateRange = {
  dateStart: Date;
  dateEnd: Date;
}

export type CalcFocusDateBaseProps = {
  date: Date | number;
  months: number;
  shownDate?: Date;
  focusedRange?: number[];
}

export type CalcFocusDateRangeModeProps = CalcFocusDateBaseProps & {
  ranges?: DateRange[];
  displayMode: 'dateRange';
};

export type CalcFocusRangeModeProps = CalcFocusDateBaseProps & {
  ranges?: Range[];
  displayMode: 'date';
};

export type CalcFocusDateProps = CalcFocusDateBaseProps & {
  ranges?: DateRange[] | Range[];
  displayMode: 'dateRange' | 'date';
};

function isDateRangeMode(p: CalcFocusDateProps): p is CalcFocusDateRangeModeProps {
  return p.displayMode === 'dateRange';
}

function isRangeMode(p: CalcFocusDateProps): p is CalcFocusRangeModeProps {
  return p.displayMode === 'date';
}

export function calcFocusDateMode(currentFocusedDate: Date | null, props: CalcFocusRangeModeProps) {
  const { shownDate, date, months } = props;
  // find primary date according the props
  const targetInterval = {
    start: date,
    end: date,
  };
  targetInterval.start = startOfMonth(date || new Date());
  targetInterval.end = endOfMonth(date);
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

export function calcFocusDateRangeMode(currentFocusedDate: Date | null, props: CalcFocusDateRangeModeProps): Date {
  const { shownDate, months, ranges, focusedRange } = props;
  // find primary date according the props
  const now = new Date();
  const range = (ranges && focusedRange && ranges.length > 0 && ranges[focusedRange[0]]) || {
    dateStart: now,
    dateEnd: now,
  };
  const targetIntervalInput = {
    start: range.dateStart,
    end: range.dateEnd,
  };

  const targetInterval = {
    start: startOfMonth(targetIntervalInput.start),
    end: endOfMonth(targetIntervalInput.end || targetIntervalInput.start),
  };

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

export function calcFocusDate(currentFocusedDate: Date | null, props: CalcFocusDateProps) {
  if (isDateRangeMode(props)) {
    return calcFocusDateRangeMode(currentFocusedDate, props);
  } else if (isRangeMode(props)) {
    return calcFocusDateMode(currentFocusedDate, props);
  } else {
    throw new Error('Never happened');
  }
}

export function findNextRangeIndex(ranges: Range[], currentRangeIndex: number = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}

type GetMonthDisplayRangeProp = {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
export function getMonthDisplayRange(date: Date, dateOptions: GetMonthDisplayRangeProp, fixedHeight: boolean = false) {
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

type JoinedStyles = Partial<CoreStyles & ClassNames>;

function isStyleSourceKey(a: JoinedStyles, k: string): k is keyof JoinedStyles {
  return a.hasOwnProperty(k);
}

function isStylesMap(s: CoreStyles | Partial<ClassNames> | {} | undefined): s is JoinedStyles {
  return Boolean(s);
}

export type PartialStyles = Partial<ClassNames>;

export function generateStyles(sources: [CoreStyles, PartialStyles | {} | undefined]) {
  const emptyStyles: JoinedStyles = {};
  if (!sources.length) return emptyStyles;
  const generatedStyles = sources
    .filter(isStylesMap)
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach(key => {
        const alreadyAddedClassNames = styles.hasOwnProperty(key)
          ? styles[key as keyof typeof styles]
          : [];
        return {
          ...styles,
          [key]: classnames(alreadyAddedClassNames, isStyleSourceKey(styleSource, key) ? styleSource[key] : []),
        };
      });
      return styles;
    }, emptyStyles);
  return generatedStyles;
}
