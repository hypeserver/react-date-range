/* eslint-disable no-fallthrough */
import React, { MouseEventHandler, PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayCell, { rangeShape } from '../DayCell';
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
import { DisplayMode } from '../../utilsTypes';
import { DateRange } from '../../defaultRangesTypes';
import { Preview } from '../DayCell/types';
import { Drag } from './types';

function renderWeekdays(styles, dateOptions: object, weekdayDisplayFormat: string) {
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

interface MonthProps {
  displayMode: DisplayMode
  minDate: Date
  maxDate: Date
  month: Date
  ranges: DateRange[]
  monthDisplayFormat: string
  drag: Drag
  preview: Preview
  disabledDates: Date[]
  focusedRange: number[]
  weekdayDisplayFormat: string
  disabledDay: (day: Date) => boolean
  onDragSelectionStart: (day: Date) => void
  onDragSelectionEnd: (day: Date) => void
  onDragSelectionMove: (day: Date) => void
  onMouseLeave: MouseEventHandler
  showPreview: boolean
  showWeekDays: boolean
  fixedHeight: boolean
  showMonthName: boolean
  // FIXME
  dateOptions: Object
  style?: React.CSSProperties
}

class Month extends PureComponent<MonthProps> {
  public static propTypes = {};
  static defaultProps = {}

  render() {
    const now = new Date();
    const {
      displayMode, focusedRange, drag, styles, disabledDates, disabledDay,
      month, dateOptions, fixedHeight, monthDisplayFormat, showMonthName,
      showWeekDays, preview, style, weekdayDisplayFormat,
      onDragSelectionStart, onDragSelectionEnd, onDragSelectionMove,
      onMouseLeave
    } = this.props;
    let { minDate, maxDate, ranges, showPreview } = this.props;
    minDate = minDate && startOfDay(minDate);
    maxDate = maxDate && endOfDay(maxDate);
    const monthDisplay = getMonthDisplayRange(
      month,
      dateOptions,
      fixedHeight
    );
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
    showPreview = showPreview && !drag.disablePreview;
    return (
      <div className={styles.month} style={style}>
        {showMonthName ? (
          <div className={styles.monthName}>
            {format(month, monthDisplayFormat, dateOptions)}
          </div>
        ) : null}
        {showWeekDays && renderWeekdays(styles, dateOptions, weekdayDisplayFormat)}
        <div className={styles.days} onMouseLeave={onMouseLeave}>
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
                  preview={showPreview ? preview : null}
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
                  onMouseDown={onDragSelectionStart}
                  onMouseUp={onDragSelectionEnd}
                  onMouseEnter={onDragSelectionMove}
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
