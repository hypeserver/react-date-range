'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultTheme = {
  DateRange: {
    display: 'block',
    boxSizing: 'border-box',
    background: '#ffffff',
    borderRadius: '2px'
  },

  Calendar: {
    width: 280,
    padding: 10,
    background: '#ffffff',
    borderRadius: '2px',
    display: 'inline-block',
    boxSizing: 'border-box',
    letterSpacing: 0,
    color: '#000000'
  },

  Day: {
    boxSizing: 'border-box',
    display: 'inline-block',
    letterSpacing: 'initial',
    textAlign: 'center',
    fontSize: 12,
    cursor: 'pointer',
    transition: 'transform .1s ease'
  },

  DayPassive: {
    opacity: 0.4,
    cursor: 'normal'
  },

  DayHover: {
    background: '#bdc3c7'
  },

  DayActive: {
    background: '#95a5a6',
    color: '#ffffff',
    transform: 'scale(0.9)'
  },

  DaySelected: {
    background: '#e74c3c',
    color: '#ffffff'
  },

  DayInRange: {
    background: '#34495e',
    color: '#95a5a6'
  },

  Weekday: {
    boxSizing: 'border-box',
    display: 'inline-block',
    letterSpacing: 'initial',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 1
  },

  MonthAndYear: {
    textAlign: 'center',
    boxSizing: 'border-box',
    fontSize: 12,
    padding: '10px 0',
    height: 38,
    lineHeight: '18px'
  },

  MonthButton: {
    display: 'block',
    boxSizing: 'border-box',
    height: 18,
    width: 18,
    padding: 0,
    margin: '0 10px',
    border: 'none',
    background: '#bdc3c7',
    boxShadow: 'none',
    outline: 'none',
    borderRadius: '50%'
  },

  MonthArrow: {
    display: 'block',
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    border: '4px solid transparent',
    textAlign: 'center'
  },

  MonthArrowPrev: {
    borderRightWidth: '6px',
    borderRightColor: '#34495e',
    marginLeft: 1
  },

  MonthArrowNext: {
    borderLeftWidth: '6px',
    borderLeftColor: '#34495e',
    marginLeft: 7
  },

  PredefinedRanges: {
    width: 140,
    display: 'inline-block',
    verticalAlign: 'top'
  },

  PredefinedRangeItem: {
    display: 'block',
    fontSize: 12,
    color: '#2c3e50',
    padding: '10px 14px',
    borderRadius: '2px',
    background: '#ecf0f1',
    textDecoration: 'none',
    marginBottom: 6
  }
};

exports['default'] = function () {
  var customTheme = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var calendarWidth = customTheme.Calendar && customTheme.Calendar.width || defaultTheme.Calendar && defaultTheme.Calendar.width;

  var calendarPaddding = customTheme.Calendar && customTheme.Calendar.padding || defaultTheme.Calendar && defaultTheme.Calendar.padding;

  var cellSize = (calendarWidth - calendarPaddding * 2) / 7;

  return {
    DateRange: _extends({}, defaultTheme.DateRange, customTheme.DateRange),

    Calendar: _extends({}, defaultTheme.Calendar, customTheme.Calendar),

    Day: _extends({
      width: cellSize,
      height: cellSize,
      lineHeight: cellSize + 'px'
    }, defaultTheme.Day, customTheme.Day),

    DayPassive: _extends({}, defaultTheme.DayPassive, customTheme.DayPassive),

    DayHover: _extends({}, defaultTheme.DayHover, customTheme.DayHover),

    DayActive: _extends({}, defaultTheme.DayActive, customTheme.DayActive),

    DaySelected: _extends({}, defaultTheme.DaySelected, customTheme.DaySelected),

    DayInRange: _extends({}, defaultTheme.DayInRange, customTheme.DayInRange),

    Weekday: _extends({
      width: cellSize,
      height: cellSize / 2,
      lineHeight: cellSize / 2 + 'px'
    }, defaultTheme.Weekday, customTheme.Weekday),

    MonthAndYear: _extends({}, defaultTheme.MonthAndYear, customTheme.MonthAndYear),

    MonthButton: _extends({}, defaultTheme.MonthButton, customTheme.MonthButton),

    MonthArrow: _extends({}, defaultTheme.MonthArrow, customTheme.MonthArrow),

    MonthArrowPrev: _extends({}, defaultTheme.MonthArrowPrev, customTheme.MonthArrowPrev),

    MonthArrowNext: _extends({}, defaultTheme.MonthArrowNext, customTheme.MonthArrowNext),

    PredefinedRanges: _extends({}, defaultTheme.PredefinedRanges, customTheme.PredefinedRanges),

    PredefinedRangeItem: _extends({}, defaultTheme.PredefinedRangeItem, customTheme.PredefinedRangeItem)
  };
};

module.exports = exports['default'];