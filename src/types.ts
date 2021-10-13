// Type definitions for react-date-range-won 1.5
// Project: https://github.com/gbili/react-date-range-won (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Guillermo Pages <https://github.com/gbili>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import React from 'react';
import { Locale } from 'date-fns';
import { ClassNames } from './styles';

export type AnyDate = string | Date;
export type DateOrTimestamp = Date | number;
export type DateFunc = (now: Date) => AnyDate;
export type DateGen = (now: Date) => Date;
export type DateInputType = AnyDate | DateGen;
export type LanguageType = 'cn' | 'jp' | 'fr' | 'it' | 'de' | 'ko' | 'es' | 'ru' | 'tr';
export type SizeType = number;

export interface DateContainerType {
  date: Date;
}

export type AriaLabelShape = {
  dateInput?: {
    [x: string]: StartEndDate<Date | string>;
  };
  monthPicker?: string;
  yearPicker?: string;
  prevButton?: string;
  nextButton?: string;
}


export interface CalendarTheme {
  DateRange?: React.CSSProperties;
  Calendar?: React.CSSProperties;
  Day?: React.CSSProperties;
  DayPassive?: React.CSSProperties;
  DayHover?: React.CSSProperties;
  DayToday?: React.CSSProperties;
  DaySunday?: React.CSSProperties;
  DaySpecialDay?: React.CSSProperties;
  DayActive?: React.CSSProperties;
  DaySelected?: React.CSSProperties;
  DayStartEdge?: React.CSSProperties;
  DayEndEdge?: React.CSSProperties;
  DayInRange?: React.CSSProperties;
  Weekday?: React.CSSProperties;
  MonthAndYear?: React.CSSProperties;
  MonthButton?: React.CSSProperties;
  MonthArrow?: React.CSSProperties;
  MonthArrowPrev?: React.CSSProperties;
  MonthArrowNext?: React.CSSProperties;
  PredefinedRanges?: React.CSSProperties;
  PredefinedRangesItem?: React.CSSProperties;
  PredefinedRangesItemActive?: React.CSSProperties;
}

export type ModeMapper = {
  monthOffset: () => Date,
  setMonth: () => Date,
  setYear: () => Date,
  set: () => number,
}

export function isModeMapperKey(s: string, o: ModeMapper): s is keyof ModeMapper {
  return Object.keys(o).indexOf(s) !== -1;
}

export interface RangeWithKey extends Range {
  key: 'selection';
}

export interface OnDateRangeChangeProps {
  [key: string]: Range;
}

export type WeekStartsOn = 0|1|2|3|4|5|6;

export type DateOptions = { locale: Locale; weekStartsOn?: WeekStartsOn; };

export function isRangeValue(value: Range | Date): value is Range {
  return value.hasOwnProperty('startDate') && value.hasOwnProperty('endDate');
}

export function isOnlyWithStartDate(value: Range | Date): value is Range {
  return value.hasOwnProperty('startDate') && value.hasOwnProperty('endDate');
}
export function isSureRange<T>(range: Range & T): range is SureStartEndDate & T {
  return range.startDate instanceof Date && range.endDate instanceof Date;
}

export interface CommonCalendarProps {
  /** default: DD/MM/YYY */
  format?: string;
  firstDayOfWeek?: number;
  theme?: CalendarTheme;
  /** default: none */
  onInit?: ((range: Range) => void);
  /** default: none */
  minDate?: Date;
  /** default: none */
  maxDate?: Date;
  /** default: */
  weekStartsOn?: WeekStartsOn;
  /** default: enUs from locale. Complete list here https://github.com/Adphorus/react-date-range/blob/next/src/locale/index.js */
  locale?: Locale;
  /** Custom class names for elements */
  classNames?: Partial<ClassNames>;
  /** default: none */
  navigatorRenderer?: (
        currentFocusedDate: Date,
        changeShownDate: (shownDate: Date) => void,
        props: CommonCalendarProps
      ) => JSX.Element;
  /** default: none */
  onShownDateChange?: ((visibleMonth: Date) => void);
  /** default: none */
  onRangeFocusChange?: ((focusedRange: RangeFocus) => void);
  /** default: false */
  editableDateInputs?: boolean;
  /** default: true */
  dragSelectionEnabled?: boolean;
  /** default: false */
  fixedHeight?: boolean;
}

export type DisplayMode = 'date' | 'dateRange';
export type CalendarFocus = 'forwards' | 'backwards';
export type CalendarDirection = 'vertical' | 'horizontal';

export interface CalendarProps extends CommonCalendarProps {
  /** default: today */
  date: DateInputType;
  /** default: none */
  onChange?: (date?: Date) => void;
  scroll?: { enabled: boolean; };
  preventSnapRefocus?: boolean;
  calendarFocus: CalendarFocus;
  months: number;
}

export class Calendar extends React.Component<CalendarProps> {}

export interface DateRangeProps extends Range, CommonCalendarProps {
  /** default: enUs from locale. Complete list here https://github.com/Adphorus/react-date-range/blob/next/src/locale/index.js */
  locale?: Locale;
  /** default: false */
  linkedCalendars?: boolean;
  /** default: 2 */
  calendars?: number;
  /** default: none */
  ranges?: Range[];
  /** default: { enabled: false } */
  scroll?: ScrollOptions;
  /** default: false */
  showSelectionPreview?: boolean;
  /** default: false */
  twoStepChange?: boolean;
  /** default: true */
  showMonthArrow?: boolean;
  /** default: false */
  rangedCalendars?: boolean;
  /** default: none */
  specialDays?: DateContainerType[];
  /** default: 1 */
  months?: number;
  /** default: true */
  showMonthAndYearPickers?: boolean;
  /** default: [] */
  rangeColors?: string[];
  /** default: */
  shownDate?: Date;
  /** default: */
  disabledDates?: Date[];
  /** default: */
  disabledDay?: ((date: Date) => boolean);
  /** default: Early */
  startDatePlaceholder?: string;
  /** default: */
  className?: string;
  /** default: Continuous */
  endDatePlaceholder?: string;
  /** default: MMM d, yyyy */
  dateDisplayFormat?: string;
  /** default: d */
  dayDisplayFormat?: string;
  /** default: E */
  weekdayDisplayFormat?: string;
  /** default: MMM yyyy */
  monthDisplayFormat?: string;
  /** default: vertical */
  direction?: CalendarDirection;
  /** default: false */
  moveRangeOnFirstSelection?: boolean;
  /** default: false */
  retainEndDateOnFirstSelection?: boolean;
  /** default: false */
  editableDateInputs?: boolean;
  /** default: */
  focusedRange?: RangeFocus;
  /** default: [0, 0] */
  initialFocusedRange?: RangeFocus;
  /** default: */
  onRangeFocusChange?: ((focusedRange: RangeFocus) => void);
  /** default: */
  preview?: Preview;
  /** default: true */
  showPreview?: boolean;
  /** default: */
  // onPreviewChange?: (preview?: Preview) => void;
  /** default: none */
  onChange?: (range: OnDateRangeChangeProps) => void;
}

export interface DateRangePickerProps extends DateRangeProps {
  renderStaticRangeLabel?: ((range: DefinedRange) => JSX.Element);
  staticRanges?: StaticRange[];
  inputRanges?: InputRange[];
}

export class DateRange extends React.Component<DateRangeProps> {}

export class DateRangePicker extends React.Component<DateRangePickerProps> {}

export type DateRangeIndex = 'Today' | 'Yesterday' | 'Last 7 Days' | 'Last 30 Days';

export type SureStartEndDate<D = Date> = {
  startDate: D;
  endDate: D;
}

export type SureStartMaybeEndDate<D = Date> = {
  startDate: D;
  endDate: D | null;
}

export type SureStartNoEndDate<D = Date> = {
  startDate: D;
  endDate: null;
}

export type MaybeMaybeRange<D = Date> = OtherRangeProps & (SureStartEndDate<D> | SureStartMaybeEndDate<D> | SureStartNoEndDate<D>);

export function isNoEndDateRange(r: MaybeMaybeRange): r is SureStartNoEndDate {
  return r.hasOwnProperty('startDate') && r.endDate === null;
}

export type StartEndDate<D = Date> = Partial<SureStartEndDate<D>>;

export type StartEndDateGen = () => SureStartEndDate;
export type RangeGen = (props?: CommonCalendarProps) => Range;

export type WithSureRangeGen = { range: StartEndDateGen; };
export type WithRangeGen = { range: RangeGen; };
export type WithRange = { range: Range; };
export type WithRangeOrRangeGen = { range: Range | RangeGen; };

export function isWithRangeGen(wr: WithRangeOrRangeGen): wr is WithRangeGen {
  return typeof wr.range === 'function';
}
export function isWithRange(wr: WithRangeOrRangeGen): wr is WithRange {
  return typeof wr.range !== 'function';
}

export type LabeledStartEndDateGen = WithSureRangeGen & {
  label: string;
}

export type Json =
  | null
  | string
  | number
  | boolean
  | Array<JSON>
  | {
    [prop: string]: Json
  }

export interface OtherRangeProps {
  color?: string;
  key?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  showDateDisplay?: boolean;
}

export interface SureRange<D = Date> extends SureStartEndDate<D>, OtherRangeProps {}

export interface Range<D = Date | null> extends StartEndDate<D>, OtherRangeProps {}

export interface ScrollOptions {
  enabled: boolean;
  monthHeight?: number;
  longMonthHeight?: number;
  monthWidth?: number;
  calendarWidth?: number;
  calendarHeight?: number;
}

export type WithLabel = { label: string; };
export type WithMaybeLabel = { label?: string; };
export type WithMaybeId = { id?: string; };
export type WithIsSelected = { isSelected: (range: SureStartEndDate) => boolean; }
export interface DefinedRangeCommon extends WithMaybeLabel, WithMaybeId {
  hasCustomRendering?: boolean;
}

export type WithRangeCallback = { range: (props?: CommonCalendarProps) => SureRange; }

export interface StaticRange extends DefinedRangeCommon, WithRangeOrRangeGen, WithIsSelected {
}

export type StaticRangeWihLabel = StaticRange & WithLabel & WithIsSelected;

export interface InputRange {
  range: (value: Date | number, props?: CommonCalendarProps) => Range;
  getCurrentValue: (range: Range) => number | "-" | "∞";
}
export type InputRangeWihLabel = InputRange & WithLabel;

export type DefinedRange = StaticRange | InputRange;

/**
 * Represents range focus `[range, rangeElement]`. `range` represents the index of the range
 * that's focused and the `rangeElement` the element of the range that's
 * focused, `0` for start date and `1` for end date
 */
export type RangeFocus = [number, number];

export type Preview = MaybeMaybeRange & {
  color?: string;
}
