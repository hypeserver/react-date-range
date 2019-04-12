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

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

var _defaultRanges = require('../defaultRanges');

var _DayCell = require('./DayCell');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefinedRanges = function (_Component) {
  _inherits(DefinedRanges, _Component);

  function DefinedRanges(props) {
    _classCallCheck(this, DefinedRanges);

    var _this = _possibleConstructorReturn(this, (DefinedRanges.__proto__ || Object.getPrototypeOf(DefinedRanges)).call(this, props));

    _this.state = {
      rangeOffset: 0,
      focusedInput: -1
    };
    _this.handleRangeChange = _this.handleRangeChange.bind(_this);
    return _this;
  }

  _createClass(DefinedRanges, [{
    key: 'handleRangeChange',
    value: function handleRangeChange(range) {
      var _props = this.props,
          onChange = _props.onChange,
          ranges = _props.ranges,
          focusedRange = _props.focusedRange;

      var selectedRange = ranges[focusedRange[0]];
      if (!onChange || !selectedRange) return;
      onChange(_defineProperty({}, selectedRange.key || 'range' + (focusedRange[0] + 1), _extends({}, selectedRange, range)));
    }
  }, {
    key: 'getSelectedRange',
    value: function getSelectedRange(ranges, staticRange) {
      var focusedRangeIndex = ranges.findIndex(function (range) {
        if (!range.startDate || !range.endDate || range.disabled) return false;
        return staticRange.isSelected(range);
      });
      var selectedRange = ranges[focusedRangeIndex];
      return { selectedRange: selectedRange, focusedRangeIndex: focusedRangeIndex };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          onPreviewChange = _props2.onPreviewChange,
          ranges = _props2.ranges,
          rangeColors = _props2.rangeColors,
          className = _props2.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.definedRangesWrapper, className) },
        this.props.headerContent,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.staticRanges },
          this.props.staticRanges.map(function (staticRange, i) {
            var _getSelectedRange = _this2.getSelectedRange(ranges, staticRange),
                selectedRange = _getSelectedRange.selectedRange,
                focusedRangeIndex = _getSelectedRange.focusedRangeIndex;

            return _react2.default.createElement(
              'button',
              {
                type: 'button',
                className: (0, _classnames2.default)(_styles2.default.staticRange, _defineProperty({}, _styles2.default.staticRangeSelected, Boolean(selectedRange))),
                style: {
                  color: selectedRange ? selectedRange.color || rangeColors[focusedRangeIndex] : null
                },
                key: i,
                onClick: function onClick() {
                  return _this2.handleRangeChange(staticRange.range(_this2.props));
                },
                onFocus: function onFocus() {
                  return onPreviewChange && onPreviewChange(staticRange.range(_this2.props));
                },
                onMouseOver: function onMouseOver() {
                  return onPreviewChange && onPreviewChange(staticRange.range(_this2.props));
                },
                onMouseLeave: function onMouseLeave() {
                  _this2.props.onPreviewChange && _this2.props.onPreviewChange();
                } },
              _react2.default.createElement(
                'span',
                { tabIndex: -1, className: _styles2.default.staticRangeLabel },
                staticRange.label
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.inputRanges },
          this.props.inputRanges.map(function (rangeOption, i) {
            return _react2.default.createElement(
              'div',
              { className: _styles2.default.inputRange, key: i },
              _react2.default.createElement('input', {
                className: _styles2.default.inputRangeInput,
                onFocus: function onFocus() {
                  return _this2.setState({ focusedInput: i, rangeOffset: 0 });
                },
                onBlur: function onBlur() {
                  return _this2.setState({ rangeOffset: 0 });
                },
                onChange: function onChange(e) {
                  var value = parseInt(e.target.value, 10);
                  value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                  _this2.handleRangeChange(rangeOption.range(value, _this2.props));
                },
                min: 0,
                max: 99999,
                value: rangeOption.getCurrentValue ? rangeOption.getCurrentValue(ranges[_this2.props.focusedRange[0]] || {}) : '-'
              }),
              _react2.default.createElement(
                'span',
                { className: _styles2.default.inputRangeLabel },
                rangeOption.label
              )
            );
          })
        ),
        this.props.footerContent
      );
    }
  }]);

  return DefinedRanges;
}(_react.Component);

DefinedRanges.propTypes = {
  inputRanges: _propTypes2.default.array,
  staticRanges: _propTypes2.default.array,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onPreviewChange: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  footerContent: _propTypes2.default.any,
  headerContent: _propTypes2.default.any,
  rangeColors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  className: _propTypes2.default.string
};

DefinedRanges.defaultProps = {
  inputRanges: _defaultRanges.defaultInputRanges,
  staticRanges: _defaultRanges.defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0]
};

exports.default = DefinedRanges;