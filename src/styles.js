export const defaultClasses = {
  calendar                   : 'rdr-Calendar',
  dateRange                  : 'rdr-DateRange',
  predefinedRanges           : 'rdr-PredefinedRanges',
  predefinedRangesItem       : 'rdr-PredefinedRangesItem',
  predefinedRangesItemActive : 'rdr-PredefinedRangesItemActive',
  monthAndYear               : 'rdr-MonthAndYear',
  weekDays                   : 'rdr-WeekDays',
  weekDay                    : 'rdr-WeekDay',
  days                       : 'rdr-Days',
  day                        : 'rdr-Day',
  dayActive                  : 'is-selected',
  dayPassive                 : 'is-passive',
  dayInRange                 : 'is-inRange',
  monthAndYearWrapper        : 'rdr-MonthAndYear-innerWrapper',
  prevButton                 : 'rdr-MonthAndYear-button prev',
  nextButton                 : 'rdr-MonthAndYear-button next',
  month                      : 'rdr-MonthAndYear-month',
  monthAndYearDivider        : 'rdr-MonthAndYear-divider',
  year                       : 'rdr-MonthAndYear-year',
  daySunday                  : 'rdr-Sunday',
};

const defaultTheme = {
  DateRange : {
    display       : 'block',
    boxSizing     : 'border-box',
    background    : '#ffffff',
    borderRadius  : '2px',
  },

  Calendar        : {
    width         : 280,
    padding       : 10,
    background    : '#ffffff',
    borderRadius  : '2px',
    display       : 'inline-block',
    boxSizing     : 'border-box',
    letterSpacing : 0,
    color         : '#000000',
  },

  Day : {
    boxSizing     : 'border-box',
    display       : 'inline-block',
    letterSpacing : 'initial',
    textAlign     : 'center',
    fontSize      : 12,
    cursor        : 'pointer',
    transition    : 'transform .1s ease',
  },

  DayPassive : {
    opacity       : 0.4,
    cursor        : 'normal'
  },

  DayHover : {
    background    : '#bdc3c7',
  },

  DayToday : {
  },

  DaySunday: {
    background: "#FF274E",
    color: "white",
  },

  DayActive : {
    background    : '#95a5a6',
    color         : '#ffffff',
    transform     : 'scale(0.9)',
  },

  DaySelected : {
    background    : '#e74c3c',
    color         : '#ffffff',
  },

  DayStartEdge : {
  },

  DayEndEdge : {
  },

  DayInRange : {
    background    : '#34495e',
    color         : '#95a5a6',
  },

  Weekday : {
    boxSizing     : 'border-box',
    display       : 'inline-block',
    letterSpacing : 'initial',
    textAlign     : 'center',
    fontSize      : 12,
    fontWeight    : '600',
    marginBottom  : 1
  },

  MonthAndYear : {
    textAlign     : 'center',
    boxSizing     : 'border-box',
    fontSize      : 12,
    padding       : '10px 0',
    height        : 38,
    lineHeight    : '18px'
  },

  MonthButton : {
    display       : 'block',
    boxSizing     : 'border-box',
    height        : 18,
    width         : 18,
    padding       : 0,
    margin        : '0 10px',
    border        : 'none',
    background    : '#bdc3c7',
    boxShadow     : 'none',
    outline       : 'none',
    borderRadius  : '50%',
  },

  MonthArrow : {
    display       : 'block',
    width         : 0,
    height        : 0,
    padding       : 0,
    margin        : 0,
    border        : '4px solid transparent',
    textAlign     : 'center'
  },

  MonthArrowPrev : {
    borderRightWidth : '6px',
    borderRightColor : '#34495e',
    marginLeft       : 1,
  },

  MonthArrowNext : {
    borderLeftWidth  : '6px',
    borderLeftColor  : '#34495e',
    marginLeft       : 7,
  },

  PredefinedRanges : {
    width         : 140,
    display       : 'inline-block',
    verticalAlign : 'top',
  },

  PredefinedRangesItem : {
    display       : 'block',
    fontSize      : 12,
    color         : '#2c3e50',
    padding       : '10px 14px',
    borderRadius  : '2px',
    background    : '#ecf0f1',
    textDecoration: 'none',
    marginBottom  : 6,
  },

  PredefinedRangesItemActive : {
    color         : '#E74C3C',
  },
};

export default (customTheme = {}) => {

  let calendarWidth   = defaultTheme.Calendar.width;
  let calendarPadding = defaultTheme.Calendar.padding;
  let cellMargin      = defaultTheme.Day.margin || 0;

  if ( customTheme.Calendar && customTheme.Calendar.hasOwnProperty('width') ) {
    calendarWidth = customTheme.Calendar.width;
  }

  if ( customTheme.Calendar && customTheme.Calendar.hasOwnProperty('padding') ) {
    calendarPadding = customTheme.Calendar.padding;
  }

  if ( customTheme.Day && customTheme.Day.hasOwnProperty('margin') ) {
      cellMargin = customTheme.Day.margin;
  }

  const cellSize = (( parseInt(calendarWidth) - parseInt(calendarPadding) * 2 ) / 7 ) - ( parseInt(cellMargin) * 2 );

  return {
    DateRange : { ...defaultTheme.DateRange, ...customTheme.DateRange },

    Calendar : { ...defaultTheme.Calendar, ...customTheme.Calendar },

    Day : {
      width         : cellSize,
      height        : cellSize,
      lineHeight    : cellSize + 'px',
      ...defaultTheme.Day,
      ...customTheme.Day,
    },

    DayPassive : { ...defaultTheme.DayPassive, ...customTheme.DayPassive },

    DayHover : { ...defaultTheme.DayHover, ...customTheme.DayHover },

    DayToday : { ...defaultTheme.DayToday, ...customTheme.DayToday },
    DaySunday: { ...defaultTheme.DaySunday, ...customTheme.DaySunday },

    DayActive : { ...defaultTheme.DayActive, ...customTheme.DayActive },

    DaySelected : { ...defaultTheme.DaySelected, ...customTheme.DaySelected },

    DayStartEdge : { ...defaultTheme.DayStartEdge, ...customTheme.DayStartEdge },

    DayEndEdge : { ...defaultTheme.DayEndEdge, ...customTheme.DayEndEdge },

    DayInRange : { ...defaultTheme.DayInRange, ...customTheme.DayInRange },

    Weekday : {
      width         : cellSize,
      height        : cellSize / 2,
      lineHeight    : cellSize / 2 + 'px',
      ...defaultTheme.Weekday,
      ...customTheme.Weekday,
    },

    MonthAndYear : { ...defaultTheme.MonthAndYear, ...customTheme.MonthAndYear },

    MonthButton : { ...defaultTheme.MonthButton, ...customTheme.MonthButton },

    MonthArrow : { ...defaultTheme.MonthArrow, ...customTheme.MonthArrow },

    MonthArrowPrev : { ...defaultTheme.MonthArrowPrev, ...customTheme.MonthArrowPrev },

    MonthArrowNext : { ...defaultTheme.MonthArrowNext, ...customTheme.MonthArrowNext },

    PredefinedRanges : { ...defaultTheme.PredefinedRanges, ...customTheme.PredefinedRanges },

    PredefinedRangesItem : { ...defaultTheme.PredefinedRangesItem, ...customTheme.PredefinedRangesItem },

    PredefinedRangesItemActive : { ...defaultTheme.PredefinedRangesItemActive, ...customTheme.PredefinedRangesItemActive }
  }
}
