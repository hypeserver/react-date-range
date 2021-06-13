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
