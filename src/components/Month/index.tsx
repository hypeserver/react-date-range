import React, { MouseEvent, PureComponent } from 'react';
import DayCell, { DateReceivingFunc, OptionalDateReceivingFunc } from '../DayCell';
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
import { getMonthDisplayRange, renderWeekdays } from '../../utils';
import { CoreStyles } from '../../styles';
import { DateOptions, Preview, MaybeEmptyRange } from '../../types';

export type Drag = {
  range: MaybeEmptyRange;
  status: boolean;
  disablePreview: boolean;
}

type ComponentProps = {
  dateOptions: DateOptions,
  dayDisplayFormat: string;
  disabledDates: Date[];
  disabledDay: (date: Date) => boolean;
  displayMode?: 'dateRange' | 'date';
  drag: Drag,
  fixedHeight: boolean;
  focusedRange: number[];
  maxDate: Date;
  minDate: Date;
  month: Date;
  monthDisplayFormat: string;
  onDragSelectionEnd: DateReceivingFunc;
  onDragSelectionMove: DateReceivingFunc;
  onDragSelectionStart: DateReceivingFunc;
  onMouseLeave: (e: MouseEvent<HTMLDivElement>) => void;
  onPreviewChange?: OptionalDateReceivingFunc;
  preview?: Preview | null;
  ranges: MaybeEmptyRange[];
  showMonthName: boolean;
  showPreview: boolean;
  showWeekDays: boolean,
  style?: React.CSSProperties;
  styles: CoreStyles;
  weekdayDisplayFormat: string;
};

class Month extends PureComponent<ComponentProps> {
  render() {
    const now = new Date();
    const { dateOptions, displayMode, month, fixedHeight, focusedRange, drag, styles, disabledDates, disabledDay } = this.props;
    const minDate = this.props.minDate && startOfDay(this.props.minDate);
    const maxDate = this.props.maxDate && endOfDay(this.props.maxDate);
    const monthDisplay = getMonthDisplayRange(month, dateOptions, fixedHeight);
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
            {format(month, this.props.monthDisplayFormat, dateOptions)}
          </div>
        ) : null}
        {this.props.showWeekDays &&
          renderWeekdays(styles, dateOptions, this.props.weekdayDisplayFormat)}
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
                  isStartOfWeek={isSameDay(day, startOfWeek(day, dateOptions))}
                  isEndOfWeek={isSameDay(day, endOfWeek(day, dateOptions))}
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
