


export interface DateRange {
  startDate: Date
  endDate: Date
}


export interface StaticRange {
  label?: string
  range: () => DateRange
  isSelected: (range: DateRange) => boolean
}

export interface InputRange {
  label?: string
  range: (value: DateRange) => DateRange
  getCurrentValue: (range: DateRange) => number | string
}
