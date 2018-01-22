import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayCell, { rangeShape } from './DayCell.js';
import { calcFocusDate } from './utils';
import styles from './styles';
import classnames from 'classnames';
import { addMonths, startOfDay, endOfDay, addYears, setYear, setMonth } from 'date-fns';
import defaultLocale from 'date-fns/locale/en-US';

import {
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  startOfMonth,
  endOfMonth,
  isSunday,
  isWithinInterval,
  isBefore,
  isAfter,
} from 'date-fns';

class Calendar extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.changeShownDate = this.changeShownDate.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.state = {
      focusedDate: calcFocusDate(null, props),
    };
  }
  updateShownDate(props) {
    const newFocus = calcFocusDate(this.state.focusedDate, props || this.props);
    this.setState({
      focusedDate: newFocus,
    });
  }
  componentWillReceiveProps(nextProps) {
    const propMapper = {
      dateRange: 'ranges',
      date: 'date',
    };
    const targetProp = propMapper[nextProps.displayMode];
    if (nextProps[targetProp] !== this.props[targetProp]) {
      this.updateShownDate(nextProps);
    }
  }
  changeShownDate(mode, value) {
    const focusedDate = this.state.focusedDate;
    const modeMapper = {
      monthOffset: () => addMonths(focusedDate, value),
      setMonth: () => setMonth(focusedDate, value),
      setYear: () => setYear(focusedDate, value),
    };
    this.setState({
      focusedDate: modeMapper[mode](),
    });
  }
  handleRangeFocusChange(rangesIndex, rangeItemIndex) {
    this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
  }
  renderMonthAndYear(classes, focusedDate) {
    const { showMonthArrow, locale, minDate, maxDate } = this.props;
    const upLimit = maxDate ? maxDate.getFullYear() : addYears(new Date(), 20).getFullYear();
    const downLimit = minDate ? minDate.getFullYear() : addYears(new Date(), -100).getFullYear();

    return (
      <div className={classes.monthAndYearWrapper}>
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(classes.nextPrevButton, classes.prevButton)}
            onClick={() => this.changeShownDate('monthOffset', -1)}>
            <i />
          </button>
        ) : null}
        <span className={classes.monthAndYearPickers}>
          <span className={classes.monthPicker}>
            <select
              value={focusedDate.getMonth()}
              onChange={e => this.changeShownDate('setMonth', e.target.value)}>
              {locale.localize.months().map((month, i) => (
                <option key={i} value={i}>
                  {month}
                </option>
              ))}
            </select>
          </span>
          <span className={classes.monthAndYearDivider} />
          <span className={classes.yearPicker}>
            <select
              value={focusedDate.getFullYear()}
              onChange={e => this.changeShownDate('setYear', e.target.value)}>
              {new Array(upLimit - downLimit).fill(upLimit).map((val, i) => {
                const year = val - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </span>
        </span>
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(classes.nextPrevButton, classes.nextButton)}
            onClick={() => this.changeShownDate('monthOffset', +1)}>
            <i />
          </button>
        ) : null}
      </div>
    );
  }
  renderWeekdays(classes, dateOptions) {
    const now = new Date();
    return eachDayOfInterval({
      start: startOfWeek(now, dateOptions),
      end: endOfWeek(now, dateOptions),
    }).map((day, i) => (
      <span className={classes.weekDay} key={i}>
        {format(day, 'ddd', dateOptions)}
      </span>
    ));
  }

  renderDays(classes, dateOptions, focusedDate) {
    const now = new Date();
    const { specialDays } = this.props;
    const minDate = this.props.minDate && startOfDay(this.props.minDate);
    const maxDate = this.props.maxDate && endOfDay(this.props.maxDate);
    const startDateOfMonth = startOfMonth(focusedDate, dateOptions);
    const endDateOfMonth = endOfMonth(focusedDate, dateOptions);
    const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
    const endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);

    return eachDayOfInterval({ start: startDateOfCalendar, end: endDateOfCalendar }).map(
      (day, index) => {
        const isStartOfMonth = isSameDay(day, startDateOfMonth);
        const isEndOfMonth = isSameDay(day, endDateOfMonth);
        const isSpecialDay = specialDays.some(specialDay => isSameDay(day, specialDay));
        const isOutsideMinMax =
          (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));

        return (
          <DayCell
            {...this.props}
            day={day}
            preview={this.props.showSelectionPreview && this.props.preview}
            onSelect={this.props.onChange}
            isSunday={isSunday(day)}
            isSpecialDay={isSpecialDay}
            isToday={isSameDay(day, now)}
            isStartOfWeek={isSameDay(day, startOfWeek(day, dateOptions))}
            isEndOfWeek={isSameDay(day, endOfWeek(day, dateOptions))}
            isStartOfMonth={isStartOfMonth}
            isEndOfMonth={isEndOfMonth}
            key={index}
            disabled={isOutsideMinMax}
            isPassive={!isWithinInterval(day, { start: startDateOfMonth, end: endDateOfMonth })}
            classNames={classes}
          />
        );
      }
    );
  }

  formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, this.props.dateDisplayFormat);
  }
  render() {
    const dateOptions = { locale: this.props.locale };
    const { focusedRange, color } = this.props;
    return (
      <div className={classnames(styles.calendarWrapper, this.props.className)}>
        <div className={styles.dateDisplayWrapper}>
          {this.props.ranges.map((range, i) => (
            <div className={styles.dateDisplay} key={i} style={{ color: range.color || color }}>
              <span
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 0,
                })}
                onFocus={() => this.handleRangeFocusChange(i, 0)}>
                <input
                  disabled={range.disabled}
                  readOnly
                  value={this.formatDateDisplay(range.startDate, '-')}
                />
              </span>
              <span
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1,
                })}
                onFocus={() => this.handleRangeFocusChange(i, 1)}>
                <input
                  disabled={range.disabled}
                  readOnly
                  value={this.formatDateDisplay(range.endDate, 'Continuous')}
                />
              </span>
            </div>
          ))}
        </div>
        {this.renderMonthAndYear(styles, this.state.focusedDate)}
        <div
          className={styles.months}
          onMouseLeave={() => {
            this.props.onPreviewChange && this.props.onPreviewChange();
          }}>
          {new Array(this.props.months).fill(null).map((_, i) => (
            <div key={i} className={styles.month}>
              <div className={styles.weekDays}>{this.renderWeekdays(styles, dateOptions)}</div>
              <div className={styles.days}>
                {this.renderDays(styles, dateOptions, addMonths(this.state.focusedDate, i))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  showMonthArrow: true,
  classNames: {},
  specialDays: [],
  locale: defaultLocale,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM D,YYYY',
  showSelectionPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
};

Calendar.propTypes = {
  showMonthArrow: PropTypes.bool,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  date: PropTypes.object,
  onChange: PropTypes.func,
  onPreviewChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  specialDays: PropTypes.array,
  classNames: PropTypes.object,
  locale: PropTypes.object,
  shownDate: PropTypes.object,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }),
  previewColor: PropTypes.string,
  dateDisplayFormat: PropTypes.string,
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.number,
  className: PropTypes.string,
  showSelectionPreview: PropTypes.bool,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  color: PropTypes.string,
};

export default Calendar;
