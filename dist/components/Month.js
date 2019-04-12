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

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _eachDayOfInterval = require('date-fns/eachDayOfInterval');

var _eachDayOfInterval2 = _interopRequireDefault(_eachDayOfInterval);

var _isWithinInterval = require('date-fns/isWithinInterval');

var _isWithinInterval2 = _interopRequireDefault(_isWithinInterval);

var _isWeekend = require('date-fns/isWeekend');

var _isWeekend2 = _interopRequireDefault(_isWeekend);

var _isAfter = require('date-fns/isAfter');

var _isAfter2 = _interopRequireDefault(_isAfter);

var _isSameDay = require('date-fns/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _isBefore = require('date-fns/isBefore');

var _isBefore2 = _interopRequireDefault(_isBefore);

var _endOfWeek = require('date-fns/endOfWeek');

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = require('date-fns/startOfWeek');

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _endOfDay = require('date-fns/endOfDay');

var _endOfDay2 = _interopRequireDefault(_endOfDay);

var _startOfDay = require('date-fns/startOfDay');

var _startOfDay2 = _interopRequireDefault(_startOfDay);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-fallthrough */


function renderWeekdays(styles, dateOptions) {
  var now = new Date();
  return _react2.default.createElement(
    'div',
    { className: styles.weekDays },
    (0, _eachDayOfInterval2.default)({
      start: (0, _startOfWeek2.default)(now, dateOptions),
      end: (0, _endOfWeek2.default)(now, dateOptions)
    }).map(function (day, i) {
      return _react2.default.createElement(
        'span',
        { className: styles.weekDay, key: i },
        (0, _format2.default)(day, 'ddd', dateOptions)
      );
    })
  );
}

var Month = function (_PureComponent) {
  _inherits(Month, _PureComponent);

  function Month() {
    _classCallCheck(this, Month);

    return _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).apply(this, arguments));
  }

  _createClass(Month, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var now = new Date();
      var _props = this.props,
          displayMode = _props.displayMode,
          focusedRange = _props.focusedRange,
          drag = _props.drag,
          styles = _props.styles;

      var minDate = this.props.minDate && (0, _startOfDay2.default)(this.props.minDate);
      var maxDate = this.props.maxDate && (0, _endOfDay2.default)(this.props.maxDate);
      var monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions);
      var ranges = this.props.ranges;
      if (displayMode === 'dateRange' && drag.status) {
        var _drag$range = drag.range,
            startDate = _drag$range.startDate,
            endDate = _drag$range.endDate;

        ranges = ranges.map(function (range, i) {
          if (i !== focusedRange[0]) return range;
          return _extends({}, range, {
            startDate: startDate,
            endDate: endDate
          });
        });
      }
      var showPreview = this.props.showPreview && !drag.disablePreview;
      return _react2.default.createElement(
        'div',
        { className: styles.month, style: this.props.style },
        this.props.showMonthName ? _react2.default.createElement(
          'div',
          { className: styles.monthName },
          (0, _format2.default)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)
        ) : null,
        this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions),
        _react2.default.createElement(
          'div',
          { className: styles.days, onMouseLeave: this.props.onMouseLeave },
          (0, _eachDayOfInterval2.default)({ start: monthDisplay.start, end: monthDisplay.end }).map(function (day, index) {
            var isStartOfMonth = (0, _isSameDay2.default)(day, monthDisplay.startDateOfMonth);
            var isEndOfMonth = (0, _isSameDay2.default)(day, monthDisplay.endDateOfMonth);
            var isOutsideMinMax = minDate && (0, _isBefore2.default)(day, minDate) || maxDate && (0, _isAfter2.default)(day, maxDate);
            return _react2.default.createElement(_DayCell2.default, _extends({}, _this2.props, {
              ranges: ranges,
              day: day,
              preview: showPreview ? _this2.props.preview : null,
              isWeekend: (0, _isWeekend2.default)(day, _this2.props.dateOptions),
              isToday: (0, _isSameDay2.default)(day, now),
              isStartOfWeek: (0, _isSameDay2.default)(day, (0, _startOfWeek2.default)(day, _this2.props.dateOptions)),
              isEndOfWeek: (0, _isSameDay2.default)(day, (0, _endOfWeek2.default)(day, _this2.props.dateOptions)),
              isStartOfMonth: isStartOfMonth,
              isEndOfMonth: isEndOfMonth,
              key: index,
              disabled: isOutsideMinMax,
              isPassive: !(0, _isWithinInterval2.default)(day, {
                start: monthDisplay.startDateOfMonth,
                end: monthDisplay.endDateOfMonth
              }),
              styles: styles,
              onMouseDown: _this2.props.onDragSelectionStart,
              onMouseUp: _this2.props.onDragSelectionEnd,
              onMouseEnter: _this2.props.onDragSelectionMove,
              dragRange: drag.range,
              drag: drag.status
            }));
          })
        )
      );
    }
  }]);

  return Month;
}(_react.PureComponent);

Month.defaultProps = {};

Month.propTypes = {
  style: _propTypes2.default.object,
  styles: _propTypes2.default.object,
  month: _propTypes2.default.object,
  drag: _propTypes2.default.object,
  dateOptions: _propTypes2.default.object,
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }),
  showPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onDragSelectionStart: _propTypes2.default.func,
  onDragSelectionEnd: _propTypes2.default.func,
  onDragSelectionMove: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  monthDisplayFormat: _propTypes2.default.string,
  showWeekDays: _propTypes2.default.bool,
  showMonthName: _propTypes2.default.bool
};

exports.default = Month;