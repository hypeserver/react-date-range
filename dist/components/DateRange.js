'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DayCell = require('./DayCell');

var _utils = require('../utils.js');

var _min = require('date-fns/min');

var _min2 = _interopRequireDefault(_min);

var _addDays = require('date-fns/addDays');

var _addDays2 = _interopRequireDefault(_addDays);

var _differenceInCalendarDays = require('date-fns/differenceInCalendarDays');

var _differenceInCalendarDays2 = _interopRequireDefault(_differenceInCalendarDays);

var _isBefore = require('date-fns/isBefore');

var _isBefore2 = _interopRequireDefault(_isBefore);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_Component) {
  _inherits(DateRange, _Component);

  function DateRange(props, context) {
    _classCallCheck(this, DateRange);

    var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props, context));

    _this.setSelection = _this.setSelection.bind(_this);
    _this.handleRangeFocusChange = _this.handleRangeFocusChange.bind(_this);
    _this.updatePreview = _this.updatePreview.bind(_this);
    _this.calcNewSelection = _this.calcNewSelection.bind(_this);
    _this.state = {
      focusedRange: props.initialFocusedRange || [(0, _utils.findNextRangeIndex)(props.ranges), 0],
      preview: null
    };
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    return _this;
  }

  _createClass(DateRange, [{
    key: 'calcNewSelection',
    value: function calcNewSelection(value) {
      var isSingleValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var focusedRange = this.props.focusedRange || this.state.focusedRange;
      var _props = this.props,
          ranges = _props.ranges,
          onChange = _props.onChange,
          maxDate = _props.maxDate,
          moveRangeOnFirstSelection = _props.moveRangeOnFirstSelection;

      var focusedRangeIndex = focusedRange[0];
      var selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange || !onChange) return {};

      var startDate = selectedRange.startDate,
          endDate = selectedRange.endDate;

      if (!endDate) endDate = new Date(startDate);
      var nextFocusRange = void 0;
      if (!isSingleValue) {
        startDate = value.startDate;
        endDate = value.endDate;
      } else if (focusedRange[1] === 0) {
        // startDate selection
        var dayOffset = (0, _differenceInCalendarDays2.default)(endDate, startDate);
        startDate = value;
        endDate = moveRangeOnFirstSelection ? (0, _addDays2.default)(value, dayOffset) : value;
        if (maxDate) endDate = (0, _min2.default)([endDate, maxDate]);
        nextFocusRange = [focusedRange[0], 1];
      } else {
        endDate = value;
      }
      // reverse dates if startDate before endDate
      if ((0, _isBefore2.default)(endDate, startDate)) {
        var _ref = [endDate, startDate];
        startDate = _ref[0];
        endDate = _ref[1];
      }

      if (!nextFocusRange) {
        var nextFocusRangeIndex = (0, _utils.findNextRangeIndex)(this.props.ranges, focusedRange[0]);
        nextFocusRange = [nextFocusRangeIndex, 0];
      }
      return {
        range: { startDate: startDate, endDate: endDate },
        nextFocusRange: nextFocusRange
      };
    }
  }, {
    key: 'setSelection',
    value: function setSelection(value, isSingleValue) {
      var _props2 = this.props,
          onChange = _props2.onChange,
          ranges = _props2.ranges,
          onRangeFocusChange = _props2.onRangeFocusChange;

      var focusedRange = this.props.focusedRange || this.state.focusedRange;
      var focusedRangeIndex = focusedRange[0];
      var selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange) return;
      var newSelection = this.calcNewSelection(value, isSingleValue);
      onChange(_defineProperty({}, selectedRange.key || 'range' + (focusedRangeIndex + 1), _extends({}, selectedRange, newSelection.range)));
      this.setState({
        focusedRange: newSelection.nextFocusRange,
        preview: null
      });
      onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
    }
  }, {
    key: 'handleRangeFocusChange',
    value: function handleRangeFocusChange(focusedRange) {
      this.setState({ focusedRange: focusedRange });
      this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
    }
  }, {
    key: 'updatePreview',
    value: function updatePreview(val) {
      if (!val) {
        this.setState({ preview: null });
        return;
      }
      var _props3 = this.props,
          rangeColors = _props3.rangeColors,
          ranges = _props3.ranges;

      var focusedRange = this.props.focusedRange || this.state.focusedRange;
      var color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]] || color;
      this.setState({ preview: _extends({}, val, { color: color }) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_Calendar2.default, _extends({
        focusedRange: this.state.focusedRange,
        onRangeFocusChange: this.handleRangeFocusChange,
        preview: this.state.preview,
        onPreviewChange: function onPreviewChange(value) {
          _this2.updatePreview(value ? _this2.calcNewSelection(value).range : null);
        }
      }, this.props, {
        displayMode: 'dateRange',
        className: (0, _classnames2.default)(this.styles.dateRangeWrapper, this.props.className),
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
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c']
};

DateRange.propTypes = _extends({}, _Calendar2.default.propTypes, {
  onChange: _propTypes2.default.func,
  onRangeFocusChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  moveRangeOnFirstSelection: _propTypes2.default.bool
});

exports.default = DateRange;