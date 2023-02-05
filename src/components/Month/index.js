/* eslint-disable no-fallthrough */
import React, { PureComponent } from 'react';
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
  eachDayOfInterval, closestTo, addDays,
} from 'date-fns';
import { getMonthDisplayRange } from '../../utils';
import {Trans} from "@lingui/react";

function renderWeekdays(styles, dateOptions, weekdayDisplayFormat) {
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

class Month extends PureComponent {
   minDate = (date1, date2) => {
    if(isBefore(date1, date2) || isSameDay(date1,date2)) return date1
    return date2
  }
  maxDate = (date1, date2) => {
    if(isBefore(date2, date1) || isSameDay(date2,date1)) return date1
    return date2
  }
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
              const maxRangeDate = this.maxDate(ranges?.[0]?.startDate, ranges?.[0]?.endDate)
              const hasPastUnavailabilities = (ranges.length > 0 && isAfter(day, closestTo(maxRangeDate, disabledDates.filter(d => !isBefore(d, maxRangeDate)))))
              const isPastDay = (drag.status && isBefore(day, drag.range.startDate))
              const isOnlyPickup = isAfter(addDays(day, 1), closestTo(maxRangeDate, [...(this.props?.pickUpOnlyDates || []), ...(this.props?.oneDayAvailableDates || [])]?.map((d) => new Date(d))?.filter(d => !isBefore(d, maxRangeDate) && !isSameDay(d, maxRangeDate))))
              const isAfterOnlyDropOff = !(!ranges?.[0]?.startDate || isBefore(day, ranges?.[0]?.startDate)) && isAfter(day, closestTo(maxRangeDate, [...(this.props?.dropOffOnlyDates || []), ...(this.props?.oneDayAvailableDates|| [])]?.map((d) => new Date(d))?.filter(d => !isBefore(d, maxRangeDate))))
              const isOnlyDropOff = (!ranges?.[0]?.startDate || isBefore(day, ranges?.[0]?.startDate)) && this.props?.dropOffOnlyDates?.some((d) => isSameDay(new Date(d), day))
              const isOneDayAvailable = this.props?.oneDayAvailableDates?.some((d) => isSameDay(new Date(d), ranges?.[0]?.startDate)) && isAfter(day, ranges?.[0]?.startDate)
              return (
                <DayCell
                  {...this.props}
                  ranges={ranges}
                  day={day}
                  preview={showPreview ? this.props.preview : null}
                  isWeekend={isWeekend(day, this.props.dateOptions)}
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
                    || isPastDay
                    || hasPastUnavailabilities
                    || isOnlyPickup
                    || isOneDayAvailable
                    || isAfterOnlyDropOff
                  }
                  tooltipContent={isOnlyDropOff && <Trans message={'Available for return only'} id={'calendar.tooltip.dropOffOnly'}/>}
                  isTooltip={isOnlyDropOff}
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
