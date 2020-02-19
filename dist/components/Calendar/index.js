"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DayCell = require("../DayCell");

var _Month = _interopRequireDefault(require("../Month"));

var _DateInput = _interopRequireDefault(require("../DateInput"));

var _utils = require("../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _reactList = _interopRequireDefault(require("react-list"));

var _dateFns = require("date-fns");

var _enUS = _interopRequireDefault(require("date-fns/locale/en-US"));

var _styles = _interopRequireDefault(require("../../styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Calendar extends _react.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.changeShownDate = this.changeShownDate.bind(this);
    this.focusToDate = this.focusToDate.bind(this);
    this.updateShownDate = this.updateShownDate.bind(this);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.renderDateDisplay = this.renderDateDisplay.bind(this);
    this.onDragSelectionStart = this.onDragSelectionStart.bind(this);
    this.onDragSelectionEnd = this.onDragSelectionEnd.bind(this);
    this.onDragSelectionMove = this.onDragSelectionMove.bind(this);
    this.renderMonthAndYear = this.renderMonthAndYear.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.estimateMonthSize = this.estimateMonthSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.dateOptions = {
      locale: props.locale
    };
    if (this.props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = this.props.weekStartsOn;
    this.styles = (0, _utils.generateStyles)([_styles.default, props.classNames]);
    this.listSizeCache = {};
    this.isFirstRender = true;
    this.state = {
      monthNames: [...Array(12).keys()].map(i => props.locale.localize.month(i)),
      focusedDate: (0, _utils.calcFocusDate)(null, props),
      drag: {
        status: false,
        range: {
          startDate: null,
          endDate: null
        },
        disablePreview: false
      },
      scrollArea: this.calcScrollArea(props)
    };
  }

  calcScrollArea(props) {
    const {
      direction,
      months,
      scroll
    } = props;
    if (!scroll.enabled) return {
      enabled: false
    };
    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;

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

  focusToDate(date, props = this.props, preventUnnecessary = true) {
    if (!props.scroll.enabled) {
      this.setState({
        focusedDate: date
      });
      return;
    }

    const targetMonthIndex = (0, _dateFns.differenceInCalendarMonths)(date, props.minDate, this.dateOptions);
    const visibleMonths = this.list.getVisibleRange();
    if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
    this.isFirstRender = true;
    this.list.scrollTo(targetMonthIndex);
    this.setState({
      focusedDate: date
    });
  }

  updateShownDate(props = this.props) {
    const newProps = props.scroll.enabled ? { ...props,
      months: this.list.getVisibleRange().length
    } : props;
    const newFocus = (0, _utils.calcFocusDate)(this.state.focusedDate, newProps);
    this.focusToDate(newFocus, newProps);
  }

  updatePreview(val) {
    if (!val) {
      this.setState({
        preview: null
      });
      return;
    }

    const preview = {
      startDate: val,
      endDate: val,
      color: this.props.color
    };
    this.setState({
      preview
    });
  }

  componentDidMount() {
    if (this.props.scroll.enabled) {
      // prevent react-list's initial render focus problem
      setTimeout(() => this.focusToDate(this.state.focusedDate));
    }
  }

  componentDidUpdate(prevProps) {
    const propMapper = {
      dateRange: 'ranges',
      date: 'date'
    };
    const targetProp = propMapper[this.props.displayMode];

    if (this.props[targetProp] !== prevProps[targetProp]) {
      this.updateShownDate(this.props);
    }

    if (prevProps.locale !== this.props.locale || prevProps.weekStartsOn !== this.props.weekStartsOn) {
      this.dateOptions = {
        locale: this.props.locale
      };
      if (this.props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = this.props.weekStartsOn;
      this.setState({
        monthNames: [...Array(12).keys()].map(i => this.props.locale.localize.month(i))
      });
    }

    if (JSON.stringify(prevProps.scroll) !== JSON.stringify(this.props.scroll)) {
      this.setState({
        scrollArea: this.calcScrollArea(this.props)
      });
    }
  }

  changeShownDate(value, mode = 'set') {
    const {
      focusedDate
    } = this.state;
    const {
      onShownDateChange,
      minDate,
      maxDate
    } = this.props;
    const modeMapper = {
      monthOffset: () => (0, _dateFns.addMonths)(focusedDate, value),
      setMonth: () => (0, _dateFns.setMonth)(focusedDate, value),
      setYear: () => (0, _dateFns.setYear)(focusedDate, value),
      set: () => value
    };
    const newDate = (0, _dateFns.min)([(0, _dateFns.max)([modeMapper[mode](), minDate]), maxDate]);
    this.focusToDate(newDate, this.props, false);
    onShownDateChange && onShownDateChange(newDate);
  }

  handleRangeFocusChange(rangesIndex, rangeItemIndex) {
    this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
  }

  handleScroll() {
    const {
      onShownDateChange,
      minDate
    } = this.props;
    const {
      focusedDate
    } = this.state;
    const {
      isFirstRender
    } = this;
    const visibleMonths = this.list.getVisibleRange(); // prevent scroll jump with wrong visible value

    if (visibleMonths[0] === undefined) return;
    const visibleMonth = (0, _dateFns.addMonths)(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !(0, _dateFns.isSameMonth)(visibleMonth, focusedDate);

    if (isFocusedToDifferent && !isFirstRender) {
      this.setState({
        focusedDate: visibleMonth
      });
      onShownDateChange && onShownDateChange(visibleMonth);
    }

    this.isFirstRender = false;
  }

  renderMonthAndYear(focusedDate, changeShownDate, props) {
    const {
      showMonthArrow,
      minDate,
      maxDate,
      showMonthAndYearPickers
    } = props;
    const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
    const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
    const styles = this.styles;
    return _react.default.createElement("div", {
      onMouseUp: e => e.stopPropagation(),
      className: styles.monthAndYearWrapper
    }, showMonthArrow ? _react.default.createElement("button", {
      type: "button",
      className: (0, _classnames.default)(styles.nextPrevButton, styles.prevButton),
      onClick: () => changeShownDate(-1, 'monthOffset')
    }, _react.default.createElement("i", null)) : null, showMonthAndYearPickers ? _react.default.createElement("span", {
      className: styles.monthAndYearPickers
    }, _react.default.createElement("span", {
      className: styles.monthPicker
    }, _react.default.createElement("select", {
      value: focusedDate.getMonth(),
      onChange: e => changeShownDate(e.target.value, 'setMonth')
    }, this.state.monthNames.map((monthName, i) => _react.default.createElement("option", {
      key: i,
      value: i
    }, monthName)))), _react.default.createElement("span", {
      className: styles.monthAndYearDivider
    }), _react.default.createElement("span", {
      className: styles.yearPicker
    }, _react.default.createElement("select", {
      value: focusedDate.getFullYear(),
      onChange: e => changeShownDate(e.target.value, 'setYear')
    }, new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map((val, i) => {
      const year = val - i;
      return _react.default.createElement("option", {
        key: year,
        value: year
      }, year);
    })))) : _react.default.createElement("span", {
      className: styles.monthAndYearPickers
    }, this.state.monthNames[focusedDate.getMonth()], " ", focusedDate.getFullYear()), showMonthArrow ? _react.default.createElement("button", {
      type: "button",
      className: (0, _classnames.default)(styles.nextPrevButton, styles.nextButton),
      onClick: () => changeShownDate(+1, 'monthOffset')
    }, _react.default.createElement("i", null)) : null);
  }

  renderWeekdays() {
    const now = new Date();
    return _react.default.createElement("div", {
      className: this.styles.weekDays
    }, (0, _dateFns.eachDayOfInterval)({
      start: (0, _dateFns.startOfWeek)(now, this.dateOptions),
      end: (0, _dateFns.endOfWeek)(now, this.dateOptions)
    }).map((day, i) => _react.default.createElement("span", {
      className: this.styles.weekDay,
      key: i
    }, (0, _dateFns.format)(day, 'E', this.dateOptions))));
  }

  renderDateDisplay() {
    const {
      focusedRange,
      color,
      ranges,
      rangeColors,
      dateDisplayFormat,
      editableDateInputs,
      startDatePlaceholder,
      endDatePlaceholder
    } = this.props;
    const defaultColor = rangeColors[focusedRange[0]] || color;
    const styles = this.styles;
    return _react.default.createElement("div", {
      className: styles.dateDisplayWrapper
    }, ranges.map((range, i) => {
      if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
      return _react.default.createElement("div", {
        className: styles.dateDisplay,
        key: i,
        style: {
          color: range.color || defaultColor
        }
      }, _react.default.createElement(_DateInput.default, {
        className: (0, _classnames.default)(styles.dateDisplayItem, {
          [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 0
        }),
        readOnly: !editableDateInputs,
        disabled: range.disabled,
        value: range.startDate,
        placeholder: startDatePlaceholder,
        dateOptions: this.dateOptions,
        dateDisplayFormat: dateDisplayFormat,
        onChange: this.onDragSelectionEnd,
        onFocus: () => this.handleRangeFocusChange(i, 0)
      }), _react.default.createElement(_DateInput.default, {
        className: (0, _classnames.default)(styles.dateDisplayItem, {
          [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1
        }),
        readOnly: !editableDateInputs,
        disabled: range.disabled,
        value: range.endDate,
        placeholder: endDatePlaceholder,
        dateOptions: this.dateOptions,
        dateDisplayFormat: dateDisplayFormat,
        onChange: this.onDragSelectionEnd,
        onFocus: () => this.handleRangeFocusChange(i, 1)
      }));
    }));
  }

  onDragSelectionStart(date) {
    const {
      onChange,
      dragSelectionEnabled
    } = this.props;

    if (dragSelectionEnabled) {
      this.setState({
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
  }

  onDragSelectionEnd(date) {
    const {
      updateRange,
      displayMode,
      onChange,
      dragSelectionEnabled
    } = this.props;
    if (!dragSelectionEnabled) return;

    if (displayMode === 'date' || !this.state.drag.status) {
      onChange && onChange(date);
      return;
    }

    const newRange = {
      startDate: this.state.drag.range.startDate,
      endDate: date
    };

    if (displayMode !== 'dateRange' || (0, _dateFns.isSameDay)(newRange.startDate, date)) {
      this.setState({
        drag: {
          status: false,
          range: {}
        }
      }, () => onChange && onChange(date));
    } else {
      this.setState({
        drag: {
          status: false,
          range: {}
        }
      }, () => {
        updateRange && updateRange(newRange);
      });
    }
  }

  onDragSelectionMove(date) {
    const {
      drag
    } = this.state;
    if (!drag.status || !this.props.dragSelectionEnabled) return;
    this.setState({
      drag: {
        status: drag.status,
        range: {
          startDate: drag.range.startDate,
          endDate: date
        },
        disablePreview: true
      }
    });
  }

  estimateMonthSize(index, cache) {
    const {
      direction,
      minDate
    } = this.props;
    const {
      scrollArea
    } = this.state;

    if (cache) {
      this.listSizeCache = cache;
      if (cache[index]) return cache[index];
    }

    if (direction === 'horizontal') return scrollArea.monthWidth;
    const monthStep = (0, _dateFns.addMonths)(minDate, index);
    const {
      start,
      end
    } = (0, _utils.getMonthDisplayRange)(monthStep, this.dateOptions);
    const isLongMonth = (0, _dateFns.differenceInDays)(end, start, this.dateOptions) + 1 > 7 * 5;
    return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
  }

  render() {
    const {
      showDateDisplay,
      onPreviewChange,
      scroll,
      direction,
      disabledDates,
      maxDate,
      minDate,
      rangeColors,
      color
    } = this.props;
    const {
      scrollArea,
      focusedDate
    } = this.state;
    const isVertical = direction === 'vertical';
    const navigatorRenderer = this.props.navigatorRenderer || this.renderMonthAndYear;
    const ranges = this.props.ranges.map((range, i) => ({ ...range,
      color: range.color || rangeColors[i] || color
    }));
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.calendarWrapper, this.props.className),
      onMouseUp: () => this.setState({
        drag: {
          status: false,
          range: {}
        }
      }),
      onMouseLeave: () => {
        this.setState({
          drag: {
            status: false,
            range: {}
          }
        });
      }
    }, showDateDisplay && this.renderDateDisplay(), navigatorRenderer(focusedDate, this.changeShownDate, this.props), scroll.enabled ? _react.default.createElement("div", null, isVertical && this.renderWeekdays(this.dateOptions), _react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
      onMouseLeave: () => onPreviewChange && onPreviewChange(),
      style: {
        width: scrollArea.calendarWidth + 11,
        height: scrollArea.calendarHeight + 11
      },
      onScroll: this.handleScroll
    }, _react.default.createElement(_reactList.default, {
      length: (0, _dateFns.differenceInCalendarMonths)((0, _dateFns.endOfMonth)(maxDate), (0, _dateFns.addDays)((0, _dateFns.startOfMonth)(minDate), -1), this.dateOptions),
      treshold: 500,
      type: "variable",
      ref: target => this.list = target,
      itemSizeEstimator: this.estimateMonthSize,
      axis: isVertical ? 'y' : 'x',
      itemRenderer: (index, key) => {
        const monthStep = (0, _dateFns.addMonths)(minDate, index);
        return _react.default.createElement(_Month.default, _extends({}, this.props, {
          onPreviewChange: this.props.onPreviewChange || this.updatePreview,
          preview: this.props.preview || this.state.preview,
          ranges: ranges,
          key: key,
          drag: this.state.drag,
          dateOptions: this.dateOptions,
          disabledDates: disabledDates,
          month: monthStep,
          onDragSelectionStart: this.onDragSelectionStart,
          onDragSelectionEnd: this.onDragSelectionEnd,
          onDragSelectionMove: this.onDragSelectionMove,
          onMouseLeave: () => onPreviewChange && onPreviewChange(),
          styles: this.styles,
          style: isVertical ? {
            height: this.estimateMonthSize(index)
          } : {
            height: scrollArea.monthHeight,
            width: this.estimateMonthSize(index)
          },
          showMonthName: true,
          showWeekDays: !isVertical
        }));
      }
    }))) : _react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal)
    }, new Array(this.props.months).fill(null).map((_, i) => {
      const monthStep = (0, _dateFns.addMonths)(this.state.focusedDate, i);
      return _react.default.createElement(_Month.default, _extends({}, this.props, {
        onPreviewChange: this.props.onPreviewChange || this.updatePreview,
        preview: this.props.preview || this.state.preview,
        ranges: ranges,
        key: i,
        drag: this.state.drag,
        dateOptions: this.dateOptions,
        disabledDates: disabledDates,
        month: monthStep,
        onDragSelectionStart: this.onDragSelectionStart,
        onDragSelectionEnd: this.onDragSelectionEnd,
        onDragSelectionMove: this.onDragSelectionMove,
        onMouseLeave: () => onPreviewChange && onPreviewChange(),
        styles: this.styles,
        showWeekDays: !isVertical || i === 0,
        showMonthName: !isVertical || i > 0
      }));
    })));
  }

}

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  classNames: {},
  locale: _enUS.default,
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
  dragSelectionEnabled: true
};
Calendar.propTypes = {
  showMonthArrow: _propTypes.default.bool,
  showMonthAndYearPickers: _propTypes.default.bool,
  disabledDates: _propTypes.default.array,
  minDate: _propTypes.default.object,
  maxDate: _propTypes.default.object,
  date: _propTypes.default.object,
  onChange: _propTypes.default.func,
  onPreviewChange: _propTypes.default.func,
  onRangeFocusChange: _propTypes.default.func,
  classNames: _propTypes.default.object,
  locale: _propTypes.default.object,
  shownDate: _propTypes.default.object,
  onShownDateChange: _propTypes.default.func,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object,
    color: _propTypes.default.string
  }),
  dateDisplayFormat: _propTypes.default.string,
  monthDisplayFormat: _propTypes.default.string,
  weekdayDisplayFormat: _propTypes.default.string,
  weekStartsOn: _propTypes.default.number,
  dayDisplayFormat: _propTypes.default.string,
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  initialFocusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  months: _propTypes.default.number,
  className: _propTypes.default.string,
  showDateDisplay: _propTypes.default.bool,
  showPreview: _propTypes.default.bool,
  displayMode: _propTypes.default.oneOf(['dateRange', 'date']),
  color: _propTypes.default.string,
  updateRange: _propTypes.default.func,
  scroll: _propTypes.default.shape({
    enabled: _propTypes.default.bool,
    monthHeight: _propTypes.default.number,
    longMonthHeight: _propTypes.default.number,
    monthWidth: _propTypes.default.number,
    calendarWidth: _propTypes.default.number,
    calendarHeight: _propTypes.default.number
  }),
  direction: _propTypes.default.oneOf(['vertical', 'horizontal']),
  startDatePlaceholder: _propTypes.default.string,
  endDatePlaceholder: _propTypes.default.string,
  navigatorRenderer: _propTypes.default.func,
  rangeColors: _propTypes.default.arrayOf(_propTypes.default.string),
  editableDateInputs: _propTypes.default.bool,
  dragSelectionEnabled: _propTypes.default.bool
};
var _default = Calendar;
exports.default = _default;