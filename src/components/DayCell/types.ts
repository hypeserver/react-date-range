import { DateRange } from "../../utilsTypes";

export interface ExtendedDateRange extends DateRange {
  isStartEdge: Boolean
  isEndEdge: Boolean
  isInRange: Boolean
}

export interface Preview {
  startDate?: Date
  endDate?: Date
  color: string
}

export interface Styles {
  calendarWrapper?: string
  dateDisplay?: string
  dateDisplayItem?: string
  dateDisplayWrapper?: string
  day?: string
  dayActive?: string
  dayDisabled?: string
  dayEndOfMonth?: string
  dayEndOfWeek?: string
  dayEndPreview?: string
  dayHovered?: string
  dayInPreview?: string
  dayNumber?: string
  dayPassive?: string
  days?: string
  dayStartOfMonth?: string
  dayStartOfWeek?: string
  dayStartPreview?: string
  dayToday?: string
  dayWeekend?: string
  endEdge?: string
  infiniteMonths?: string
  inRange?: string
  month?: string
  monthAndYearDivider?: string
  monthAndYearPickers?: string
  monthAndYearWrapper?: string
  monthName?: string
  monthPicker?: string
  months?: string
  monthsHorizontal?: string
  monthsVertical?: string
  nextButton?: string
  nextPrevButton?: string
  prevButton?: string
  selected?: string
  startEdge?: string
  weekDay?: string
  weekDays?: string
  yearPicker?: string
  dateRangeWrapper?: string
  // FIXME
  dateDisplayItemActive?: any
}
