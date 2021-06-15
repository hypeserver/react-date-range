


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
  label?: string
  key?: string
}

export interface DateOptions {
  locale?: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
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
