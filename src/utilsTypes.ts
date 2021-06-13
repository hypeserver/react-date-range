


export enum DisplayMode {
  DATE = 'date',
  DATE_RANGE = 'dateRange'
}

export interface DateRange {
  startDate: Date
  endDate: Date
  autoFocus?: boolean
  disabled?: boolean
  color?: string
}

// export interface FocusDateProps {
//   shownDate: Date
//   date: Date
//   months: number
//   ranges: DateRange[]
//   displayMode: DisplayMode
//   // FIXME
//   focusedRange: any
// }
