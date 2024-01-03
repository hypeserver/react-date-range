import { endOfDay, format, isAfter, isBefore, isSameDay, startOfDay } from 'date-fns';
import React, { FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import { StylesType } from '../../styles';
import classnames from 'classnames';

export type RangeShape = {
  startDate: Date,
  endDate: Date,
  color?: string,
  key?: string,
  autoFocus?: boolean,
  disabled?: boolean,
  showDateDisplay?: boolean,
  label?: string
};

export type DayCellProps = {
  day: Date,
  dayDisplayFormat: string,
  date?: Date,
  ranges: RangeShape[]
  displayMode: "dateRange" | "date",
  preview?: {
    startDate?: Date,
    endDate?: Date,
    color?: string
  },
  onPreviewChange?: (date?: Date) => void,
  disabled?: boolean,
  isPassive?: boolean,
  isToday?: boolean,
  isWeekend?: boolean,
  isStartOfWeek?: boolean,
  isEndOfWeek?: boolean,
  isStartOfMonth?: boolean,
  isEndOfMonth?: boolean,
  onMouseDown?: (date: Date) => void,
  onMouseUp?: (date: Date) => void,
  onMouseEnter?: (date: Date) => void,
  color: string,
  styles: StylesType,
  dayContentRenderer?: (date: Date) => ReactElement
};

export default function DayCell({
  day,
  dayDisplayFormat,
  date,
  ranges,
  preview,
  onPreviewChange,
  disabled,
  isPassive,
  isToday,
  isWeekend,
  isStartOfWeek,
  isEndOfWeek,
  isStartOfMonth,
  isEndOfMonth,
  displayMode,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  color,
  styles,
  dayContentRenderer
}: DayCellProps) {

  const [state, setState] = React.useState({ hover: false, active: false });

  const handleKeyEvent = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["Space", " ", "Enter"].includes(event.key)) {
      if (event.type === 'keydown') {
        onMouseDown?.(day);
      } else {
        onMouseUp?.(day);
      }
    }
  }

  const handleMouseEvent = (event: MouseEvent<HTMLButtonElement> | FocusEvent<HTMLButtonElement>) => {
    const stateChanges = { ...state };

    if (disabled) {
      onPreviewChange?.();
      return;
    }

    switch (event.type) {
      case 'mouseenter':
        onMouseEnter?.(day);
        onPreviewChange?.(day);
        stateChanges.hover = true;
        break;
      case 'blur':
      case 'mouseleave':
        stateChanges.hover = false;
        break;
      case 'mousedown':
        stateChanges.active = true;
        onMouseDown?.(day);
        break;
      case 'mouseup':
        event.stopPropagation();
        stateChanges.active = false;
        onMouseUp?.(day);
        break;
      case 'focus':
        onPreviewChange?.(day);
        break;
    }

    if (stateChanges.hover != state.hover || stateChanges.active != state.active) {
      setState(stateChanges);
    }
  }

  const getClassNames = () => {
    return classnames(styles.day, {
      [styles.dayPassive]: isPassive,
      [styles.dayDisabled]: disabled,
      [styles.dayToday]: isToday,
      [styles.dayWeekend]: isWeekend,
      [styles.dayStartOfWeek]: isStartOfWeek,
      [styles.dayEndOfWeek]: isEndOfWeek,
      [styles.dayStartOfMonth]: isStartOfMonth,
      [styles.dayEndOfMonth]: isEndOfMonth,
      [styles.dayHovered]: state.hover,
      [styles.dayActive]: state.active,
    });
  }

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
      onFocus={handleMouseEvent}
      onMouseDown={handleMouseEvent}
      onMouseUp={handleMouseEvent}
      onBlur={handleMouseEvent}
      onPauseCapture={handleMouseEvent}
      onKeyDown={handleKeyEvent}
      onKeyUp={handleKeyEvent}
      className={getClassNames()}
      {...(disabled || isPassive ? { tabIndex: -1 } : {})}
      style={{ color }}
    >
      <SelectionPlaceholders styles={styles} ranges={ranges} day={day} date={date} displayMode={displayMode} color={color} />
      <PreviewPlaceholder styles={styles} day={day} preview={preview} />
      <span className={styles.dayNumber}>
        {
          dayContentRenderer?.(day) || <span>{format(day, dayDisplayFormat)}</span>
        }
      </span>
    </button>
  )
}

type SelectionPlaceholdersProps = {
  styles: StylesType,
  ranges: RangeShape[],
  day: Date,
  date: Date,
  displayMode: DayCellProps["displayMode"],
  color: string
};

function SelectionPlaceholders({
  styles,
  ranges,
  day,
  date,
  displayMode,
  color
}: SelectionPlaceholdersProps) {


  if (displayMode == 'date') {
    const isSelected = isSameDay(day, date);

    return (
      isSelected ? <span className={styles.selected} style={{ color }}></span> : null
    );
  }

  const inRanges = ranges.reduce((result: Array<RangeShape & { isStartEdge: boolean, isEndEdge: boolean, isInRange: boolean }>, range: RangeShape) => {
    let startDate: Date | null = range.startDate;
    let endDate: Date | null = range.endDate;
    if (startDate && endDate && isBefore(endDate, startDate)) {
      [startDate, endDate] = [endDate, startDate];
    }

    startDate = startDate ? endOfDay(startDate) : null;
    endDate = endDate ? startOfDay(endDate) : null;

    const isInRange =
      (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
    const isStartEdge = !isInRange && isSameDay(day, startDate as Date);
    const isEndEdge = !isInRange && isSameDay(day, endDate as Date);
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
      style={{ color: range.color || color }}
    />
  ));

}

type PreviewPlaceholderProps = {
  preview?: DayCellProps["preview"],
  day: Date,
  styles: StylesType
};

function PreviewPlaceholder({
  preview,
  day,
  styles
}: PreviewPlaceholderProps) {
  if (!preview) return null;
  const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
  const endDate = preview.endDate ? startOfDay(preview.endDate) : null;
  const isInRange =
    (!startDate || isAfter(day, startDate)) && (!endDate || isBefore(day, endDate));
  const isStartEdge = !isInRange && isSameDay(day, startDate as Date);
  const isEndEdge = !isInRange && isSameDay(day, endDate as Date);
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
}