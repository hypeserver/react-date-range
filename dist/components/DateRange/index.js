"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _DayCell = require("../DayCell");

var _utils = require("../../utils");

var _dateFns = require("date-fns");

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("../../styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class DateRange extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.setSelection = this.setSelection.bind(this);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.calcNewSelection = this.calcNewSelection.bind(this);
    this.state = {
      focusedRange: props.initialFocusedRange || [(0, _utils.findNextRangeIndex)(props.ranges), 0],
      preview: null
    };
    this.styles = (0, _utils.generateStyles)([_styles.default, props.classNames]);
  }

  calcNewSelection(value, isSingleValue = true) {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const {
      ranges,
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      disabledDates
    } = this.props;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange || !onChange) return {};
    let {
      startDate,
      endDate
    } = selectedRange;
    if (!endDate) endDate = new Date(startDate);
    let nextFocusRange;

    if (!isSingleValue) {
      startDate = value.startDate;
      endDate = value.endDate;
    } else if (focusedRange[1] === 0) {
      // startDate selection
      const dayOffset = (0, _dateFns.differenceInCalendarDays)(endDate, startDate);
      startDate = value;
      endDate = moveRangeOnFirstSelection ? (0, _dateFns.addDays)(value, dayOffset) : value;
      if (maxDate) endDate = (0, _dateFns.min)([endDate, maxDate]);
      nextFocusRange = [focusedRange[0], 1];
    } else {
      endDate = value;
    } // reverse dates if startDate before endDate


    let isStartDateSelected = focusedRange[1] === 0;

    if ((0, _dateFns.isBefore)(endDate, startDate)) {
      isStartDateSelected = !isStartDateSelected;
      [startDate, endDate] = [endDate, startDate];
    }

    const inValidDatesWithinRange = disabledDates.filter(disabledDate => (0, _dateFns.isWithinInterval)(disabledDate, {
      start: startDate,
      end: endDate
    }));

    if (inValidDatesWithinRange.length > 0) {
      if (isStartDateSelected) {
        startDate = (0, _dateFns.addDays)((0, _dateFns.max)(inValidDatesWithinRange), 1);
      } else {
        endDate = (0, _dateFns.addDays)((0, _dateFns.min)(inValidDatesWithinRange), -1);
      }
    }

    if (!nextFocusRange) {
      const nextFocusRangeIndex = (0, _utils.findNextRangeIndex)(this.props.ranges, focusedRange[0]);
      nextFocusRange = [nextFocusRangeIndex, 0];
    }

    return {
      wasValid: !(inValidDatesWithinRange.length > 0),
      range: {
        startDate,
        endDate
      },
      nextFocusRange: nextFocusRange
    };
  }

  setSelection(value, isSingleValue) {
    const {
      onChange,
      ranges,
      onRangeFocusChange
    } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange) return;
    const newSelection = this.calcNewSelection(value, isSingleValue);
    onChange({
      [selectedRange.key || `range${focusedRangeIndex + 1}`]: { ...selectedRange,
        ...newSelection.range
      }
    });
    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null
    });
    onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
  }

  handleRangeFocusChange(focusedRange) {
    this.setState({
      focusedRange
    });
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  }

  updatePreview(val) {
    if (!val) {
      this.setState({
        preview: null
      });
      return;
    }

    const {
      rangeColors,
      ranges
    } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]] || color;
    this.setState({
      preview: { ...val.range,
        color
      }
    });
  }

  render() {
    return _react.default.createElement(_Calendar.default, _extends({
      focusedRange: this.state.focusedRange,
      onRangeFocusChange: this.handleRangeFocusChange,
      preview: this.state.preview,
      onPreviewChange: value => {
        this.updatePreview(value ? this.calcNewSelection(value) : null);
      }
    }, this.props, {
      displayMode: "dateRange",
      className: (0, _classnames.default)(this.styles.dateRangeWrapper, this.props.className),
      onChange: this.setSelection,
      updateRange: val => this.setSelection(val, false),
      ref: target => {
        this.calendar = target;
      }
    }));
  }

}

DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: []
};
DateRange.propTypes = { ..._Calendar.default.propTypes,
  onChange: _propTypes.default.func,
  onRangeFocusChange: _propTypes.default.func,
  className: _propTypes.default.string,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  moveRangeOnFirstSelection: _propTypes.default.bool
};
var _default = DateRange;
exports.default = _default;