"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DayCell = _interopRequireWildcard(require("../DayCell"));

var _dateFns = require("date-fns");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
  const now = new Date();
  return _react.default.createElement("div", {
    className: styles.weekDays
  }, (0, _dateFns.eachDayOfInterval)({
    start: (0, _dateFns.startOfWeek)(now, dateOptions),
    end: (0, _dateFns.endOfWeek)(now, dateOptions)
  }).map((day, i) => _react.default.createElement("span", {
    className: styles.weekDay,
    key: i
  }, (0, _dateFns.format)(day, weekdayDisplayFormat, dateOptions))));
}

class Month extends _react.PureComponent {
  render() {
    const now = new Date();
    const {
      displayMode,
      focusedRange,
      drag,
      styles,
      disabledDates
    } = this.props;
    const minDate = this.props.minDate && (0, _dateFns.startOfDay)(this.props.minDate);
    const maxDate = this.props.maxDate && (0, _dateFns.endOfDay)(this.props.maxDate);
    const monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions);
    let ranges = this.props.ranges;

    if (displayMode === 'dateRange' && drag.status) {
      let {
        startDate,
        endDate
      } = drag.range;
      ranges = ranges.map((range, i) => {
        if (i !== focusedRange[0]) return range;
        return { ...range,
          startDate,
          endDate
        };
      });
    }

    const showPreview = this.props.showPreview && !drag.disablePreview;
    return _react.default.createElement("div", {
      className: styles.month,
      style: this.props.style
    }, this.props.showMonthName ? _react.default.createElement("div", {
      className: styles.monthName
    }, (0, _dateFns.format)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)) : null, this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat), _react.default.createElement("div", {
      className: styles.days,
      onMouseLeave: this.props.onMouseLeave
    }, (0, _dateFns.eachDayOfInterval)({
      start: monthDisplay.start,
      end: monthDisplay.end
    }).map((day, index) => {
      const isStartOfMonth = (0, _dateFns.isSameDay)(day, monthDisplay.startDateOfMonth);
      const isEndOfMonth = (0, _dateFns.isSameDay)(day, monthDisplay.endDateOfMonth);
      const isOutsideMinMax = minDate && (0, _dateFns.isBefore)(day, minDate) || maxDate && (0, _dateFns.isAfter)(day, maxDate);
      const isDisabledSpecifically = disabledDates.some(disabledDate => (0, _dateFns.isSameDay)(disabledDate, day));
      return _react.default.createElement(_DayCell.default, _extends({}, this.props, {
        ranges: ranges,
        day: day,
        preview: showPreview ? this.props.preview : null,
        isWeekend: (0, _dateFns.isWeekend)(day, this.props.dateOptions),
        isToday: (0, _dateFns.isSameDay)(day, now),
        isStartOfWeek: (0, _dateFns.isSameDay)(day, (0, _dateFns.startOfWeek)(day, this.props.dateOptions)),
        isEndOfWeek: (0, _dateFns.isSameDay)(day, (0, _dateFns.endOfWeek)(day, this.props.dateOptions)),
        isStartOfMonth: isStartOfMonth,
        isEndOfMonth: isEndOfMonth,
        key: index,
        disabled: isOutsideMinMax || isDisabledSpecifically,
        isPassive: !(0, _dateFns.isWithinInterval)(day, {
          start: monthDisplay.startDateOfMonth,
          end: monthDisplay.endDateOfMonth
        }),
        styles: styles,
        onMouseDown: this.props.onDragSelectionStart,
        onMouseUp: this.props.onDragSelectionEnd,
        onMouseEnter: this.props.onDragSelectionMove,
        dragRange: drag.range,
        drag: drag.status
      }));
    })));
  }

}

Month.defaultProps = {};
Month.propTypes = {
  style: _propTypes.default.object,
  styles: _propTypes.default.object,
  month: _propTypes.default.object,
  drag: _propTypes.default.object,
  dateOptions: _propTypes.default.object,
  disabledDates: _propTypes.default.array,
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object
  }),
  showPreview: _propTypes.default.bool,
  displayMode: _propTypes.default.oneOf(['dateRange', 'date']),
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onDragSelectionStart: _propTypes.default.func,
  onDragSelectionEnd: _propTypes.default.func,
  onDragSelectionMove: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  monthDisplayFormat: _propTypes.default.string,
  weekdayDisplayFormat: _propTypes.default.string,
  dayDisplayFormat: _propTypes.default.string,
  showWeekDays: _propTypes.default.bool,
  showMonthName: _propTypes.default.bool
};
var _default = Month;
exports.default = _default;