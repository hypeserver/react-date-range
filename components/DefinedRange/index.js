"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("../../styles"));

var _defaultRanges = require("../../defaultRanges");

var _DayCell = require("../DayCell");

var _InputRangeField = _interopRequireDefault(require("../InputRangeField"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DefinedRange = /*#__PURE__*/function (_Component) {
  _inherits(DefinedRange, _Component);

  var _super = _createSuper(DefinedRange);

  function DefinedRange(props) {
    var _this;

    _classCallCheck(this, DefinedRange);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleRangeChange", function (range) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          ranges = _this$props.ranges,
          focusedRange = _this$props.focusedRange;
      var selectedRange = ranges[focusedRange[0]];
      if (!onChange || !selectedRange) return;
      onChange(_defineProperty({}, selectedRange.key || "range".concat(focusedRange[0] + 1), _objectSpread(_objectSpread({}, selectedRange), range)));
    });

    _this.state = {
      rangeOffset: 0,
      focusedInput: -1
    };
    return _this;
  }

  _createClass(DefinedRange, [{
    key: "getRangeOptionValue",
    value: function getRangeOptionValue(option) {
      var _this$props2 = this.props,
          _this$props2$ranges = _this$props2.ranges,
          ranges = _this$props2$ranges === void 0 ? [] : _this$props2$ranges,
          _this$props2$focusedR = _this$props2.focusedRange,
          focusedRange = _this$props2$focusedR === void 0 ? [] : _this$props2$focusedR;

      if (typeof option.getCurrentValue !== 'function') {
        return '';
      }

      var selectedRange = ranges[focusedRange[0]] || {};
      return option.getCurrentValue(selectedRange) || '';
    }
  }, {
    key: "getSelectedRange",
    value: function getSelectedRange(ranges, staticRange) {
      var focusedRangeIndex = ranges.findIndex(function (range) {
        if (!range.startDate || !range.endDate || range.disabled) return false;
        return staticRange.isSelected(range);
      });
      var selectedRange = ranges[focusedRangeIndex];
      return {
        selectedRange: selectedRange,
        focusedRangeIndex: focusedRangeIndex
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          headerContent = _this$props3.headerContent,
          footerContent = _this$props3.footerContent,
          onPreviewChange = _this$props3.onPreviewChange,
          inputRanges = _this$props3.inputRanges,
          staticRanges = _this$props3.staticRanges,
          ranges = _this$props3.ranges,
          renderStaticRangeLabel = _this$props3.renderStaticRangeLabel,
          rangeColors = _this$props3.rangeColors,
          className = _this$props3.className;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(_styles.default.definedRangesWrapper, className)
      }, headerContent, /*#__PURE__*/_react.default.createElement("div", {
        className: _styles.default.staticRanges
      }, staticRanges.map(function (staticRange, i) {
        var _this2$getSelectedRan = _this2.getSelectedRange(ranges, staticRange),
            selectedRange = _this2$getSelectedRan.selectedRange,
            focusedRangeIndex = _this2$getSelectedRan.focusedRangeIndex;

        var labelContent;

        if (staticRange.hasCustomRendering) {
          labelContent = renderStaticRangeLabel(staticRange);
        } else {
          labelContent = staticRange.label;
        }

        return /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: (0, _classnames.default)(_styles.default.staticRange, _defineProperty({}, _styles.default.staticRangeSelected, Boolean(selectedRange))),
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
            onPreviewChange && onPreviewChange();
          }
        }, /*#__PURE__*/_react.default.createElement("span", {
          tabIndex: -1,
          className: _styles.default.staticRangeLabel
        }, labelContent));
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: _styles.default.inputRanges
      }, inputRanges.map(function (rangeOption, i) {
        return /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
          key: i,
          styles: _styles.default,
          label: rangeOption.label,
          onFocus: function onFocus() {
            return _this2.setState({
              focusedInput: i,
              rangeOffset: 0
            });
          },
          onBlur: function onBlur() {
            return _this2.setState({
              rangeOffset: 0
            });
          },
          onChange: function onChange(value) {
            return _this2.handleRangeChange(rangeOption.range(value, _this2.props));
          },
          value: _this2.getRangeOptionValue(rangeOption)
        });
      })), footerContent);
    }
  }]);

  return DefinedRange;
}(_react.Component);

DefinedRange.propTypes = {
  inputRanges: _propTypes.default.array,
  staticRanges: _propTypes.default.array,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onPreviewChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  footerContent: _propTypes.default.any,
  headerContent: _propTypes.default.any,
  rangeColors: _propTypes.default.arrayOf(_propTypes.default.string),
  className: _propTypes.default.string,
  renderStaticRangeLabel: _propTypes.default.func
};
DefinedRange.defaultProps = {
  inputRanges: _defaultRanges.defaultInputRanges,
  staticRanges: _defaultRanges.defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0]
};
var _default = DefinedRange;
exports.default = _default;