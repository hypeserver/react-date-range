/* eslint-disable no-fallthrough */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayCell, { rangeShape } from '../DayCell';
import * as dateFns from 'date-fns';
import { getMonthDisplayRange } from '../../utils';

function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
  const now = new Date();
  return (
    <div className={styles.weekDays}>
      {dateFns
        .eachDayOfInterval({
          start: dateFns.startOfWeek(now, dateOptions),
          end: dateFns.endOfWeek(now, dateOptions),
        })
        .map((day, i) => (
          <span className={styles.weekDay} key={i}>
            {dateFns.format(day, weekdayDisplayFormat, dateOptions)}
          </span>
        ))}
    </div>
  );
}

class Month extends PureComponent {
  render() {
    const now = new Date();
    const { displayMode, focusedRange, drag, styles, disabledDates, disabledDay } = this.props;
    const minDate = this.props.minDate && dateFns.startOfDay(this.props.minDate);
    const maxDate = this.props.maxDate && dateFns.endOfDay(this.props.maxDate);
    const monthDisplay = getMonthDisplayRange(
      this.props.month,
      this.props.dateOptions,
      this.props.fixedHeight
    );
    let ranges = this.props.ranges;
    if (displayMode === 'dateRange' && drag.status) {
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
            {dateFns.format(
              this.props.month,
              this.props.monthDisplayFormat,
              this.props.dateOptions
            )}
          </div>
        ) : null}
        {this.props.showWeekDays &&
          renderWeekdays(styles, this.props.dateOptions, this.props.weekdayDisplayFormat)}
        <div className={styles.days} onMouseLeave={this.props.onMouseLeave}>
          {dateFns
            .eachDayOfInterval({ start: monthDisplay.start, end: monthDisplay.end })
            .map((day, index) => {
              const isStartOfMonth = dateFns.isSameDay(day, monthDisplay.startDateOfMonth);
              const isEndOfMonth = dateFns.isSameDay(day, monthDisplay.endDateOfMonth);
              const isOutsideMinMax =
                (minDate && dateFns.isBefore(day, minDate)) ||
                (maxDate && dateFns.isAfter(day, maxDate));
              const isDisabledSpecifically = disabledDates.some(disabledDate =>
                dateFns.isSameDay(disabledDate, day)
              );
              const isDisabledDay = disabledDay(day);
              return (
                <DayCell
                  {...this.props}
                  ranges={ranges}
                  day={day}
                  preview={showPreview ? this.props.preview : null}
                  isWeekend={dateFns.isWeekend(day, this.props.dateOptions)}
                  isToday={dateFns.isSameDay(day, now)}
                  isStartOfWeek={dateFns.isSameDay(
                    day,
                    dateFns.startOfWeek(day, this.props.dateOptions)
                  )}
                  isEndOfWeek={dateFns.isSameDay(
                    day,
                    dateFns.endOfWeek(day, this.props.dateOptions)
                  )}
                  isStartOfMonth={isStartOfMonth}
                  isEndOfMonth={isEndOfMonth}
                  key={index}
                  disabled={isOutsideMinMax || isDisabledSpecifically || isDisabledDay}
                  isPassive={
                    !dateFns.isWithinInterval(day, {
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
            })}
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
