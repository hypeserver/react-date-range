import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';

class DayCell extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hover: false,
      active: false,
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.renderSelectionPlaceholders = this.renderSelectionPlaceholders.bind(this);
    this.renderPreviewPlaceholder = this.renderPreviewPlaceholder.bind(this);
  }

  handleMouseEvent(event) {
    const { day, disabled, onSelect, onPreviewChange } = this.props;
    if (disabled) return null;
    const stateChanges = {};
    switch (event.type) {
      case 'click':
        onSelect && onSelect(day, 'selection');
        break;
      case 'blur':
      case 'mouseleave':
        stateChanges.hover = false;
        break;
      case 'mousedown':
        stateChanges.active = true;
        break;
      case 'mouseup':
        stateChanges.active = false;
        break;
      case 'mouseenter':
      case 'focus':
        stateChanges.hover = true;
        onPreviewChange && onPreviewChange(day);
        break;
    }
    if (Object.keys(stateChanges).length) {
      this.setState(stateChanges);
    }
  }

  handleSelect() {
    if (this.props.disabled) return null;
    this.props.onSelect(this.props.day);
  }

  getClassNames() {
    const {
      isPassive,
      isToday,
      isSunday,
      isSpecialDay,
      isStartOfWeek,
      isEndOfWeek,
      isStartOfMonth,
      isEndOfMonth,
      disabled,
    } = this.props;

    return classnames(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayDisabled]: disabled,
      [styles.dayToday]: isToday,
      [styles.daySunday]: isSunday,
      [styles.daySpecialDay]: isSpecialDay,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: isEndOfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: isEndOfMonth,
      [styles.dayHovered]: this.state.hover,
      [styles.dayActive]: this.state.active,
    });
  }
  renderPreviewPlaceholder() {
    const { preview, day, previewColor, color } = this.props;
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
        style={{ color: previewColor || color }}
      />
    );
  }
  renderSelectionPlaceholders() {
    if (this.props.displayMode === 'date') {
      let isSelected = isSameDay(this.props.day, this.props.date);
      return isSelected ? (
        <span className={styles.selected} style={{ color: this.props.color }} />
      ) : null;
    }
    const { ranges, day } = this.props;

    const inRanges = ranges.reduce((result, range) => {
      const startDate = range.startDate ? endOfDay(range.startDate) : null;
      const endDate = range.endDate ? startOfDay(range.endDate) : null;
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
  }
  render() {
    return (
      <button
        onClick={this.handleMouseEvent}
        onMouseEnter={this.handleMouseEvent}
        onMouseLeave={this.handleMouseEvent}
        onFocus={this.handleMouseEvent}
        // onTouchStart={this.handleMouseEvent}
        // onTouchMove={this.handleMouseEvent}
        // onTouchEnd={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
        onBlur={this.handleMouseEvent}
        onCompositionStart={this.handleMouseEvent}
        onPauseCapture={this.handleMouseEvent}
        className={this.getClassNames(styles)}
        {...(this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {})}
        style={{ color: this.props.color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        <span className={styles.dayNumber}>
          <span>{format(this.props.day, 'D')}</span>
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
});

DayCell.propTypes = {
  day: PropTypes.object.isRequired,
  date: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }),
  onSelect: PropTypes.func,
  onPreviewChange: PropTypes.func,
  previewColor: PropTypes.string,
  disabled: PropTypes.bool,
  isPassive: PropTypes.bool,
  isSpecialDay: PropTypes.bool,
  isToday: PropTypes.bool,
  isSunday: PropTypes.bool,
  isStartOfWeek: PropTypes.bool,
  isEndOfWeek: PropTypes.bool,
  isStartOfMonth: PropTypes.bool,
  isEndOfMonth: PropTypes.bool,
  onMouseOver: PropTypes.func,
  color: PropTypes.string,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
};

export default DayCell;
