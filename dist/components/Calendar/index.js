"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DayCell = require("../DayCell");

var _Month = _interopRequireDefault(require("../Month"));

var _DateInput = _interopRequireDefault(require("../DateInput"));

var _utils = require("../../utils");

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactList = _interopRequireDefault(require("react-list"));

var _shallowEqual = require("shallow-equal");

var _dateFns = require("date-fns");

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

var _styles = _interopRequireDefault(require("../../styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var Calendar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar(_props, context) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, _props, context));

    _defineProperty(_assertThisInitialized(_this), "focusToDate", function (date) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props;
      var preventUnnecessary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!props.scroll.enabled) {
        _this.setState({
          focusedDate: date
        });

        return;
      }

      var targetMonthIndex = (0, _dateFns.differenceInCalendarMonths)(date, props.minDate, _this.dateOptions);

      var visibleMonths = _this.list.getVisibleRange();

      if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
      _this.isFirstRender = true;

      _this.list.scrollTo(targetMonthIndex);

      _this.setState({
        focusedDate: date
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateShownDate", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var newProps = props.scroll.enabled ? _objectSpread({}, props, {
        months: _this.list.getVisibleRange().length
      }) : props;
      var newFocus = (0, _utils.calcFocusDate)(_this.state.focusedDate, newProps);

      _this.focusToDate(newFocus, newProps);
    });

    _defineProperty(_assertThisInitialized(_this), "updatePreview", function (val) {
      if (!val) {
        _this.setState({
          preview: null
        });

        return;
      }

      var preview = {
        startDate: val,
        endDate: val,
        color: _this.props.color
      };

      _this.setState({
        preview: preview
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeShownDate", function (value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';
      var focusedDate = _this.state.focusedDate;
      var _this$props = _this.props,
          onShownDateChange = _this$props.onShownDateChange,
          minDate = _this$props.minDate,
          maxDate = _this$props.maxDate;
      var modeMapper = {
        monthOffset: function monthOffset() {
          return (0, _dateFns.addMonths)(focusedDate, value);
        },
        setMonth: function setMonth() {
          return (0, _dateFns.setMonth)(focusedDate, value);
        },
        setYear: function setYear() {
          return (0, _dateFns.setYear)(focusedDate, value);
        },
        set: function set() {
          return value;
        }
      };
      var newDate = (0, _dateFns.min)([(0, _dateFns.max)([modeMapper[mode](), minDate]), maxDate]);

      _this.focusToDate(newDate, _this.props, false);

      onShownDateChange && onShownDateChange(newDate);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRangeFocusChange", function (rangesIndex, rangeItemIndex) {
      _this.props.onRangeFocusChange && _this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      var _this$props2 = _this.props,
          onShownDateChange = _this$props2.onShownDateChange,
          minDate = _this$props2.minDate;
      var focusedDate = _this.state.focusedDate;

      var _assertThisInitialize = _assertThisInitialized(_this),
          isFirstRender = _assertThisInitialize.isFirstRender;

      var visibleMonths = _this.list.getVisibleRange(); // prevent scroll jump with wrong visible value


      if (visibleMonths[0] === undefined) return;
      var visibleMonth = (0, _dateFns.addMonths)(minDate, visibleMonths[0] || 0);
      var isFocusedToDifferent = !(0, _dateFns.isSameMonth)(visibleMonth, focusedDate);

      if (isFocusedToDifferent && !isFirstRender) {
        _this.setState({
          focusedDate: visibleMonth
        });

        onShownDateChange && onShownDateChange(visibleMonth);
      }

      _this.isFirstRender = false;
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthAndYear", function (focusedDate, changeShownDate, props) {
      var showMonthArrow = props.showMonthArrow,
          minDate = props.minDate,
          maxDate = props.maxDate,
          showMonthAndYearPickers = props.showMonthAndYearPickers;
      var upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
      var lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
      var styles = _this.styles;
      return _react["default"].createElement("div", {
        onMouseUp: function onMouseUp(e) {
          return e.stopPropagation();
        },
        className: styles.monthAndYearWrapper
      }, showMonthArrow ? _react["default"].createElement("button", {
        type: "button",
        className: (0, _classnames3["default"])(styles.nextPrevButton, styles.prevButton),
        onClick: function onClick() {
          return changeShownDate(-1, 'monthOffset');
        }
      }, _react["default"].createElement("i", null)) : null, showMonthAndYearPickers ? _react["default"].createElement("span", {
        className: styles.monthAndYearPickers
      }, _react["default"].createElement("span", {
        className: styles.monthPicker
      }, _react["default"].createElement("select", {
        value: focusedDate.getMonth(),
        onChange: function onChange(e) {
          return changeShownDate(e.target.value, 'setMonth');
        }
      }, _this.state.monthNames.map(function (monthName, i) {
        return _react["default"].createElement("option", {
          key: i,
          value: i
        }, monthName);
      }))), _react["default"].createElement("span", {
        className: styles.monthAndYearDivider
      }), _react["default"].createElement("span", {
        className: styles.yearPicker
      }, _react["default"].createElement("select", {
        value: focusedDate.getFullYear(),
        onChange: function onChange(e) {
          return changeShownDate(e.target.value, 'setYear');
        }
      }, new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map(function (val, i) {
        var year = val - i;
        return _react["default"].createElement("option", {
          key: year,
          value: year
        }, year);
      })))) : _react["default"].createElement("span", {
        className: styles.monthAndYearPickers
      }, _this.state.monthNames[focusedDate.getMonth()], " ", focusedDate.getFullYear()), showMonthArrow ? _react["default"].createElement("button", {
        type: "button",
        className: (0, _classnames3["default"])(styles.nextPrevButton, styles.nextButton),
        onClick: function onClick() {
          return changeShownDate(+1, 'monthOffset');
        }
      }, _react["default"].createElement("i", null)) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateDisplay", function () {
      var _this$props3 = _this.props,
          focusedRange = _this$props3.focusedRange,
          color = _this$props3.color,
          ranges = _this$props3.ranges,
          rangeColors = _this$props3.rangeColors,
          dateDisplayFormat = _this$props3.dateDisplayFormat,
          editableDateInputs = _this$props3.editableDateInputs,
          startDatePlaceholder = _this$props3.startDatePlaceholder,
          endDatePlaceholder = _this$props3.endDatePlaceholder;
      var defaultColor = rangeColors[focusedRange[0]] || color;
      var styles = _this.styles;
      return _react["default"].createElement("div", {
        className: styles.dateDisplayWrapper
      }, ranges.map(function (range, i) {
        if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
        return _react["default"].createElement("div", {
          className: styles.dateDisplay,
          key: i,
          style: {
            color: range.color || defaultColor
          }
        }, _react["default"].createElement(_DateInput["default"], {
          className: (0, _classnames3["default"])(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 0)),
          readOnly: !editableDateInputs,
          disabled: range.disabled,
          value: range.startDate,
          placeholder: startDatePlaceholder,
          dateOptions: _this.dateOptions,
          dateDisplayFormat: dateDisplayFormat,
          onChange: _this.onDragSelectionEnd,
          onFocus: function onFocus() {
            return _this.handleRangeFocusChange(i, 0);
          }
        }), _react["default"].createElement(_DateInput["default"], {
          className: (0, _classnames3["default"])(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 1)),
          readOnly: !editableDateInputs,
          disabled: range.disabled,
          value: range.endDate,
          placeholder: endDatePlaceholder,
          dateOptions: _this.dateOptions,
          dateDisplayFormat: dateDisplayFormat,
          onChange: _this.onDragSelectionEnd,
          onFocus: function onFocus() {
            return _this.handleRangeFocusChange(i, 1);
          }
        }));
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragSelectionStart", function (date) {
      var _this$props4 = _this.props,
          onChange = _this$props4.onChange,
          dragSelectionEnabled = _this$props4.dragSelectionEnabled;

      if (dragSelectionEnabled) {
        _this.setState({
          drag: {
            status: true,
            range: {
              startDate: date,
              endDate: date
            },
            disablePreview: true
          }
        });
      } else {
        onChange && onChange(date);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDragSelectionEnd", function (date) {
      var _this$props5 = _this.props,
          updateRange = _this$props5.updateRange,
          displayMode = _this$props5.displayMode,
          onChange = _this$props5.onChange,
          dragSelectionEnabled = _this$props5.dragSelectionEnabled;
      if (!dragSelectionEnabled) return;

      if (displayMode === 'date' || !_this.state.drag.status) {
        onChange && onChange(date);
        return;
      }

      var newRange = {
        startDate: _this.state.drag.range.startDate,
        endDate: date
      };

      if (displayMode !== 'dateRange' || (0, _dateFns.isSameDay)(newRange.startDate, date)) {
        _this.setState({
          drag: {
            status: false,
            range: {}
          }
        }, function () {
          return onChange && onChange(date);
        });
      } else {
        _this.setState({
          drag: {
            status: false,
            range: {}
          }
        }, function () {
          updateRange && updateRange(newRange);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDragSelectionMove", function (date) {
      var drag = _this.state.drag;
      if (!drag.status || !_this.props.dragSelectionEnabled) return;

      _this.setState({
        drag: {
          status: drag.status,
          range: {
            startDate: drag.range.startDate,
            endDate: date
          },
          disablePreview: true
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "estimateMonthSize", function (index, cache) {
      var _this$props6 = _this.props,
          direction = _this$props6.direction,
          minDate = _this$props6.minDate;
      var scrollArea = _this.state.scrollArea;

      if (cache) {
        _this.listSizeCache = cache;
        if (cache[index]) return cache[index];
      }

      if (direction === 'horizontal') return scrollArea.monthWidth;
      var monthStep = (0, _dateFns.addMonths)(minDate, index);

      var _getMonthDisplayRange = (0, _utils.getMonthDisplayRange)(monthStep, _this.dateOptions),
          start = _getMonthDisplayRange.start,
          end = _getMonthDisplayRange.end;

      var isLongMonth = (0, _dateFns.differenceInDays)(end, start, _this.dateOptions) + 1 > 7 * 5;
      return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    });

    _this.dateOptions = {
      locale: _props.locale
    };
    if (_props.weekStartsOn !== undefined) _this.dateOptions.weekStartsOn = _props.weekStartsOn;
    _this.styles = (0, _utils.generateStyles)([_styles["default"], _props.classNames]);
    _this.listSizeCache = {};
    _this.isFirstRender = true;
    _this.state = {
      monthNames: _this.getMonthNames(),
      focusedDate: (0, _utils.calcFocusDate)(null, _props),
      drag: {
        status: false,
        range: {
          startDate: null,
          endDate: null
        },
        disablePreview: false
      },
      scrollArea: _this.calcScrollArea(_props)
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "getMonthNames",
    value: function getMonthNames() {
      var _this2 = this;

      return _toConsumableArray(Array(12).keys()).map(function (i) {
        return _this2.props.locale.localize.month(i);
      });
    }
  }, {
    key: "calcScrollArea",
    value: function calcScrollArea(props) {
      var direction = props.direction,
          months = props.months,
          scroll = props.scroll;
      if (!scroll.enabled) return {
        enabled: false
      };
      var longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;

      if (direction === 'vertical') {
        return {
          enabled: true,
          monthHeight: scroll.monthHeight || 220,
          longMonthHeight: longMonthHeight || 260,
          calendarWidth: 'auto',
          calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months
        };
      }

      return {
        enabled: true,
        monthWidth: scroll.monthWidth || 332,
        calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
        monthHeight: longMonthHeight || 300,
        calendarHeight: longMonthHeight || 300
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.scroll.enabled) {
        // prevent react-list's initial render focus problem
        setTimeout(function () {
          return _this3.focusToDate(_this3.state.focusedDate);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var propMapper = {
        dateRange: 'ranges',
        date: 'date'
      };
      var targetProp = propMapper[this.props.displayMode];

      if (this.props[targetProp] !== prevProps[targetProp]) {
        this.updateShownDate(this.props);
      }

      if (prevProps.locale !== this.props.locale || prevProps.weekStartsOn !== this.props.weekStartsOn) {
        this.dateOptions = {
          locale: this.props.locale
        };
        if (this.props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = this.props.weekStartsOn;
        this.setState({
          monthNames: this.getMonthNames()
        });
      }

      if (!(0, _shallowEqual.shallowEqualObjects)(prevProps.scroll, this.props.scroll)) {
        this.setState({
          scrollArea: this.calcScrollArea(this.props)
        });
      }
    }
  }, {
    key: "renderWeekdays",
    value: function renderWeekdays() {
      var _this4 = this;

      var now = new Date();
      return _react["default"].createElement("div", {
        className: this.styles.weekDays
      }, (0, _dateFns.eachDayOfInterval)({
        start: (0, _dateFns.startOfWeek)(now, this.dateOptions),
        end: (0, _dateFns.endOfWeek)(now, this.dateOptions)
      }).map(function (day, i) {
        return _react["default"].createElement("span", {
          className: _this4.styles.weekDay,
          key: i
        }, (0, _dateFns.format)(day, _this4.props.weekdayDisplayFormat, _this4.dateOptions));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props7 = this.props,
          showDateDisplay = _this$props7.showDateDisplay,
          onPreviewChange = _this$props7.onPreviewChange,
          scroll = _this$props7.scroll,
          direction = _this$props7.direction,
          disabledDates = _this$props7.disabledDates,
          disabledDay = _this$props7.disabledDay,
          maxDate = _this$props7.maxDate,
          minDate = _this$props7.minDate,
          rangeColors = _this$props7.rangeColors,
          color = _this$props7.color,
          navigatorRenderer = _this$props7.navigatorRenderer,
          className = _this$props7.className,
          preview = _this$props7.preview;
      var _this$state = this.state,
          scrollArea = _this$state.scrollArea,
          focusedDate = _this$state.focusedDate;
      var isVertical = direction === 'vertical';
      var monthAndYearRenderer = navigatorRenderer || this.renderMonthAndYear;
      var ranges = this.props.ranges.map(function (range, i) {
        return _objectSpread({}, range, {
          color: range.color || rangeColors[i] || color
        });
      });
      return _react["default"].createElement("div", {
        className: (0, _classnames3["default"])(this.styles.calendarWrapper, className),
        onMouseUp: function onMouseUp() {
          return _this5.setState({
            drag: {
              status: false,
              range: {}
            }
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this5.setState({
            drag: {
              status: false,
              range: {}
            }
          });
        }
      }, showDateDisplay && this.renderDateDisplay(), monthAndYearRenderer(focusedDate, this.changeShownDate, this.props), scroll.enabled ? _react["default"].createElement("div", null, isVertical && this.renderWeekdays(this.dateOptions), _react["default"].createElement("div", {
        className: (0, _classnames3["default"])(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
        onMouseLeave: function onMouseLeave() {
          return onPreviewChange && onPreviewChange();
        },
        style: {
          width: scrollArea.calendarWidth + 11,
          height: scrollArea.calendarHeight + 11
        },
        onScroll: this.handleScroll
      }, _react["default"].createElement(_reactList["default"], {
        length: (0, _dateFns.differenceInCalendarMonths)((0, _dateFns.endOfMonth)(maxDate), (0, _dateFns.addDays)((0, _dateFns.startOfMonth)(minDate), -1), this.dateOptions),
        treshold: 500,
        type: "variable",
        ref: function ref(target) {
          return _this5.list = target;
        },
        itemSizeEstimator: this.estimateMonthSize,
        axis: isVertical ? 'y' : 'x',
        itemRenderer: function itemRenderer(index, key) {
          var monthStep = (0, _dateFns.addMonths)(minDate, index);
          return _react["default"].createElement(_Month["default"], _extends({}, _this5.props, {
            onPreviewChange: onPreviewChange || _this5.updatePreview,
            preview: preview || _this5.state.preview,
            ranges: ranges,
            key: key,
            drag: _this5.state.drag,
            dateOptions: _this5.dateOptions,
            disabledDates: disabledDates,
            disabledDay: disabledDay,
            month: monthStep,
            onDragSelectionStart: _this5.onDragSelectionStart,
            onDragSelectionEnd: _this5.onDragSelectionEnd,
            onDragSelectionMove: _this5.onDragSelectionMove,
            onMouseLeave: function onMouseLeave() {
              return onPreviewChange && onPreviewChange();
            },
            styles: _this5.styles,
            style: isVertical ? {
              height: _this5.estimateMonthSize(index)
            } : {
              height: scrollArea.monthHeight,
              width: _this5.estimateMonthSize(index)
            },
            showMonthName: true,
            showWeekDays: !isVertical
          }));
        }
      }))) : _react["default"].createElement("div", {
        className: (0, _classnames3["default"])(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal)
      }, new Array(this.props.months).fill(null).map(function (_, i) {
        var monthStep = (0, _dateFns.addMonths)(_this5.state.focusedDate, i);
        return _react["default"].createElement(_Month["default"], _extends({}, _this5.props, {
          onPreviewChange: onPreviewChange || _this5.updatePreview,
          preview: preview || _this5.state.preview,
          ranges: ranges,
          key: i,
          drag: _this5.state.drag,
          dateOptions: _this5.dateOptions,
          disabledDates: disabledDates,
          disabledDay: disabledDay,
          month: monthStep,
          onDragSelectionStart: _this5.onDragSelectionStart,
          onDragSelectionEnd: _this5.onDragSelectionEnd,
          onDragSelectionMove: _this5.onDragSelectionMove,
          onMouseLeave: function onMouseLeave() {
            return onPreviewChange && onPreviewChange();
          },
          styles: _this5.styles,
          showWeekDays: !isVertical || i === 0,
          showMonthName: !isVertical || i > 0
        }));
      })));
    }
  }]);

  return Calendar;
}(_react.PureComponent);

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  disabledDay: function disabledDay() {},
  classNames: {},
  locale: _enUS["default"],
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM d, yyyy',
  monthDisplayFormat: 'MMM yyyy',
  weekdayDisplayFormat: 'E',
  dayDisplayFormat: 'd',
  showDateDisplay: true,
  showPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false
  },
  direction: 'vertical',
  maxDate: (0, _dateFns.addYears)(new Date(), 20),
  minDate: (0, _dateFns.addYears)(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  startDatePlaceholder: 'Early',
  endDatePlaceholder: 'Continuous',
  editableDateInputs: false,
  dragSelectionEnabled: true,
  fixedHeight: false
};
Calendar.propTypes = {
  showMonthArrow: _propTypes["default"].bool,
  showMonthAndYearPickers: _propTypes["default"].bool,
  disabledDates: _propTypes["default"].array,
  disabledDay: _propTypes["default"].func,
  minDate: _propTypes["default"].object,
  maxDate: _propTypes["default"].object,
  date: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  onPreviewChange: _propTypes["default"].func,
  onRangeFocusChange: _propTypes["default"].func,
  classNames: _propTypes["default"].object,
  locale: _propTypes["default"].object,
  shownDate: _propTypes["default"].object,
  onShownDateChange: _propTypes["default"].func,
  ranges: _propTypes["default"].arrayOf(_DayCell.rangeShape),
  preview: _propTypes["default"].shape({
    startDate: _propTypes["default"].object,
    endDate: _propTypes["default"].object,
    color: _propTypes["default"].string
  }),
  dateDisplayFormat: _propTypes["default"].string,
  monthDisplayFormat: _propTypes["default"].string,
  weekdayDisplayFormat: _propTypes["default"].string,
  weekStartsOn: _propTypes["default"].number,
  dayDisplayFormat: _propTypes["default"].string,
  focusedRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  initialFocusedRange: _propTypes["default"].arrayOf(_propTypes["default"].number),
  months: _propTypes["default"].number,
  className: _propTypes["default"].string,
  showDateDisplay: _propTypes["default"].bool,
  showPreview: _propTypes["default"].bool,
  displayMode: _propTypes["default"].oneOf(['dateRange', 'date']),
  color: _propTypes["default"].string,
  updateRange: _propTypes["default"].func,
  scroll: _propTypes["default"].shape({
    enabled: _propTypes["default"].bool,
    monthHeight: _propTypes["default"].number,
    longMonthHeight: _propTypes["default"].number,
    monthWidth: _propTypes["default"].number,
    calendarWidth: _propTypes["default"].number,
    calendarHeight: _propTypes["default"].number
  }),
  direction: _propTypes["default"].oneOf(['vertical', 'horizontal']),
  startDatePlaceholder: _propTypes["default"].string,
  endDatePlaceholder: _propTypes["default"].string,
  navigatorRenderer: _propTypes["default"].func,
  rangeColors: _propTypes["default"].arrayOf(_propTypes["default"].string),
  editableDateInputs: _propTypes["default"].bool,
  dragSelectionEnabled: _propTypes["default"].bool,
  fixedHeight: _propTypes["default"].bool
};
var _default = Calendar;
exports["default"] = _default;