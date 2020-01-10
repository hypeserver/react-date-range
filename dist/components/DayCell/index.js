"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.rangeShape = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class DayCell extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: false,
      active: false
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.renderSelectionPlaceholders = this.renderSelectionPlaceholders.bind(this);
    this.renderPreviewPlaceholder = this.renderPreviewPlaceholder.bind(this);
  }

  handleKeyEvent(event) {
    const {
      day,
      onMouseDown,
      onMouseUp
    } = this.props;

    if ([13
    /* space */
    , 32
    /* enter */
    ].includes(event.keyCode)) {
      if (event.type === 'keydown') onMouseDown(day);else onMouseUp(day);
    }
  }

  handleMouseEvent(event) {
    const {
      day,
      disabled,
      onPreviewChange,
      onMouseEnter,
      onMouseDown,
      onMouseUp
    } = this.props;
    const stateChanges = {};

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
      this.setState(stateChanges);
    }
  }

  getClassNames() {
    const {
      isPassive,
      isToday,
      isWeekend,
      isStartOfWeek,
      isEndOfWeek,
      isStartOfMonth,
      isEndOfMonth,
      disabled,
      styles
    } = this.props;
    return (0, _classnames.default)(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayDisabled]: disabled,
      [styles.dayToday]: isToday,
      [styles.dayWeekend]: isWeekend,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: isEndOfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: isEndOfMonth,
      [styles.dayHovered]: this.state.hover,
      [styles.dayActive]: this.state.active
    });
  }

  renderPreviewPlaceholder() {
    const {
      preview,
      day,
      styles
    } = this.props;
    if (!preview) return null;
    const startDate = preview.startDate ? (0, _dateFns.endOfDay)(preview.startDate) : null;
    const endDate = preview.endDate ? (0, _dateFns.startOfDay)(preview.endDate) : null;
    const isInRange = (!startDate || (0, _dateFns.isAfter)(day, startDate)) && (!endDate || (0, _dateFns.isBefore)(day, endDate));
    const isStartEdge = !isInRange && (0, _dateFns.isSameDay)(day, startDate);
    const isEndEdge = !isInRange && (0, _dateFns.isSameDay)(day, endDate);
    return _react.default.createElement("span", {
      className: (0, _classnames.default)({
        [styles.dayStartPreview]: isStartEdge,
        [styles.dayInPreview]: isInRange,
        [styles.dayEndPreview]: isEndEdge
      }),
      style: {
        color: preview.color
      }
    });
  }

  renderSelectionPlaceholders() {
    const {
      styles,
      ranges,
      day
    } = this.props;

    if (this.props.displayMode === 'date') {
      let isSelected = (0, _dateFns.isSameDay)(this.props.day, this.props.date);
      return isSelected ? _react.default.createElement("span", {
        className: styles.selected,
        style: {
          color: this.props.color
        }
      }) : null;
    }

    const inRanges = ranges.reduce((result, range) => {
      let startDate = range.startDate;
      let endDate = range.endDate;

      if (startDate && endDate && (0, _dateFns.isBefore)(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }

      startDate = startDate ? (0, _dateFns.endOfDay)(startDate) : null;
      endDate = endDate ? (0, _dateFns.startOfDay)(endDate) : null;
      const isInRange = (!startDate || (0, _dateFns.isAfter)(day, startDate)) && (!endDate || (0, _dateFns.isBefore)(day, endDate));
      const isStartEdge = !isInRange && (0, _dateFns.isSameDay)(day, startDate);
      const isEndEdge = !isInRange && (0, _dateFns.isSameDay)(day, endDate);

      if (isInRange || isStartEdge || isEndEdge) {
        return [...result, {
          isStartEdge,
          isEndEdge: isEndEdge,
          isInRange,
          ...range
        }];
      }

      return result;
    }, []);
    return inRanges.map((range, i) => _react.default.createElement("span", {
      key: i,
      className: (0, _classnames.default)({
        [styles.startEdge]: range.isStartEdge,
        [styles.endEdge]: range.isEndEdge,
        [styles.inRange]: range.isInRange
      }),
      style: {
        color: range.color || this.props.color
      }
    }));
  }

  render() {
    const {
      styles
    } = this.props;
    return _react.default.createElement("button", _extends({
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
      className: this.getClassNames(styles)
    }, this.props.disabled || this.props.isPassive ? {
      tabIndex: -1
    } : {}, {
      style: {
        color: this.props.color
      }
    }), this.renderSelectionPlaceholders(), this.renderPreviewPlaceholder(), _react.default.createElement("span", {
      className: styles.dayNumber
    }, _react.default.createElement("span", null, (0, _dateFns.format)(this.props.day, this.props.dayDisplayFormat))));
  }

}

DayCell.defaultProps = {};

const rangeShape = _propTypes.default.shape({
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
    endDate: _propTypes.default.object
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
  onMouseEnter: _propTypes.default.func
};
var _default = DayCell;
exports.default = _default;