// /* -eslint-disable no-fallthrough */
import React, { MouseEvent, PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayCell, { DateReceivingFunc, OptionalDateReceivingFunc, rangeShape } from '../DayCell';
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  isBefore,
  isSameDay,
  isAfter,
  isWeekend,
  isWithinInterval,
  eachDayOfInterval,
} from 'date-fns';
import { getMonthDisplayRange } from '../../utils';
import { CoreStyles } from '../../styles';
import { DateOptions, Preview, Range } from '../../types';

function renderWeekdays(styles: CoreStyles, dateOptions: DateOptions, weekdayDisplayFormat: string) {
  const now = new Date();
  return (
    <div className={styles.weekDays}>
      {eachDayOfInterval({
        start: startOfWeek(now, dateOptions),
        end: endOfWeek(now, dateOptions),
      }).map((day, i) => (
        <span className={styles.weekDay} key={i}>
          {format(day, weekdayDisplayFormat, dateOptions)}
        </span>
      ))}
    </div>
  );
}

export type Drag = {
  range: Range;
  status: boolean;
  disablePreview: boolean;
}

type ComponentProps = {
  style?: React.CSSProperties;
  styles: CoreStyles;
  month: Date;
  drag: Drag,
  dateOptions: DateOptions,
  disabledDates: Date[];
  disabledDay: (date: Date) => boolean;
  preview?: Preview | null;
  showPreview: boolean;
  displayMode: 'dateRange' | 'date';
  minDate: Date;
  maxDate: Date;
  ranges: Range[];
  focusedRange: number[];
  onDragSelectionStart: DateReceivingFunc;
  onDragSelectionEnd: DateReceivingFunc;
  onDragSelectionMove: DateReceivingFunc;
  onPreviewChange?: OptionalDateReceivingFunc;
  onMouseLeave: (e: MouseEvent<HTMLDivElement>) => void;
  monthDisplayFormat: string;
  weekdayDisplayFormat: string;
  dayDisplayFormat: string;
  showWeekDays: boolean,
  showMonthName: boolean;
  fixedHeight: boolean;
};

class Month extends PureComponent<ComponentProps> {
  render() {
    const now = new Date();
    const { displayMode, focusedRange, drag, styles, disabledDates, disabledDay } = this.props;
    const minDate = this.props.minDate && startOfDay(this.props.minDate);
    const maxDate = this.props.maxDate && endOfDay(this.props.maxDate);
    const monthDisplay = getMonthDisplayRange(
      this.props.month,
      this.props.dateOptions,
      this.props.fixedHeight
    );
    let ranges = this.props.ranges;
    if (displayMode === 'dateRange' && drag.status) {
      const { startDate, endDate } = drag.range;
      ranges = ranges.map((range, i) => {
        if (i !== focusedRange[0]) return range;
        return {
          ...range,
          startDate,
          endDate,
        };
      });
    }
    const showPreview = this.props.showPreview && !drag.disablePreview;
    return (
      <div className={styles.month} style={this.props.style}>
        {this.props.showMonthName ? (
          <div className={styles.monthName}>
            {format(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)}
          </div>
        ) : null}
        {this.props.showWeekDays &&
          renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat)}
        <div className={styles.days} onMouseLeave={this.props.onMouseLeave}>
          {eachDayOfInterval({ start: monthDisplay.start, end: monthDisplay.end }).map(
            (day, index) => {
              const isStartOfMonth = isSameDay(day, monthDisplay.startDateOfMonth);
              const isEndOfMonth = isSameDay(day, monthDisplay.endDateOfMonth);
              const isOutsideMinMax =
                (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));
              const isDisabledSpecifically = disabledDates.some(disabledDate =>
                isSameDay(disabledDate, day)
              );
              const isDisabledDay = disabledDay(day);
              return (
                <DayCell
                  {...this.props}
                  ranges={ranges}
                  day={day}
                  preview={this.props.preview && showPreview ? this.props.preview : null}
                  isWeekend={isWeekend(day)}
                  isToday={isSameDay(day, now)}
                  isStartOfWeek={isSameDay(day, startOfWeek(day, this.props.dateOptions))}
                  isEndOfWeek={isSameDay(day, endOfWeek(day, this.props.dateOptions))}
                  isStartOfMonth={isStartOfMonth}
                  isEndOfMonth={isEndOfMonth}
                  key={index}
                  disabled={isOutsideMinMax || isDisabledSpecifically || isDisabledDay}
                  isPassive={
                    !isWithinInterval(day, {
                      start: monthDisplay.startDateOfMonth,
                      end: monthDisplay.endDateOfMonth,
                    })
                  }
                  styles={styles}
                  onMouseDown={this.props.onDragSelectionStart}
                  onMouseUp={this.props.onDragSelectionEnd}
                  onMouseEnter={this.props.onDragSelectionMove}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default Month;
