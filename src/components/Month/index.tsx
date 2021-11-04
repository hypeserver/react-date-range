/* eslint-disable no-fallthrough */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayCell, { rangeShape, IDayCellProps } from '../DayCell';
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
import { getMonthDisplayRange, DisplayMode, IStyles, DateOptions, Range, Preview, Drag } from '../../utils';

function renderWeekdays(styles: IStyles, dateOptions: DateOptions, weekdayDisplayFormat: string) {
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



export interface IMonthProps extends IDayCellProps {
  displayMode: DisplayMode
  styles: IStyles
  minDate: Date
  maxDate: Date
  disabledDates: Date[]
  disabledDay: (date: Date) => boolean
  onDragSelectionStart: (date: Date) => void
  onDragSelectionEnd: (date: Date) => void
  onDragSelectionMove: (date: Date) => void
  onMouseLeave: React.MouseEventHandler
  focusedRange: number[]
  month: Date
  dateOptions: DateOptions
  monthDisplayFormat: string
  weekdayDisplayFormat: string
  fixedHeight: boolean
  showPreview: boolean
  showMonthName: boolean
  showWeekDays: boolean
  ranges: Range[]
  style: React.CSSProperties
  drag: Drag
  preview: Preview
}

class Month extends PureComponent<IMonthProps> {
  static defaultProps: Partial<IMonthProps>;
  static propTypes;

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
    if (displayMode === DisplayMode.DATE_RANGE && drag.status) {
      let { startDate, endDate } = drag.range;
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
                  preview={showPreview ? this.props.preview : null}
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
                  dragRange={drag.range}
                  drag={drag.status}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
}

Month.defaultProps = {};

Month.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  month: PropTypes.object,
  drag: PropTypes.object,
  dateOptions: PropTypes.object,
  disabledDates: PropTypes.array,
  disabledDay: PropTypes.func,
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }),
  showPreview: PropTypes.bool,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  onDragSelectionStart: PropTypes.func,
  onDragSelectionEnd: PropTypes.func,
  onDragSelectionMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  monthDisplayFormat: PropTypes.string,
  weekdayDisplayFormat: PropTypes.string,
  dayDisplayFormat: PropTypes.string,
  showWeekDays: PropTypes.bool,
  showMonthName: PropTypes.bool,
  fixedHeight: PropTypes.bool,
};

export default Month;
