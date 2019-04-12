'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInputRanges = exports.defaultStaticRanges = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createStaticRanges = createStaticRanges;

var _differenceInCalendarDays = require('date-fns/differenceInCalendarDays');

var _differenceInCalendarDays2 = _interopRequireDefault(_differenceInCalendarDays);

var _isSameDay = require('date-fns/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _endOfWeek = require('date-fns/endOfWeek');

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = require('date-fns/startOfWeek');

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _addMonths = require('date-fns/addMonths');

var _addMonths2 = _interopRequireDefault(_addMonths);

var _endOfMonth = require('date-fns/endOfMonth');

var _endOfMonth2 = _interopRequireDefault(_endOfMonth);

var _startOfMonth = require('date-fns/startOfMonth');

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

var _startOfDay = require('date-fns/startOfDay');

var _startOfDay2 = _interopRequireDefault(_startOfDay);

var _endOfDay = require('date-fns/endOfDay');

var _endOfDay2 = _interopRequireDefault(_endOfDay);

var _addDays = require('date-fns/addDays');

var _addDays2 = _interopRequireDefault(_addDays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineds = {
  startOfWeek: (0, _startOfWeek2.default)(new Date()),
  endOfWeek: (0, _endOfWeek2.default)(new Date()),
  startOfLastWeek: (0, _startOfWeek2.default)((0, _addDays2.default)(new Date(), -7)),
  endOfLastWeek: (0, _endOfWeek2.default)((0, _addDays2.default)(new Date(), -7)),
  startOfToday: (0, _startOfDay2.default)(new Date()),
  endOfToday: (0, _endOfDay2.default)(new Date()),
  startOfYesterday: (0, _startOfDay2.default)((0, _addDays2.default)(new Date(), -1)),
  endOfYesterday: (0, _endOfDay2.default)((0, _addDays2.default)(new Date(), -1)),
  startOfMonth: (0, _startOfMonth2.default)(new Date()),
  endOfMonth: (0, _endOfMonth2.default)(new Date()),
  startOfLastMonth: (0, _startOfMonth2.default)((0, _addMonths2.default)(new Date(), -1)),
  endOfLastMonth: (0, _endOfMonth2.default)((0, _addMonths2.default)(new Date(), -1))
};

var staticRangeHandler = {
  range: {},
  isSelected: function isSelected(range) {
    var definedRange = this.range();
    return (0, _isSameDay2.default)(range.startDate, definedRange.startDate) && (0, _isSameDay2.default)(range.endDate, definedRange.endDate);
  }
};

function createStaticRanges(ranges) {
  return ranges.map(function (range) {
    return _extends({}, staticRangeHandler, range);
  });
}

var defaultStaticRanges = exports.defaultStaticRanges = createStaticRanges([{
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

var defaultInputRanges = exports.defaultInputRanges = [{
  label: 'days up to today',
  range: function range(value) {
    return {
      startDate: (0, _addDays2.default)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _isSameDay2.default)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _differenceInCalendarDays2.default)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range: function range(value) {
    var today = new Date();
    return {
      startDate: today,
      endDate: (0, _addDays2.default)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _isSameDay2.default)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _differenceInCalendarDays2.default)(range.endDate, defineds.startOfToday) + 1;
  }
}];