/* eslint-disable no-fallthrough */
import React, { Component, FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import classnames from 'classnames';
import { startOfDay, format, isSameDay, isAfter, isBefore, endOfDay } from 'date-fns';
import { Preview, MaybeEmptyRange } from '../../types';
import { CoreStyles } from '../../styles';

export type InRange = ({
  isStartEdge: boolean;
  isEndEdge: boolean;
  isInRange: boolean;
} & MaybeEmptyRange);

export type DateReceivingFunc = (date: Date) => void;
export type OptionalDateReceivingFunc = (date?: Date) => void;

type ComponentProps = {
  color?: string;
  date?: Date;
  day: Date;
  dayContentRenderer?: DateReceivingFunc;
  dayDisplayFormat: string;
  disabled: boolean;
  displayMode?: 'dateRange' | 'date';
  isEndOfMonth: boolean;
  isEndOfWeek: boolean;
  isPassive: boolean;
  isStartOfMonth: boolean;
  isStartOfWeek: boolean;
  isToday: boolean;
  isWeekend: boolean;
  onMouseDown: DateReceivingFunc;
  onMouseEnter: DateReceivingFunc;
  onMouseUp: DateReceivingFunc;
  onPreviewChange?: OptionalDateReceivingFunc;
  preview?: Preview | null;
  previewColor?: string;
  ranges: MaybeEmptyRange[],
  styles: CoreStyles;
};

type ComponentState = {
  hover: boolean;
  active: boolean;
}


class DayCell extends Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    this.state = {
      hover: false,
      active: false,
    };
  }

  handleKeyEvent = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { day, onMouseDown, onMouseUp } = this.props;
    if ([13 /* space */, 32 /* enter */].includes(event.keyCode)) {
      if (event.type === 'keydown') onMouseDown(day);
      else onMouseUp(day);
    }
  }

  handleMouseEvent = (event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) => {
    const { day, disabled, onPreviewChange, onMouseEnter, onMouseDown, onMouseUp } = this.props;
    if (disabled) {
      onPreviewChange && onPreviewChange();
      return;
    }

    switch (event.type) {
      case 'mouseenter':
        onMouseEnter(day);
        onPreviewChange && onPreviewChange(day);
        this.setState({ hover: true });
        break;
      case 'blur':
      case 'mouseleave':
        this.setState({ hover: false });
        break;
      case 'mousedown':
        this.setState({ active: true });
        onMouseDown(day);
        break;
      case 'mouseup':
        event.stopPropagation();
        this.setState({ active: false });
        onMouseUp(day);
        break;
      case 'focus':
        onPreviewChange && onPreviewChange(day);
        break;
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
    const isStartEdge = !isInRange && !!startDate && isSameDay(day, startDate);
    const isEndEdge = !isInRange && !!endDate && isSameDay(day, endDate);
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
      const isSelected = this.props.date && isSameDay(this.props.day, this.props.date);
      return isSelected ? (
        <span className={styles.selected} style={{ color: this.props.color }} />
      ) : null;
    }

    const inRanges = ranges.reduce((result: InRange[], range: MaybeEmptyRange) => {
      const st = range.startDate;
      const en = range.endDate;
      const [start, end] = (st && en && isBefore(en, st)) ? [en, st] : [st, en];
      const startDate = start ? endOfDay(start) : null;
      const endDate = end ? startOfDay(end) : null;
      const isInRange =
        (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
      const isStartEdge = !isInRange && !!startDate && isSameDay(day, startDate);
      const isEndEdge = !isInRange && !!endDate && isSameDay(day, endDate);
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
        className={this.getClassNames()}
        {...(this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {})}
        style={{ color: this.props.color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}
        <span className={this.props.styles.dayNumber}>
          {
            dayContentRenderer?.(this.props.day) ||
            <span>{format(this.props.day, this.props.dayDisplayFormat)}</span>
          }
        </span>
      </button>
    );
  }
}

export default DayCell;
