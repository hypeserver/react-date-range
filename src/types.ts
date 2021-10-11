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
export function isSureRange(range: Range): range is SureStartEndDate {
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

export type StartEndDate<D = Date> = Partial<SureStartEndDate<D>>;

export type StartEndDateGen = () => SureStartEndDate;
export type LabeledStartEndDateGen = {
  label: string;
  range: StartEndDateGen;
}

interface OtherRangeProps {
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

export interface DefinedRangeCommon {
  label: string;
  isSelected: (range: Range) => boolean;
  hasCustomRendering?: boolean;
}

export interface StaticRange extends DefinedRangeCommon {
  range: (props: CommonCalendarProps) => Range;
}

export interface InputRange extends DefinedRangeCommon {
  range: (value: string, props: CommonCalendarProps) => Range;
  getCurrentValue: (range: Range) => string;
}

export type DefinedRange = StaticRange | InputRange;

/**
 * Represents range focus `[range, rangeElement]`. `range` represents the index of the range
 * that's focused and the `rangeElement` the element of the range that's
 * focused, `0` for start date and `1` for end date
 */
export type RangeFocus = [number, number];

export interface Preview {
  startDate: Date;
  endDate: Date;
  color?: string;
}