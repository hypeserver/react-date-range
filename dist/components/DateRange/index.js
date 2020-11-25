"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _DayCell = require("../DayCell");

var _utils = require("../../utils");

var _dateFns = require("date-fns");

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("../../styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DateRange =
/*#__PURE__*/
function (_Component) {
  _inherits(DateRange, _Component);

  function DateRange(props, context) {
    var _this;

    _classCallCheck(this, DateRange);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateRange).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "calcNewSelection", function (value) {
      var isSingleValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var focusedRange = _this.props.focusedRange || _this.state.focusedRange;
      var _this$props = _this.props,
          ranges = _this$props.ranges,
          onChange = _this$props.onChange,
          maxDate = _this$props.maxDate,
          moveRangeOnFirstSelection = _this$props.moveRangeOnFirstSelection,
          disabledDates = _this$props.disabledDates;
      var focusedRangeIndex = focusedRange[0];
      var selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange || !onChange) return {};
      var startDate = selectedRange.startDate,
          endDate = selectedRange.endDate;
      if (!endDate) endDate = new Date(startDate);
      var nextFocusRange;

      if (!isSingleValue) {
        startDate = value.startDate;
        endDate = value.endDate;
      } else if (focusedRange[1] === 0) {
        // startDate selection
        var dayOffset = (0, _dateFns.differenceInCalendarDays)(endDate, startDate);
        startDate = value;
        endDate = moveRangeOnFirstSelection ? (0, _dateFns.addDays)(value, dayOffset) : value;
        if (maxDate) endDate = (0, _dateFns.min)([endDate, maxDate]);
        nextFocusRange = [focusedRange[0], 1];
      } else {
        endDate = value;
      } // reverse dates if startDate before endDate


      var isStartDateSelected = focusedRange[1] === 0;

      if ((0, _dateFns.isBefore)(endDate, startDate)) {
        isStartDateSelected = !isStartDateSelected;
        var _ref = [endDate, startDate];
        startDate = _ref[0];
        endDate = _ref[1];
      }

      var inValidDatesWithinRange = disabledDates.filter(function (disabledDate) {
        return (0, _dateFns.isWithinInterval)(disabledDate, {
          start: startDate,
          end: endDate
        });
      });

      if (inValidDatesWithinRange.length > 0) {
        if (isStartDateSelected) {
          startDate = (0, _dateFns.addDays)((0, _dateFns.max)(inValidDatesWithinRange), 1);
        } else {
          endDate = (0, _dateFns.addDays)((0, _dateFns.min)(inValidDatesWithinRange), -1);
        }
      }

      if (!nextFocusRange) {
        var nextFocusRangeIndex = (0, _utils.findNextRangeIndex)(_this.props.ranges, focusedRange[0]);
        nextFocusRange = [nextFocusRangeIndex, 0];
      }

      return {
        wasValid: !(inValidDatesWithinRange.length > 0),
        range: {
          startDate: startDate,
          endDate: endDate
        },
        nextFocusRange: nextFocusRange
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setSelection", function (value, isSingleValue) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          ranges = _this$props2.ranges,
          onRangeFocusChange = _this$props2.onRangeFocusChange;
      var focusedRange = _this.props.focusedRange || _this.state.focusedRange;
      var focusedRangeIndex = focusedRange[0];
      var selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange) return;

      var newSelection = _this.calcNewSelection(value, isSingleValue);

      onChange(_defineProperty({}, selectedRange.key || "range".concat(focusedRangeIndex + 1), _objectSpread({}, selectedRange, {}, newSelection.range)));

      _this.setState({
        focusedRange: newSelection.nextFocusRange,
        preview: null
      });

      onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRangeFocusChange", function (focusedRange) {
      _this.setState({
        focusedRange: focusedRange
      });

      _this.props.onRangeFocusChange && _this.props.onRangeFocusChange(focusedRange);
    });

    _defineProperty(_assertThisInitialized(_this), "updatePreview", function (val) {
      if (!val) {
        _this.setState({
          preview: null
        });

        return;
      }

      var _this$props3 = _this.props,
          rangeColors = _this$props3.rangeColors,
          ranges = _this$props3.ranges;
      var focusedRange = _this.props.focusedRange || _this.state.focusedRange;
      var color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]] || color;

      _this.setState({
        preview: _objectSpread({}, val.range, {
          color: color
        })
      });
    });

    _this.state = {
      focusedRange: props.initialFocusedRange || [(0, _utils.findNextRangeIndex)(props.ranges), 0],
      preview: null
    };
    _this.styles = (0, _utils.generateStyles)([_styles["default"], props.classNames]);
    return _this;
  }

  _createClass(DateRange, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_Calendar["default"], _extends({
        focusedRange: this.state.focusedRange,
        onRangeFocusChange: this.handleRangeFocusChange,
        preview: this.state.preview,
        onPreviewChange: function onPreviewChange(value) {
          _this2.updatePreview(value ? _this2.calcNewSelection(value) : null);
        }
      }, this.props, {
        displayMode: "dateRange",
        className: (0, _classnames["default"])(this.styles.dateRangeWrapper, this.props.className),
        onChange: this.setSelection,
        updateRange: function updateRange(val) {
          return _this2.setSelection(val, false);
        },
        ref: function ref(target) {
          _this2.calendar = target;
        }
      }));
    }
  }]);

  return DateRange;
}(_react.Component);

DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: []
};
DateRange.propTypes = _objectSpread({}, _Calendar["default"].propTypes, {
  onChange: _propTypes["default"].func,
  onRangeFocusChange: _propTypes["default"].func,
  className: _propTypes["default"].string,
  ranges: _propTypes["default"].arrayOf(_DayCell.rangeShape),
  moveRangeOnFirstSelection: _propTypes["default"].bool
});
var _default = DateRange;
exports["default"] = _default;