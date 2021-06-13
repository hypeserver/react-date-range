/* eslint-disable no-fallthrough */
import React, { Component, EventHandler, FocusEvent, KeyboardEventHandler, MouseEvent, MouseEventHandler, ReactEventHandler } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';
import { DisplayMode } from '../../utilsTypes';
import { DateRange } from '../../defaultRangesTypes';
import { ExtendedDateRange, Preview, Styles } from './types';


interface DayCellProps {
  day: Date
  date: Date
  dayDisplayFormat: string
  isPassive: Boolean
  color: string
  disabled: Boolean
  displayMode: DisplayMode
  dayContentRenderer: (day: Date) => Element
  onMouseDown: (date: Date) => void
  onMouseUp: (date: Date) => void
  onMouseEnter: (date: Date) => void
  onPreviewChange: (date: Date) => void
  ranges: DateRange[]
  preview: Preview | null
  styles: Styles
  isToday: Boolean
  isWeekend: Boolean
  isStartOfWeek: Boolean
  isEndOfWeek: Boolean
  isStartOfMonth: Boolean
  isEndOfMonth: Boolean
}

interface DayCellState {
  hover: Boolean
  active: Boolean
}

class DayCell extends Component<DayCellProps, DayCellState> {
  public static propTypes = {};
  static defaultProps = {}
  // FIXME: context is deprecated?
  constructor(props: DayCellProps, context) {
    super(props, context);

    this.state = {
      hover: false,
      active: false,
    };
  }

  handleKeyEvent: KeyboardEventHandler = event => {
    const { day, onMouseDown, onMouseUp } = this.props;
    if ([13 /* space */, 32 /* enter */].includes(event.keyCode)) {
      if (event.type === 'keydown') onMouseDown(day);
      else onMouseUp(day);
    }
  };
  handleMouseEvent: ReactEventHandler = event => {
    const { day, disabled, onPreviewChange, onMouseEnter, onMouseDown, onMouseUp } = this.props;
    // FIXME
    const stateChanges: any = {};
    if (disabled) {
      onPreviewChange(day);
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
  getClassNames = (): string => {
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
    const isStartEdge = !isInRange && startDate && isSameDay(day, startDate);
    const isEndEdge = !isInRange && endDate && isSameDay(day, endDate);
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
    const { styles, ranges, day, displayMode, date, color } = this.props;
    if (displayMode === DisplayMode.DATE) {
      let isSelected = isSameDay(day, date);
      return isSelected ? (
        <span className={styles.selected} style={{ color: color }} />
      ) : null;
    }

    const inRanges: ExtendedDateRange[] = []
    ranges.forEach((range) => {
      let startDate: Date | null = range.startDate;
      let endDate: Date | null = range.endDate;
      if (startDate && endDate && isBefore(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      startDate = startDate ? endOfDay(startDate) : null;
      endDate = endDate ? startOfDay(endDate) : null;
      const isInRange =
        (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
      const isStartEdge = !isInRange && !!startDate && isSameDay(day, startDate);
      const isEndEdge = !isInRange && !!endDate && isSameDay(day, endDate);
      if (isInRange || isStartEdge || isEndEdge) {
        inRanges.push({
          isStartEdge,
          isEndEdge,
          isInRange,
          ...range,
        })
      }
    });

    return inRanges.map((range, i) => (
      <span
        key={i}
        className={classnames({
          [styles.startEdge]: range.isStartEdge,
          [styles.endEdge]: range.isEndEdge,
          [styles.inRange]: range.isInRange,
        })}
        style={{ color: range.color || color }}
      />
    ));
  };

  render() {
    const {
      dayContentRenderer, day, dayDisplayFormat, styles,
      color, disabled, isPassive
    } = this.props;
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
        className={this.getClassNames()}
        {...(disabled || isPassive ? { tabIndex: -1 } : {})}
        style={{ color: color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        <span className={styles.dayNumber}>
          {
            dayContentRenderer?.(day) ||
            <span>{format(day, dayDisplayFormat)}</span>
          }
        </span>
      </button>
    );
  }
}


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
