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
  day: string
  dayPassive: string
  dayDisabled: string
  dayToday: string
  dayWeekend: string
  dayStartOfWeek: string
  dayEndOfWeek: string
  dayStartOfMonth: string
  dayEndOfMonth: string
  dayHovered: string
  dayActive: string
  dayStartPreview: string
  dayInPreview: string
  dayEndPreview: string
  selected: string
  startEdge: string
  endEdge: string
  inRange: string
  dayNumber: string
}
