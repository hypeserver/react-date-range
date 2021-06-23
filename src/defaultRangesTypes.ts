import { Preview } from "./components/DayCell/types";
import { DateRange } from "./utilsTypes";
export interface StaticRange {
  label?: string
  hasCustomRendering?: boolean
  // FIXME: deprecated? is it used?
  range: (props?: object) => Preview
  isSelected: (range: DateRange) => boolean
}

export interface InputRange {
  label?: string
  range: (value: Date) => DateRange
  getCurrentValue: (range: DateRange) => number | string
}
