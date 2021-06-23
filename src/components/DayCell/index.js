/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';

class DayCell extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hover: false,
      active: false,
    };
  }

  handleKeyEvent = event => {
    const { day, onMouseDown, onMouseUp } = this.props;
    if ([13 /* space */, 32 /* enter */].includes(event.keyCode)) {
      if (event.type === 'keydown') onMouseDown(day);
      else onMouseUp(day);
    }
  };
  handleMouseEvent = event => {
    const { day, disabled, onPreviewChange, onMouseEnter, onMouseDown, onMouseUp } = this.props;
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
  };
  getClassNames = () => {
    const {
      isPassive,
      isToday,
      isWeekend,
      isStartOfWeek,
      isEndOfWeek,
      isStartOfMonth,
      isEndOfMonth,
      disabled,
      styles,
    } = this.props;

    return classnames(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayDisabled]: disabled,
      [styles.dayToday]: isToday,
      [styles.dayWeekend]: isWeekend,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: isEndOfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: isEndOfMonth,
      [styles.dayHovered]: this.state.hover,
      [styles.dayActive]: this.state.active,
    });
  };
  renderPreviewPlaceholder = () => {
    const { preview, day, styles } = this.props;
    if (!preview) return null;
    const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
    const endDate = preview.endDate ? startOfDay(preview.endDate) : null;
    const isInRange =
      (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
    const isStartEdge = !isInRange && isSameDay(day, startDate);
    const isEndEdge = !isInRange && isSameDay(day, endDate);
    return (
      <span
        className={classnames({
          [styles.dayStartPreview]: isStartEdge,
          [styles.dayInPreview]: isInRange,
          [styles.dayEndPreview]: isEndEdge,
        })}
        style={{ color: preview.color }}
      />
    );
  };
  renderSelectionPlaceholders = () => {
    const { styles, ranges, day } = this.props;
    if (this.props.displayMode === 'date') {
      let isSelected = isSameDay(this.props.day, this.props.date);
      return isSelected ? (
        <span className={styles.selected} style={{ color: this.props.color }} />
      ) : null;
    }

    const inRanges = ranges.reduce((result, range) => {
      let startDate = range.startDate;
      let endDate = range.endDate;
      if (startDate && endDate && isBefore(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      startDate = startDate ? endOfDay(startDate) : null;
      endDate = endDate ? startOfDay(endDate) : null;
      const isInRange =
        (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
      const isStartEdge = !isInRange && isSameDay(day, startDate);
      const isEndEdge = !isInRange && isSameDay(day, endDate);
      if (isInRange || isStartEdge || isEndEdge) {
        return [
          ...result,
          {
            isStartEdge,
            isEndEdge: isEndEdge,
            isInRange,
            ...range,
          },
        ];
      }
      return result;
    }, []);

    return inRanges.map((range, i) => (
      <span
        key={i}
        className={classnames({
          [styles.startEdge]: range.isStartEdge,
          [styles.endEdge]: range.isEndEdge,
          [styles.inRange]: range.isInRange,
        })}
        style={{ color: range.color || this.props.color }}
      />
    ));
  };

  render() {
    const { dayContentRenderer } = this.props;
    return (
      <button
        type="button"
        onMouseEnter={this.handleMouseEvent}
        onMouseLeave={this.handleMouseEvent}
        onFocus={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
        onBlur={this.handleMouseEvent}
        onPauseCapture={this.handleMouseEvent}
        onKeyDown={this.handleKeyEvent}
        onKeyUp={this.handleKeyEvent}
        className={this.getClassNames(this.props.styles)}
        {...(this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {})}
        style={{ color: this.props.color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        <span className={this.props.styles.dayNumber}>
          {dayContentRenderer?.(this.props.day) || (
            <span>{format(this.props.day, this.props.dayDisplayFormat)}</span>
          )}
        </span>
      </button>
    );
  }
}

DayCell.defaultProps = {};

export const rangeShape = PropTypes.shape({
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  color: PropTypes.string,
  key: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  showDateDisplay: PropTypes.bool,
});

DayCell.propTypes = {
  day: PropTypes.object.isRequired,
  dayDisplayFormat: PropTypes.string,
  date: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    color: PropTypes.string,
  }),
  onPreviewChange: PropTypes.func,
  previewColor: PropTypes.string,
  disabled: PropTypes.bool,
  isPassive: PropTypes.bool,
  isToday: PropTypes.bool,
  isWeekend: PropTypes.bool,
  isStartOfWeek: PropTypes.bool,
  isEndOfWeek: PropTypes.bool,
  isStartOfMonth: PropTypes.bool,
  isEndOfMonth: PropTypes.bool,
  color: PropTypes.string,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  styles: PropTypes.object,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  dayContentRenderer: PropTypes.func,
};

export default DayCell;
