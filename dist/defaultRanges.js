"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticRanges = createStaticRanges;
exports.defaultInputRanges = exports.defaultStaticRanges = void 0;

var _dateFns = require("date-fns");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defineds = {
  startOfWeek: (0, _dateFns.startOfWeek)(new Date()),
  endOfWeek: (0, _dateFns.endOfWeek)(new Date()),
  startOfLastWeek: (0, _dateFns.startOfWeek)((0, _dateFns.addDays)(new Date(), -7)),
  endOfLastWeek: (0, _dateFns.endOfWeek)((0, _dateFns.addDays)(new Date(), -7)),
  startOfToday: (0, _dateFns.startOfDay)(new Date()),
  endOfToday: (0, _dateFns.endOfDay)(new Date()),
  startOfYesterday: (0, _dateFns.startOfDay)((0, _dateFns.addDays)(new Date(), -1)),
  endOfYesterday: (0, _dateFns.endOfDay)((0, _dateFns.addDays)(new Date(), -1)),
  startOfMonth: (0, _dateFns.startOfMonth)(new Date()),
  endOfMonth: (0, _dateFns.endOfMonth)(new Date()),
  startOfLastMonth: (0, _dateFns.startOfMonth)((0, _dateFns.addMonths)(new Date(), -1)),
  endOfLastMonth: (0, _dateFns.endOfMonth)((0, _dateFns.addMonths)(new Date(), -1))
};
var staticRangeHandler = {
  range: {},
  isSelected: function isSelected(range) {
    var definedRange = this.range();
    return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
  }
};

function createStaticRanges(ranges) {
  return ranges.map(function (range) {
    return _objectSpread({}, staticRangeHandler, {}, range);
  });
}

var defaultStaticRanges = createStaticRanges([{
  label: 'Today',
  range: function range() {
    return {
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday
    };
  }
}, {
  label: 'Yesterday',
  range: function range() {
    return {
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday
    };
  }
}, {
  label: 'This Week',
  range: function range() {
    return {
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek
    };
  }
}, {
  label: 'Last Week',
  range: function range() {
    return {
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek
    };
  }
}, {
  label: 'This Month',
  range: function range() {
    return {
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth
    };
  }
}, {
  label: 'Last Month',
  range: function range() {
    return {
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth
    };
  }
}]);
exports.defaultStaticRanges = defaultStaticRanges;
var defaultInputRanges = [{
  label: 'days up to today',
  range: function range(value) {
    return {
      startDate: (0, _dateFns.addDays)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _dateFns.isSameDay)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _dateFns.differenceInCalendarDays)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range: function range(value) {
    var today = new Date();
    return {
      startDate: today,
      endDate: (0, _dateFns.addDays)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _dateFns.isSameDay)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _dateFns.differenceInCalendarDays)(range.endDate, defineds.startOfToday) + 1;
  }
}];
exports.defaultInputRanges = defaultInputRanges;