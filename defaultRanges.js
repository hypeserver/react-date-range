"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticRanges = createStaticRanges;
exports.defaultInputRanges = exports.defaultStaticRanges = void 0;

var _differenceInCalendarDays = _interopRequireDefault(require("date-fns/differenceInCalendarDays"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _addMonths = _interopRequireDefault(require("date-fns/addMonths"));

var _endOfMonth = _interopRequireDefault(require("date-fns/endOfMonth"));

var _startOfMonth = _interopRequireDefault(require("date-fns/startOfMonth"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defineds = {
  startOfWeek: (0, _startOfWeek.default)(new Date()),
  endOfWeek: (0, _endOfWeek.default)(new Date()),
  startOfLastWeek: (0, _startOfWeek.default)((0, _addDays.default)(new Date(), -7)),
  endOfLastWeek: (0, _endOfWeek.default)((0, _addDays.default)(new Date(), -7)),
  startOfToday: (0, _startOfDay.default)(new Date()),
  endOfToday: (0, _endOfDay.default)(new Date()),
  startOfYesterday: (0, _startOfDay.default)((0, _addDays.default)(new Date(), -1)),
  endOfYesterday: (0, _endOfDay.default)((0, _addDays.default)(new Date(), -1)),
  startOfMonth: (0, _startOfMonth.default)(new Date()),
  endOfMonth: (0, _endOfMonth.default)(new Date()),
  startOfLastMonth: (0, _startOfMonth.default)((0, _addMonths.default)(new Date(), -1)),
  endOfLastMonth: (0, _endOfMonth.default)((0, _addMonths.default)(new Date(), -1))
};
var staticRangeHandler = {
  range: {},
  isSelected: function isSelected(range) {
    var definedRange = this.range();
    return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
  }
};

function createStaticRanges(ranges) {
  return ranges.map(function (range) {
    return _objectSpread(_objectSpread({}, staticRangeHandler), range);
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
      startDate: (0, _addDays.default)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _isSameDay.default)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _differenceInCalendarDays.default)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range: function range(value) {
    var today = new Date();
    return {
      startDate: today,
      endDate: (0, _addDays.default)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _isSameDay.default)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _differenceInCalendarDays.default)(range.endDate, defineds.startOfToday) + 1;
  }
}];
exports.defaultInputRanges = defaultInputRanges;