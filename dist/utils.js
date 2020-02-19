"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.getMonthDisplayRange = getMonthDisplayRange;
exports.generateStyles = generateStyles;

var _classnames = _interopRequireDefault(require("classnames"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calcFocusDate(currentFocusedDate, props) {
  const {
    shownDate,
    date,
    months,
    ranges,
    focusedRange,
    displayMode
  } = props; // find primary date according the props

  let targetInterval;

  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }

  targetInterval.start = (0, _dateFns.startOfMonth)(targetInterval.start || new Date());
  targetInterval.end = (0, _dateFns.endOfMonth)(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date(); // initial focus

  if (!currentFocusedDate) return shownDate || targetDate; // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;

  const currentFocusInterval = {
    start: (0, _dateFns.startOfMonth)(currentFocusedDate),
    end: (0, _dateFns.endOfMonth)((0, _dateFns.addMonths)(currentFocusedDate, months - 1))
  };

  if ((0, _dateFns.areIntervalsOverlapping)(targetInterval, currentFocusInterval)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }

  return targetDate;
}

function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex((range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled);
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}

function getMonthDisplayRange(date, dateOptions) {
  const startDateOfMonth = (0, _dateFns.startOfMonth)(date, dateOptions);
  const endDateOfMonth = (0, _dateFns.endOfMonth)(date, dateOptions);
  const startDateOfCalendar = (0, _dateFns.startOfWeek)(startDateOfMonth, dateOptions);
  const endDateOfCalendar = (0, _dateFns.endOfWeek)(endDateOfMonth, dateOptions);
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth
  };
}

function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources.filter(source => Boolean(source)).reduce((styles, styleSource) => {
    Object.keys(styleSource).forEach(key => {
      styles[key] = (0, _classnames.default)(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}