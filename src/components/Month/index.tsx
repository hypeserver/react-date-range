import React, { CSSProperties, MouseEvent, memo } from 'react';
import { getMonthDisplayRange } from '../../utils';
import { StylesType } from '../../styles';
import DayCell, { DayCellProps, DateRange } from '../DayCell';
import { FormatOptions, eachDayOfInterval, endOfDay, endOfWeek, format, getMonth, isAfter, isBefore, isSameDay, isWeekend, isWithinInterval, startOfDay, startOfWeek } from 'date-fns';

type MonthProps = {
  style: CSSProperties,
  styles: StylesType,
  month: Date,
  drag: {
    range: DateRange,
    disablePreview: boolean,
    status: boolean
  },
  dateOptions: FormatOptions,
  disabledDates?: Date[],
  disabledDay?: (date: Date) => boolean,
  preview?: {
    startDate: Date,
    endDate: Date
  },
  showPreview?: boolean,
  displayMode: "dateRange" | "date",
  minDate?: Date,
  maxDate?: Date,
  ranges?: DayCellProps["ranges"],
  focusedRange?: number[],
  color?: string,
  onPreviewChange?: (date?: Date) => void,
  onDragSelectionStart?: (date: Date) => void,
  onDragSelectionEnd?: (date: Date) => void,
  onDragSelectionMove?: (date: Date) => void,
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void,
  monthDisplayFormat: string,
  weekdayDisplayFormat: string,
  dayDisplayFormat: string,
  showWeekDays?: boolean,
  showMonthName?: boolean,
  fixedHeight?: boolean,
  dayContentRenderer?: (date: Date) => React.ReactElement
};

export default memo(function Month({
  style,
  styles,
  month,
  drag,
  dateOptions,
  disabledDates,
  disabledDay,
  preview,
  showPreview,
  displayMode,
  minDate,
  maxDate,
  ranges,
  color,
  focusedRange,
  onDragSelectionStart,
  onDragSelectionEnd,
  onDragSelectionMove,
  onMouseLeave,
  onPreviewChange,
  monthDisplayFormat,
  weekdayDisplayFormat,
  dayDisplayFormat,
  showWeekDays,
  showMonthName,
  fixedHeight,
  dayContentRenderer
}: MonthProps) {

  const now = new Date();

  const minDateInternal = minDate && startOfDay(minDate);
  const maxDateInternal = maxDate && endOfDay(maxDate);

  const monthDisplay = getMonthDisplayRange(month, dateOptions, fixedHeight);

  let rangesInternal = ranges;

  if (displayMode == 'dateRange' && drag.status) {
    const { startDate, endDate } = drag.range;

    rangesInternal = rangesInternal.map((range, i) => {
      if (i !== focusedRange[0]) return range;
      return {
        ...range,
        startDate,
        endDate,
      };
    });
  }

  const showPreviewInternal = showPreview && !drag.disablePreview;

  return (
    <div className={styles.month} style={style}>
      {
        showMonthName ? <div className={styles.monthName}>{format(month, monthDisplayFormat, dateOptions)}</div> : null
      }
      {
        showWeekDays ? <Weekdays styles={styles} dateOptions={dateOptions} weekdayDisplayFormat={weekdayDisplayFormat} /> : null
      }
      <div className={styles.days} onMouseLeave={onMouseLeave}>
        {
          eachDayOfInterval({ start: monthDisplay.start, end: monthDisplay.end }).map((day: Date, index: number) => {
            const isStartOfMonth = isSameDay(day, monthDisplay.startDateOfMonth);
            const isEndOfMonth = isSameDay(day, monthDisplay.endDateOfMonth);
            const isOutsideMinMax = (minDateInternal && isBefore(day, minDateInternal)) || (maxDateInternal && isAfter(day, maxDateInternal));
            const isDisabledSpecifically = disabledDates.some(disabledDate =>
              isSameDay(disabledDate, day)
            );

            const isDisabledDay = disabledDay(day);

            return (
              <DayCell
                dayContentRenderer={dayContentRenderer}
                key={index}
                onPreviewChange={onPreviewChange}
                displayMode={displayMode}
                color={color}
                dayDisplayFormat={dayDisplayFormat}
                ranges={rangesInternal}
                day={day}
                preview={showPreviewInternal ? preview : null}
                isWeekend={isWeekend(day)}
                isToday={isSameDay(day, now)}
                isStartOfWeek={isSameDay(day, startOfWeek(day, dateOptions))}
                isEndOfWeek={isSameDay(day, endOfWeek(day, dateOptions))}
                isStartOfMonth={isStartOfMonth}
                isEndOfMonth={isEndOfMonth}
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
            )
          })
        }
      </div>
    </div>
  )

});

type WeekdaysProps = {
  styles: StylesType,
  dateOptions: FormatOptions,
  weekdayDisplayFormat: string
};

function Weekdays({
  styles,
  dateOptions,
  weekdayDisplayFormat
}: WeekdaysProps) {

  const now = new Date();

  return (
    <div className={styles.weekDays}>
      {
        eachDayOfInterval({
          start: startOfWeek(now, dateOptions),
          end: endOfWeek(now, dateOptions)
        }).map((day: Date, i: number) => {
          return (
            <span className={styles.weekDay} key={i}>{format(day, weekdayDisplayFormat, dateOptions)}</span>
          )
        })
      }
    </div>
  )
}