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

  CalendarDropdown: {
    width         : 280,
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

  DropdownButton: {
    position      : 'absolute',
    margin        : 'auto',
    right          : '0',
    height        : '34px',
    width         : '34px'
  },

  DropdownButtonImage: {
    maxWidth      : '100%',
    maxHeight     : '100%'
  },

  DropdownCalendar: {
    marginTop     : '5px',
    position      : 'absolute',
    top           : '100%',
    left          : 0,
    right         : 0,
    zIndex        : 1,
  },

  DropdownContainer: {
    position      : 'relative',
    display       : 'flex',
  },

  DropdownInput: {
    flexGrow      : 1,
    flexShrink    : 0,
    display       : 'block',
    width         : '100%',
    height        : '34px',
    padding       : '6px 34px 6px 12px',
    border        : '1px solid #dadada',
    borderRadius  : '2px',
    fontSize      : '1.2rem',
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

  PredefinedRangeItem : {
    display       : 'block',
    fontSize      : 12,
    color         : '#2c3e50',
    padding       : '10px 14px',
    borderRadius  : '2px',
    background    : '#ecf0f1',
    textDecoration: 'none',
    marginBottom  : 6,
  }
}

export default (customTheme = {}) => {

  let calendarWidth   = defaultTheme.Calendar.width;
  let calendarPadding = defaultTheme.Calendar.padding;

  if ( customTheme.Calendar && customTheme.Calendar.hasOwnProperty('width') ) {
    calendarWidth = customTheme.Calendar.width;
  }

  if ( customTheme.Calendar && customTheme.Calendar.hasOwnProperty('padding') ) {
    calendarPadding = customTheme.Calendar.padding;
  }

  const cellSize = ( parseInt(calendarWidth) - parseInt(calendarPadding) * 2 ) / 7;

  return {
    DateRange : { ...defaultTheme.DateRange, ...customTheme.DateRange },

    Calendar : { ...defaultTheme.Calendar, ...customTheme.Calendar },

    CalendarDropdown : { ...defaultTheme.CalendarDropdown, ...customTheme.CalendarDropdown },

    Day : {
      width         : cellSize,
      height        : cellSize,
      lineHeight    : cellSize + 'px',
      ...defaultTheme.Day,
      ...customTheme.Day,
    },

    DayPassive : { ...defaultTheme.DayPassive, ...customTheme.DayPassive },

    DayHover : { ...defaultTheme.DayHover, ...customTheme.DayHover },

    DayActive : { ...defaultTheme.DayActive, ...customTheme.DayActive },

    DaySelected : { ...defaultTheme.DaySelected, ...customTheme.DaySelected },

    DayStartEdge : { ...defaultTheme.DayStartEdge, ...customTheme.DayStartEdge },

    DayEndEdge : { ...defaultTheme.DayEndEdge, ...customTheme.DayEndEdge },

    DayInRange : { ...defaultTheme.DayInRange, ...customTheme.DayInRange },

    DropdownButton: { ...defaultTheme.DropdownButton, ...customTheme.DropdownButton },

    DropdownButtonImage: { ...defaultTheme.DropdownButtonImage, ...customTheme.DropdownButtonImage },

    DropdownCalendar: { ...defaultTheme.DropdownCalendar, ...customTheme.DropdownCalendar },

    DropdownContainer: { ...defaultTheme.DropdownContainer, ...customTheme.DropdownContainer },

    DropdownInput: { ...defaultTheme.DropdownInput, ...customTheme.DropdownInput },

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

    PredefinedRangeItem : { ...defaultTheme.PredefinedRangeItem, ...customTheme.PredefinedRangeItem }
  }
}
