"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DayCell = _interopRequireWildcard(require("../DayCell"));

var _dateFns = require("date-fns");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
  var now = new Date();
  return _react["default"].createElement("div", {
    className: styles.weekDays
  }, (0, _dateFns.eachDayOfInterval)({
    start: (0, _dateFns.startOfWeek)(now, dateOptions),
    end: (0, _dateFns.endOfWeek)(now, dateOptions)
  }).map(function (day, i) {
    return _react["default"].createElement("span", {
      className: styles.weekDay,
      key: i
    }, (0, _dateFns.format)(day, weekdayDisplayFormat, dateOptions));
  }));
}

var Month =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Month, _PureComponent);

  function Month() {
    _classCallCheck(this, Month);

    return _possibleConstructorReturn(this, _getPrototypeOf(Month).apply(this, arguments));
  }

  _createClass(Month, [{
    key: "render",
    value: function render() {
      var _this = this;

      var now = new Date();
      var _this$props = this.props,
          displayMode = _this$props.displayMode,
          focusedRange = _this$props.focusedRange,
          drag = _this$props.drag,
          styles = _this$props.styles,
          disabledDates = _this$props.disabledDates;
      var minDate = this.props.minDate && (0, _dateFns.startOfDay)(this.props.minDate);
      var maxDate = this.props.maxDate && (0, _dateFns.endOfDay)(this.props.maxDate);
      var monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions, this.props.fixedHeight);
      var ranges = this.props.ranges;

      if (displayMode === 'dateRange' && drag.status) {
        var _drag$range = drag.range,
            startDate = _drag$range.startDate,
            endDate = _drag$range.endDate;
        ranges = ranges.map(function (range, i) {
          if (i !== focusedRange[0]) return range;
          return _objectSpread({}, range, {
            startDate: startDate,
            endDate: endDate
          });
        });
      }

      var showPreview = this.props.showPreview && !drag.disablePreview;
      return _react["default"].createElement("div", {
        className: styles.month,
        style: this.props.style
      }, this.props.showMonthName ? _react["default"].createElement("div", {
        className: styles.monthName
      }, (0, _dateFns.format)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)) : null, this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat), _react["default"].createElement("div", {
        className: styles.days,
        onMouseLeave: this.props.onMouseLeave
      }, (0, _dateFns.eachDayOfInterval)({
        start: monthDisplay.start,
        end: monthDisplay.end
      }).map(function (day, index) {
        var isStartOfMonth = (0, _dateFns.isSameDay)(day, monthDisplay.startDateOfMonth);
        var isEndOfMonth = (0, _dateFns.isSameDay)(day, monthDisplay.endDateOfMonth);
        var isOutsideMinMax = minDate && (0, _dateFns.isBefore)(day, minDate) || maxDate && (0, _dateFns.isAfter)(day, maxDate);
        var isDisabledSpecifically = disabledDates.some(function (disabledDate) {
          return (0, _dateFns.isSameDay)(disabledDate, day);
        });
        return _react["default"].createElement(_DayCell["default"], _extends({}, _this.props, {
          ranges: ranges,
          day: day,
          preview: showPreview ? _this.props.preview : null,
          isWeekend: (0, _dateFns.isWeekend)(day, _this.props.dateOptions),
          isToday: (0, _dateFns.isSameDay)(day, now),
          isStartOfWeek: (0, _dateFns.isSameDay)(day, (0, _dateFns.startOfWeek)(day, _this.props.dateOptions)),
          isEndOfWeek: (0, _dateFns.isSameDay)(day, (0, _dateFns.endOfWeek)(day, _this.props.dateOptions)),
          isStartOfMonth: isStartOfMonth,
          isEndOfMonth: isEndOfMonth,
          key: index,
          disabled: isOutsideMinMax || isDisabledSpecifically,
          isPassive: !(0, _dateFns.isWithinInterval)(day, {
            start: monthDisplay.startDateOfMonth,
            end: monthDisplay.endDateOfMonth
          }),
          styles: styles,
          onMouseDown: _this.props.onDragSelectionStart,
          onMouseUp: _this.props.onDragSelectionEnd,
          onMouseEnter: _this.props.onDragSelectionMove,
          dragRange: drag.range,
          drag: drag.status
        }));
      })));
    }
  }]);

  return Month;
}(_react.PureComponent);

Month.defaultProps = {};
Month.propTypes = {
  style: _propTypes["default"].object,
  styles: _propTypes["default"].object,
  month: _propTypes["default"].object,
  drag: _propTypes["default"].object,
  dateOptions: _propTypes["default"].object,
  disabledDates: _propTypes["default"].array,
  preview: _propTypes["default"].shape({
    startDate: _propTypes["default"].object,
    endDate: _propTypes["default"].object
  }),
  showPreview: _propTypes["default"].bool,
  displayMode: _propTypes["default"].oneOf(['dateRange', 'date']),
  minDate: _propTypes["default"].object,
  maxDate: _propTypes["default"].object,
  ranges: _propTypes["default"].arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  onDragSelectionStart: _propTypes["default"].func,
  onDragSelectionEnd: _propTypes["default"].func,
  onDragSelectionMove: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  monthDisplayFormat: _propTypes["default"].string,
  weekdayDisplayFormat: _propTypes["default"].string,
  dayDisplayFormat: _propTypes["default"].string,
  showWeekDays: _propTypes["default"].bool,
  showMonthName: _propTypes["default"].bool,
  fixedHeight: _propTypes["default"].bool
};
var _default = Month;
exports["default"] = _default;