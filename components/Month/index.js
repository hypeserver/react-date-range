"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DayCell = _interopRequireWildcard(require("../DayCell"));

var _eachDayOfInterval = _interopRequireDefault(require("date-fns/eachDayOfInterval"));

var _isWithinInterval = _interopRequireDefault(require("date-fns/isWithinInterval"));

var _isWeekend = _interopRequireDefault(require("date-fns/isWeekend"));

var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

var _endOfWeek = _interopRequireDefault(require("date-fns/endOfWeek"));

var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));

var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
  var now = new Date();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: styles.weekDays
  }, (0, _eachDayOfInterval.default)({
    start: (0, _startOfWeek.default)(now, dateOptions),
    end: (0, _endOfWeek.default)(now, dateOptions)
  }).map(function (day, i) {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: styles.weekDay,
      key: i
    }, (0, _format.default)(day, weekdayDisplayFormat, dateOptions));
  }));
}

var Month = /*#__PURE__*/function (_PureComponent) {
  _inherits(Month, _PureComponent);

  var _super = _createSuper(Month);

  function Month() {
    _classCallCheck(this, Month);

    return _super.apply(this, arguments);
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
          disabledDates = _this$props.disabledDates,
          disabledDay = _this$props.disabledDay;
      var minDate = this.props.minDate && (0, _startOfDay.default)(this.props.minDate);
      var maxDate = this.props.maxDate && (0, _endOfDay.default)(this.props.maxDate);
      var monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions, this.props.fixedHeight);
      var ranges = this.props.ranges;

      if (displayMode === 'dateRange' && drag.status) {
        var _drag$range = drag.range,
            startDate = _drag$range.startDate,
            endDate = _drag$range.endDate;
        ranges = ranges.map(function (range, i) {
          if (i !== focusedRange[0]) return range;
          return _objectSpread(_objectSpread({}, range), {}, {
            startDate: startDate,
            endDate: endDate
          });
        });
      }

      var showPreview = this.props.showPreview && !drag.disablePreview;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: styles.month,
        style: this.props.style
      }, this.props.showMonthName ? /*#__PURE__*/_react.default.createElement("div", {
        className: styles.monthName
      }, (0, _format.default)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)) : null, this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat), /*#__PURE__*/_react.default.createElement("div", {
        className: styles.days,
        onMouseLeave: this.props.onMouseLeave
      }, (0, _eachDayOfInterval.default)({
        start: monthDisplay.start,
        end: monthDisplay.end
      }).map(function (day, index) {
        var isStartOfMonth = (0, _isSameDay.default)(day, monthDisplay.startDateOfMonth);
        var isEndOfMonth = (0, _isSameDay.default)(day, monthDisplay.endDateOfMonth);
        var isOutsideMinMax = minDate && (0, _isBefore.default)(day, minDate) || maxDate && (0, _isAfter.default)(day, maxDate);
        var isDisabledSpecifically = disabledDates.some(function (disabledDate) {
          return (0, _isSameDay.default)(disabledDate, day);
        });
        var isDisabledDay = disabledDay(day);
        return /*#__PURE__*/_react.default.createElement(_DayCell.default, _extends({}, _this.props, {
          ranges: ranges,
          day: day,
          preview: showPreview ? _this.props.preview : null,
          isWeekend: (0, _isWeekend.default)(day, _this.props.dateOptions),
          isToday: (0, _isSameDay.default)(day, now),
          isStartOfWeek: (0, _isSameDay.default)(day, (0, _startOfWeek.default)(day, _this.props.dateOptions)),
          isEndOfWeek: (0, _isSameDay.default)(day, (0, _endOfWeek.default)(day, _this.props.dateOptions)),
          isStartOfMonth: isStartOfMonth,
          isEndOfMonth: isEndOfMonth,
          key: index,
          disabled: isOutsideMinMax || isDisabledSpecifically || isDisabledDay,
          isPassive: !(0, _isWithinInterval.default)(day, {
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
  style: _propTypes.default.object,
  styles: _propTypes.default.object,
  month: _propTypes.default.object,
  drag: _propTypes.default.object,
  dateOptions: _propTypes.default.object,
  disabledDates: _propTypes.default.array,
  disabledDay: _propTypes.default.func,
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
  showMonthName: _propTypes.default.bool,
  fixedHeight: _propTypes.default.bool
};
var _default = Month;
exports.default = _default;