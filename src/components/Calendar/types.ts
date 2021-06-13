import React from "react";


export interface Scroll {
  enabled: boolean
  monthWidth?: number | string
  monthHeight?: number | string
  longMonthHeight?: number | string
  // FIXME
  calendarWidth?: any
  calendarHeight?: any
}

export enum CalendarDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}


export enum ChangeDateMode {
  SET = 'set',
  MONTH_OFFSET = 'monthOffset',
  SET_MONTH = 'setMonth',
  SET_YEAR = 'setYear'
}


export interface AriaLabelsShape {
  dateInput: { startDate: string, endDate: string }[]
  monthPicker: string,
  yearPicker: string,
  prevButton: string,
  nextButton: string,
}
