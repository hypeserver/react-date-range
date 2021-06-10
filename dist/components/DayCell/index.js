"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.rangeShape = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _endOfDay = _interopRequireDefault(require("date-fns/endOfDay"));

var _isBefore = _interopRequireDefault(require("date-fns/isBefore"));

var _isAfter = _interopRequireDefault(require("date-fns/isAfter"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _startOfDay = _interopRequireDefault(require("date-fns/startOfDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var DayCell = /*#__PURE__*/function (_Component) {
  _inherits(DayCell, _Component);

  var _super = _createSuper(DayCell);

  function DayCell(props, context) {
    var _this;

    _classCallCheck(this, DayCell);

    _this = _super.call(this, props, context);

    _defineProperty(_assertThisInitialized(_this), "handleKeyEvent", function (event) {
      var _this$props = _this.props,
          day = _this$props.day,
          onMouseDown = _this$props.onMouseDown,
          onMouseUp = _this$props.onMouseUp;

      if ([13
      /* space */
      , 32
      /* enter */
      ].includes(event.keyCode)) {
        if (event.type === 'keydown') onMouseDown(day);else onMouseUp(day);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEvent", function (event) {
      var _this$props2 = _this.props,
          day = _this$props2.day,
          disabled = _this$props2.disabled,
          onPreviewChange = _this$props2.onPreviewChange,
          onMouseEnter = _this$props2.onMouseEnter,
          onMouseDown = _this$props2.onMouseDown,
          onMouseUp = _this$props2.onMouseUp;
      var stateChanges = {};

      if (disabled) {
        onPreviewChange();
        return;
      }

      switch (event.type) {
        case 'mouseenter':
          onMouseEnter(day);
          onPreviewChange(day);
          stateChanges.hover = true;
          break;

        case 'blur':
        case 'mouseleave':
          stateChanges.hover = false;
          break;

        case 'mousedown':
          stateChanges.active = true;
          onMouseDown(day);
          break;

        case 'mouseup':
          event.stopPropagation();
          stateChanges.active = false;
          onMouseUp(day);
          break;

        case 'focus':
          onPreviewChange(day);
          break;
      }

      if (Object.keys(stateChanges).length) {
        _this.setState(stateChanges);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getClassNames", function () {
      var _classnames;

      var _this$props3 = _this.props,
          isPassive = _this$props3.isPassive,
          isToday = _this$props3.isToday,
          isWeekend = _this$props3.isWeekend,
          isStartOfWeek = _this$props3.isStartOfWeek,
          isEndOfWeek = _this$props3.isEndOfWeek,
          isStartOfMonth = _this$props3.isStartOfMonth,
          isEndOfMonth = _this$props3.isEndOfMonth,
          disabled = _this$props3.disabled,
          styles = _this$props3.styles;
      return (0, _classnames4.default)(styles.day, (_classnames = {}, _defineProperty(_classnames, styles.dayPassive, isPassive), _defineProperty(_classnames, styles.dayDisabled, disabled), _defineProperty(_classnames, styles.dayToday, isToday), _defineProperty(_classnames, styles.dayWeekend, isWeekend), _defineProperty(_classnames, styles.dayStartOfWeek, isStartOfWeek), _defineProperty(_classnames, styles.dayEndOfWeek, isEndOfWeek), _defineProperty(_classnames, styles.dayStartOfMonth, isStartOfMonth), _defineProperty(_classnames, styles.dayEndOfMonth, isEndOfMonth), _defineProperty(_classnames, styles.dayHovered, _this.state.hover), _defineProperty(_classnames, styles.dayActive, _this.state.active), _classnames));
    });

    _defineProperty(_assertThisInitialized(_this), "renderPreviewPlaceholder", function () {
      var _classnames2;

      var _this$props4 = _this.props,
          preview = _this$props4.preview,
          day = _this$props4.day,
          styles = _this$props4.styles;
      if (!preview) return null;
      var startDate = preview.startDate ? (0, _endOfDay.default)(preview.startDate) : null;
      var endDate = preview.endDate ? (0, _startOfDay.default)(preview.endDate) : null;
      var isInRange = (!startDate || (0, _isAfter.default)(day, startDate)) && (!endDate || (0, _isBefore.default)(day, endDate));
      var isStartEdge = !isInRange && (0, _isSameDay.default)(day, startDate);
      var isEndEdge = !isInRange && (0, _isSameDay.default)(day, endDate);
      return /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames4.default)((_classnames2 = {}, _defineProperty(_classnames2, styles.dayStartPreview, isStartEdge), _defineProperty(_classnames2, styles.dayInPreview, isInRange), _defineProperty(_classnames2, styles.dayEndPreview, isEndEdge), _classnames2)),
        style: {
          color: preview.color
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectionPlaceholders", function () {
      var _this$props5 = _this.props,
          styles = _this$props5.styles,
          ranges = _this$props5.ranges,
          day = _this$props5.day;

      if (_this.props.displayMode === 'date') {
        var isSelected = (0, _isSameDay.default)(_this.props.day, _this.props.date);
        return isSelected ? /*#__PURE__*/_react.default.createElement("span", {
          className: styles.selected,
          style: {
            color: _this.props.color
          }
        }) : null;
      }

      var inRanges = ranges.reduce(function (result, range) {
        var startDate = range.startDate;
        var endDate = range.endDate;

        if (startDate && endDate && (0, _isBefore.default)(endDate, startDate)) {
          var _ref = [endDate, startDate];
          startDate = _ref[0];
          endDate = _ref[1];
        }

        startDate = startDate ? (0, _endOfDay.default)(startDate) : null;
        endDate = endDate ? (0, _startOfDay.default)(endDate) : null;
        var isInRange = (!startDate || (0, _isAfter.default)(day, startDate)) && (!endDate || (0, _isBefore.default)(day, endDate));
        var isStartEdge = !isInRange && (0, _isSameDay.default)(day, startDate);
        var isEndEdge = !isInRange && (0, _isSameDay.default)(day, endDate);

        if (isInRange || isStartEdge || isEndEdge) {
          return [].concat(_toConsumableArray(result), [_objectSpread({
            isStartEdge: isStartEdge,
            isEndEdge: isEndEdge,
            isInRange: isInRange
          }, range)]);
        }

        return result;
      }, []);
      return inRanges.map(function (range, i) {
        var _classnames3;

        return /*#__PURE__*/_react.default.createElement("span", {
          key: i,
          className: (0, _classnames4.default)((_classnames3 = {}, _defineProperty(_classnames3, styles.startEdge, range.isStartEdge), _defineProperty(_classnames3, styles.endEdge, range.isEndEdge), _defineProperty(_classnames3, styles.inRange, range.isInRange), _classnames3)),
          style: {
            color: range.color || _this.props.color
          }
        });
      });
    });

    _this.state = {
      hover: false,
      active: false
    };
    return _this;
  }

  _createClass(DayCell, [{
    key: "render",
    value: function render() {
      var dayContentRenderer = this.props.dayContentRenderer;
      return /*#__PURE__*/_react.default.createElement("button", _extends({
        type: "button",
        onMouseEnter: this.handleMouseEvent,
        onMouseLeave: this.handleMouseEvent,
        onFocus: this.handleMouseEvent,
        onMouseDown: this.handleMouseEvent,
        onMouseUp: this.handleMouseEvent,
        onBlur: this.handleMouseEvent,
        onPauseCapture: this.handleMouseEvent,
        onKeyDown: this.handleKeyEvent,
        onKeyUp: this.handleKeyEvent,
        className: this.getClassNames(this.props.styles)
      }, this.props.disabled || this.props.isPassive ? {
        tabIndex: -1
      } : {}, {
        style: {
          color: this.props.color
        }
      }), this.renderSelectionPlaceholders(), this.renderPreviewPlaceholder(), /*#__PURE__*/_react.default.createElement("span", {
        className: this.props.styles.dayNumber
      }, (dayContentRenderer === null || dayContentRenderer === void 0 ? void 0 : dayContentRenderer(this.props.day)) || /*#__PURE__*/_react.default.createElement("span", null, (0, _format.default)(this.props.day, this.props.dayDisplayFormat))));
    }
  }]);

  return DayCell;
}(_react.Component);

DayCell.defaultProps = {};

var rangeShape = _propTypes.default.shape({
  startDate: _propTypes.default.object,
  endDate: _propTypes.default.object,
  color: _propTypes.default.string,
  key: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  showDateDisplay: _propTypes.default.bool
});

exports.rangeShape = rangeShape;
DayCell.propTypes = {
  day: _propTypes.default.object.isRequired,
  dayDisplayFormat: _propTypes.default.string,
  date: _propTypes.default.object,
  ranges: _propTypes.default.arrayOf(rangeShape),
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object,
    color: _propTypes.default.string
  }),
  onPreviewChange: _propTypes.default.func,
  previewColor: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isPassive: _propTypes.default.bool,
  isToday: _propTypes.default.bool,
  isWeekend: _propTypes.default.bool,
  isStartOfWeek: _propTypes.default.bool,
  isEndOfWeek: _propTypes.default.bool,
  isStartOfMonth: _propTypes.default.bool,
  isEndOfMonth: _propTypes.default.bool,
  color: _propTypes.default.string,
  displayMode: _propTypes.default.oneOf(['dateRange', 'date']),
  styles: _propTypes.default.object,
  onMouseDown: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  dayContentRenderer: _propTypes.default.func
};
var _default = DayCell;
exports.default = _default;