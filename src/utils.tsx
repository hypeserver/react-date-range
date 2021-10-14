import React from 'react';
import classnames from 'classnames';
import { AriaLabelShape, DateOptions, MaybeEmptyRange, SureStartEndDate } from './types'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  addDays,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { ClassNames, CoreStyles } from './styles';

export type CalcFocusDateBaseProps = {
  months: number;
  shownDate?: Date;
  focusedRange?: number[];
}

export type CalcFocusDateRangeModeProps = CalcFocusDateBaseProps & {
  ranges: MaybeEmptyRange[];
  displayMode: 'dateRange';
};

export type CalcFocusDateModeProps = CalcFocusDateBaseProps & {
  date?: Date | number;
  ranges?: MaybeEmptyRange[];
  displayMode?: 'date';
};

export type CalcFocusDateProps = CalcFocusDateModeProps | CalcFocusDateRangeModeProps;

function isDateRangeMode(p: CalcFocusDateProps): p is CalcFocusDateRangeModeProps {
  return p.displayMode === 'dateRange';
}

function isDateMode(p: CalcFocusDateProps): p is CalcFocusDateModeProps {
  return !isDateRangeMode(p);
}

export function calcFocusDateRangeModeLastPart(currentFocusedDate: Date | null, months: number, startInput: Date | number, endInput?: Date | number | null, shownDate?: Date) {

  const targetInterval = {
    start: startOfMonth(startInput),
    end: endOfMonth(endInput || startInput),
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

export function calcFocusDateMode(currentFocusedDate: Date | null, props: CalcFocusDateModeProps) {
  const { shownDate, date, months } = props;
  // find primary date according the props
  const startInput = date || new Date();
  const endInput = date;

  return calcFocusDateRangeModeLastPart(currentFocusedDate, months, startInput, endInput, shownDate);
}

export function calcFocusDateRangeMode(currentFocusedDate: Date | null, props: CalcFocusDateRangeModeProps): Date {
  const { shownDate, months, ranges, focusedRange } = props;
  // find primary date according the props
  const now = new Date();
  const range = (ranges && focusedRange && ranges.length > 0 && ranges[focusedRange[0]]) || {
    startDate: now,
    endDate: now,
  };
  const startInput = range.startDate || new Date()
  const endInput = range.endDate;

  return calcFocusDateRangeModeLastPart(currentFocusedDate, months, startInput, endInput, shownDate);
}

export function calcFocusDate(currentFocusedDate: Date | null, props: CalcFocusDateProps) {
  if (isDateRangeMode(props)) {
    return calcFocusDateRangeMode(currentFocusedDate, props);
  } else if (isDateMode(props)) {
    return calcFocusDateMode(currentFocusedDate, props);
  } else {
    throw new Error('Never happened');
  }
}

export function calcFocusDateBis(currentFocusedDate: Date | null, props: CalcFocusDateProps) {
  const { shownDate, months } = props;
  // find primary date according the props
  let targetInterval;
  if (isDateRangeMode(props)) {
    const range = props.focusedRange && props.ranges[props.focusedRange[0]] || { startDate: undefined, endDate: undefined };
    targetInterval = {
      start: range.startDate,
      end: range.endDate,
    };
  } else {
    targetInterval = {
      start: props.date,
      end: props.date,
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

export function findNextRangeIndex(ranges: MaybeEmptyRange[], currentRangeIndex: number = -1) {
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

export function renderWeekdays(styles: CoreStyles, dateOptions: DateOptions, weekdayDisplayFormat: string) {
  const now = new Date();
  return (
    <div className={styles.weekDays}>
      {eachDayOfInterval({
        start: startOfWeek(now, dateOptions),
        end: endOfWeek(now, dateOptions),
      }).map((day, i) => (
        <span className={styles.weekDay} key={i}>
          {format(day, weekdayDisplayFormat, dateOptions)}
        </span>
      ))}
    </div>
  );
}


type JoinedStyles = Partial<CoreStyles & ClassNames>;

function isStyleSourceKey(a: JoinedStyles, k: string): k is keyof JoinedStyles {
  return a.hasOwnProperty(k);
}

export type GeneratedStylesPropPart = CoreStyles | PartialStyles | {} | undefined;
export type PartialStyles = Partial<ClassNames>;

export function isStylesMap(s: GeneratedStylesPropPart): s is PartialStyles {
  return typeof s === 'object';
}

export function augmentStyles(styles: PartialStyles, augmentingStyles: PartialStyles) {
  return Object.keys(augmentingStyles).reduce((styles, key) => {
    const alreadyAddedClassNames = styles.hasOwnProperty(key)
      ? styles[key as keyof typeof styles]
      : [];
    return {
      ...styles,
      [key]: classnames(alreadyAddedClassNames, isStyleSourceKey(augmentingStyles, key) ? augmentingStyles[key] : []),
    };
  }, styles);
}

export function generateStyles(sources: [CoreStyles, PartialStyles | {} | undefined]) {
  const emptyStyles: PartialStyles = {};
  if (!sources.length) return emptyStyles;
  const generatedStyles = sources
    .filter(isStylesMap)
    .reduce(augmentStyles, emptyStyles);
  return generatedStyles;
}


export function inferAriaLabel<T extends keyof SureStartEndDate<string>>(range: MaybeEmptyRange, ariaLabels: AriaLabelShape | undefined, key: T): string | undefined {
  if (!ariaLabels) {
    return undefined;
  }

  if (ariaLabels.dateInput && range.key && !ariaLabels.dateInput[range.key]) {
    console.log('range', range);
    console.log('ariaLabels', ariaLabels);
    throw new Error('Range "key" property refering an ariaLabel prop name which does not exist ariaLabels.dateInput[range.key]: string');
  }
  const sd = (ariaLabels.dateInput && range.key
    && ariaLabels.dateInput[range.key]) || ({
      startDate: 'range start date',
      endDate: 'range end date',
    })[key];
  if (sd instanceof Date) {
    return sd.toLocaleString();
  } else if (typeof sd === 'string') {
    return sd;
  } else {
    console.log(ariaLabels);
    throw new Error('Unsupported ariaLabel type');
  }
}

