import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { rangeShape } from '../DayCell';
import Month, { MonthProps } from '../Month';
import DateInput from '../DateInput';
import { calcFocusDate, generateStyles, getMonthDisplayRange } from '../../utils';
import classnames from 'classnames';
import ReactList from 'react-list';
import { shallowEqualObjects } from 'shallow-equal';
import {
  addMonths,
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  addYears,
  setYear,
  setMonth,
  differenceInCalendarMonths,
  startOfMonth,
  endOfMonth,
  addDays,
  isSameMonth,
  differenceInDays,
  min,
  max,
} from 'date-fns';
import defaultLocale from 'date-fns/locale/en-US';
import coreStyles from '../../styles';
import { ariaLabelsShape } from '../../accessibility';
import { ExtendedDateRange, Preview, Styles } from '../DayCell/types';
import { AriaLabelsShape, CalendarDirection, ChangeDateMode, Scroll } from './types';
import { DateOptions, DateRange, DisplayMode } from '../../utilsTypes';

const DEFAULT_PROPS: CalendarProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  disabledDay: (_: Date) => false,
  classNames: {},
  locale: defaultLocale,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM d, yyyy',
  monthDisplayFormat: 'MMM yyyy',
  weekdayDisplayFormat: 'E',
  dayDisplayFormat: 'd',
  showDateDisplay: true,
  showPreview: true,
  displayMode: DisplayMode.DATE,
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false,
  },
  direction: CalendarDirection.VERTICAL,
  maxDate: addYears(new Date(), 20),
  minDate: addYears(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  startDatePlaceholder: 'Early',
  endDatePlaceholder: 'Continuous',
  editableDateInputs: false,
  dragSelectionEnabled: true,
  fixedHeight: false,
};

export interface CalendarProps extends MonthProps {
  locale: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  months: number
  direction: CalendarDirection
  scroll: Scroll
  focusedDate: Date
  shownDate: Date
  onChange: (date: Date) => void
  onShownDateChange: (date: Date) => void
  disabledDay: (date: Date) => boolean
  onRangeFocusChange?: (newRange: number[]) => void
  updateRange?: (newRange: DateRange) => void
  ariaLabels?: AriaLabelsShape
  dateDisplayFormat: string
  rangeColors: string[]
  editableDateInputs: boolean
  showMonthAndYearPickers: boolean
  dragSelectionEnabled: boolean
  showMonthArrow: boolean
  showDateDisplay: boolean
  startDatePlaceholder: string
  endDatePlaceholder: string
  // FIXME
  classNames: any
}

interface CalendarState {
  monthNames: string[]
  focusedDate: Date
  preview?: Preview | null
  // FIXME
  drag: any
  scrollArea: any
}

class Calendar extends PureComponent<CalendarProps, CalendarState> {
  static propTypes = {}
  dateOptions: DateOptions
  styles: Styles
  listSizeCache: object
  isFirstRender: boolean
  list: ReactList | null = null
  defaultProps: CalendarProps = DEFAULT_PROPS

  // FIXME
  constructor(props: CalendarProps, context: any) {
    super(props, context);
    this.dateOptions = { locale: props.locale };
    if (props.weekStartsOn !== undefined) this.dateOptions.weekStartsOn = props.weekStartsOn;
    this.styles = generateStyles([coreStyles, props.classNames]);
    this.listSizeCache = {};
    this.isFirstRender = true;
    this.state = {
      monthNames: this.getMonthNames(),
      focusedDate: calcFocusDate(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false,
      },
      scrollArea: this.calcScrollArea(props),
    };
  }
  getMonthNames(): string[] {
    return [...Array(12).keys()].map(i => this.props.locale.localize?.month(i));
  }

  calcScrollArea(props: CalendarProps) {
    const { direction, months, scroll } = props;
    if (!scroll.enabled) return { enabled: false };

    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
    if (direction === CalendarDirection.VERTICAL) {
      return {
        enabled: true,
        monthHeight: scroll.monthHeight || 220,
        longMonthHeight: longMonthHeight || 260,
        calendarWidth: 'auto',
        calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months,
      };
    }
    return {
      enabled: true,
      monthWidth: scroll.monthWidth || 332,
      calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
      monthHeight: longMonthHeight || 300,
      calendarHeight: longMonthHeight || 300,
    };
  }

  focusToDate = (date: Date, props = this.props, preventUnnecessary = true) => {
    if (!props.scroll.enabled) {
      this.setState({ focusedDate: date });
      return;
    }
    const targetMonthIndex = differenceInCalendarMonths(date, props.minDate);
    const visibleMonths = this.list?.getVisibleRange() || [];
    if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
    this.isFirstRender = true;
    this.list?.scrollTo(targetMonthIndex);
    this.setState({ focusedDate: date });
  };

  updateShownDate = (props = this.props) => {
    let newProps: CalendarProps = props
    if(props.scroll.enabled && this.list) {
      newProps = {
        ...props,
        months: this.list.getVisibleRange().length,
      }
    }
    const newFocus = calcFocusDate(this.state.focusedDate, newProps);
    this.focusToDate(newFocus, newProps);
  };

  updatePreview = (val: Date ) => {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const preview: Preview = {
      startDate: val,
      endDate: val,
      color: this.props.color,
    };
    this.setState({ preview });
  };

  componentDidMount() {
    if (this.props.scroll.enabled) {
      // prevent react-list's initial render focus problem
      setTimeout(() => this.focusToDate(this.state.focusedDate));
    }
  }

  componentDidUpdate(prevProps: CalendarProps) {
    const { displayMode } = this.props;
    if (
      displayMode == DisplayMode.DATE_RANGE &&
      this.props.ranges !== prevProps.ranges
    ) {
      this.updateShownDate(this.props);
    } else if (
      displayMode == DisplayMode.DATE &&
      this.props.date !== prevProps.date
    ) {
      this.updateShownDate(this.props);
    }

    if (
      prevProps.locale !== this.props.locale ||
      prevProps.weekStartsOn !== this.props.weekStartsOn
    ) {
      this.dateOptions = { locale: this.props.locale };
      if (this.props.weekStartsOn !== undefined)
        this.dateOptions.weekStartsOn = this.props.weekStartsOn;
      this.setState({
        monthNames: this.getMonthNames(),
      });
    }

    if (!shallowEqualObjects(prevProps.scroll, this.props.scroll)) {
      this.setState({ scrollArea: this.calcScrollArea(this.props) });
    }
  }

  changeShownDate = (value: number, mode: ChangeDateMode) => {
    const { focusedDate } = this.state;
    const { onShownDateChange, minDate, maxDate } = this.props;
    let val: number | Date = value;
    switch (mode) {
      case ChangeDateMode.MONTH_OFFSET:
        val = addMonths(focusedDate, value);
        break;
      case ChangeDateMode.SET_MONTH:
        val = setMonth(focusedDate, value);
        break;
      case ChangeDateMode.SET_YEAR:
        val = setYear(focusedDate, value);
        break;
    }
    const newDate = min([max([val, minDate]), maxDate]);
    this.focusToDate(newDate, this.props, false);
    onShownDateChange && onShownDateChange(newDate);
  };

  handleRangeFocusChange = (rangesIndex: number, rangeItemIndex: number) => {
    this.props.onRangeFocusChange?.([rangesIndex, rangeItemIndex]);
  };

  handleScroll = () => {
    const { onShownDateChange, minDate } = this.props;
    const { focusedDate } = this.state;
    const { isFirstRender } = this;

    const visibleMonths = this.list?.getVisibleRange() || [];
    // prevent scroll jump with wrong visible value
    if (visibleMonths[0] === undefined) return;
    const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !isSameMonth(visibleMonth, focusedDate);
    if (isFocusedToDifferent && !isFirstRender) {
      this.setState({ focusedDate: visibleMonth });
      onShownDateChange && onShownDateChange(visibleMonth);
    }
    this.isFirstRender = false;
  };
  renderMonthAndYear = (focusedDate: Date, changeShownDate: (value: number, mode: ChangeDateMode) => void, props: CalendarProps) => {
    const { showMonthArrow, minDate, maxDate, showMonthAndYearPickers, ariaLabels } = props;
    const upperYearLimit = (maxDate || this.defaultProps.maxDate).getFullYear();
    const lowerYearLimit = (minDate || this.defaultProps.minDate).getFullYear();
    const styles = this.styles;
    return (
      <div onMouseUp={e => e.stopPropagation()} className={styles.monthAndYearWrapper}>
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.prevButton)}
            onClick={() => changeShownDate(-1, ChangeDateMode.MONTH_OFFSET)}
            aria-label={ariaLabels?.prevButton}>
            <i />
          </button>
        ) : null}
        {showMonthAndYearPickers ? (
          <span className={styles.monthAndYearPickers}>
            <span className={styles.monthPicker}>
              <select
                value={focusedDate.getMonth()}
                onChange={e => changeShownDate(Number(e.target.value), ChangeDateMode.SET_MONTH)}
                aria-label={ariaLabels?.monthPicker}>
                {this.state.monthNames.map((monthName, i) => (
                  <option key={i} value={i}>
                    {monthName}
                  </option>
                ))}
              </select>
            </span>
            <span className={styles.monthAndYearDivider} />
            <span className={styles.yearPicker}>
              <select
                value={focusedDate.getFullYear()}
                onChange={e => changeShownDate(Number(e.target.value), ChangeDateMode.SET_YEAR)}
                aria-label={ariaLabels?.yearPicker}>
                {new Array(upperYearLimit - lowerYearLimit + 1)
                  .fill(upperYearLimit)
                  .map((val, i) => {
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
        ) : (
          <span className={styles.monthAndYearPickers}>
            {this.state.monthNames[focusedDate.getMonth()]} {focusedDate.getFullYear()}
          </span>
        )}
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.nextButton)}
            onClick={() => changeShownDate(+1, ChangeDateMode.MONTH_OFFSET)}
            aria-label={ariaLabels?.nextButton}>
            <i />
          </button>
        ) : null}
      </div>
    );
  };
  renderWeekdays() {
    const now = new Date();
    return (
      <div className={this.styles.weekDays}>
        {eachDayOfInterval({
          start: startOfWeek(now, this.dateOptions),
          end: endOfWeek(now, this.dateOptions),
        }).map((day, i) => (
          <span className={this.styles.weekDay} key={i}>
            {format(day, this.props.weekdayDisplayFormat, this.dateOptions)}
          </span>
        ))}
      </div>
    );
  }
  renderDateDisplay = () => {
    const {
      focusedRange,
      color,
      ranges,
      rangeColors,
      dateDisplayFormat,
      editableDateInputs,
      startDatePlaceholder,
      endDatePlaceholder,
      ariaLabels,
    } = this.props;

    const defaultColor = rangeColors[focusedRange[0]] || color;
    const styles = this.styles;

    return (
      <div className={styles.dateDisplayWrapper}>
        {ranges.map((range, i) => {
          if (range.showDateDisplay === false || (range.disabled && !range.showDateDisplay))
            return null;
          return (
            <div
              className={styles.dateDisplay}
              key={i}
              style={{ color: range.color || defaultColor }}>
              <DateInput
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 0,
                })}
                readOnly={!editableDateInputs}
                disabled={range.disabled}
                value={range.startDate}
                placeholder={startDatePlaceholder}
                dateOptions={this.dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                ariaLabel={
                  ariaLabels?.dateInput[range.key].startDate
                }
                onChange={this.onDragSelectionEnd}
                onFocus={() => this.handleRangeFocusChange(i, 0)}
              />
              <DateInput
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1,
                })}
                readOnly={!editableDateInputs}
                disabled={range.disabled}
                value={range.endDate}
                placeholder={endDatePlaceholder}
                dateOptions={this.dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                ariaLabel={
                  ariaLabels?.dateInput[range.key].endDate
                }
                onChange={this.onDragSelectionEnd}
                onFocus={() => this.handleRangeFocusChange(i, 1)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  onDragSelectionStart = (date: Date) => {
    const { onChange, dragSelectionEnabled } = this.props;

    if (dragSelectionEnabled) {
      this.setState({
        drag: {
          status: true,
          range: { startDate: date, endDate: date },
          disablePreview: true,
        },
      });
    } else {
      onChange && onChange(date);
    }
  };

  onDragSelectionEnd = (date: Date) => {
    const { updateRange, displayMode, onChange, dragSelectionEnabled } = this.props;

    if (!dragSelectionEnabled) return;

    if (displayMode === 'date' || !this.state.drag.status) {
      onChange && onChange(date);
      return;
    }
    const newRange = {
      startDate: this.state.drag.range.startDate,
      endDate: date,
    };
    if (displayMode !== 'dateRange' || isSameDay(newRange.startDate, date)) {
      this.setState({ drag: { status: false, range: {} } }, () => onChange?.(date));
    } else {
      this.setState({ drag: { status: false, range: {} } }, () => {
        updateRange?.(newRange);
      });
    }
  };
  onDragSelectionMove = (date: Date) => {
    const { drag } = this.state;
    if (!drag.status || !this.props.dragSelectionEnabled) return;
    this.setState({
      drag: {
        status: drag.status,
        range: { startDate: drag.range.startDate, endDate: date },
        disablePreview: true,
      },
    });
  };

  // FIXME
  estimateMonthSize = (index: number, cache: any) => {
    const { direction, minDate } = this.props;
    const { scrollArea } = this.state;
    if (cache) {
      this.listSizeCache = cache;
      if (cache[index]) return cache[index];
    }
    if (direction === 'horizontal') return scrollArea.monthWidth;
    const monthStep = addMonths(minDate, index);
    const { start, end } = getMonthDisplayRange(monthStep, this.dateOptions, false);
    const isLongMonth = differenceInDays(end, start) + 1 > 7 * 5;
    return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
  };
  render() {
    const {
      showDateDisplay,
      onPreviewChange,
      scroll,
      direction,
      disabledDates,
      disabledDay,
      maxDate,
      minDate,
      rangeColors,
      color,
      navigatorRenderer,
      className,
      preview,
    } = this.props;
    const { scrollArea, focusedDate } = this.state;
    const isVertical = direction === CalendarDirection.VERTICAL;
    const monthAndYearRenderer = navigatorRenderer || this.renderMonthAndYear;

    const ranges = this.props.ranges.map((range, i) => ({
      ...range,
      color: range.color || rangeColors[i] || color,
    }));
    return (
      <div
        className={classnames(this.styles.calendarWrapper, className)}
        onMouseUp={() => this.setState({ drag: { status: false, range: {} } })}
        onMouseLeave={() => {
          this.setState({ drag: { status: false, range: {} } });
        }}>
        {showDateDisplay && this.renderDateDisplay()}
        {monthAndYearRenderer(focusedDate, this.changeShownDate, this.props)}
        {scroll.enabled ? (
          <div>
            {isVertical && this.renderWeekdays()}
            <div
              className={classnames(
                this.styles.infiniteMonths,
                isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal
              )}
              onMouseLeave={() => onPreviewChange?.()}
              style={{
                width: scrollArea.calendarWidth + 11,
                height: scrollArea.calendarHeight + 11,
              }}
              onScroll={this.handleScroll}>
              <ReactList
                length={differenceInCalendarMonths(
                  endOfMonth(maxDate),
                  addDays(startOfMonth(minDate), -1)
                )}
                threshold={500}
                type="variable"
                ref={target => (this.list = target)}
                itemSizeEstimator={this.estimateMonthSize}
                axis={isVertical ? 'y' : 'x'}
                itemRenderer={(index, key) => {
                  const monthStep = addMonths(minDate, index);
                  return (
                    <Month
                      {...this.props}
                      onPreviewChange={onPreviewChange || this.updatePreview}
                      preview={preview || this.state.preview}
                      ranges={ranges}
                      key={key}
                      drag={this.state.drag}
                      dateOptions={this.dateOptions}
                      disabledDates={disabledDates}
                      disabledDay={disabledDay}
                      month={monthStep}
                      onDragSelectionStart={this.onDragSelectionStart}
                      onDragSelectionEnd={this.onDragSelectionEnd}
                      onDragSelectionMove={this.onDragSelectionMove}
                      onMouseLeave={() => onPreviewChange?.()}
                      styles={this.styles}
                      style={
                        isVertical
                          ? { height: this.estimateMonthSize(index, {}) }
                          : { height: scrollArea.monthHeight, width: this.estimateMonthSize(index, {}) }
                      }
                      showMonthName
                      showWeekDays={!isVertical}
                    />
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className={classnames(
              this.styles.months,
              isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal
            )}>
            {new Array(this.props.months).fill(null).map((_, i) => {
              const monthStep = addMonths(this.state.focusedDate, i);
              return (
                <Month
                  {...this.props}
                  onPreviewChange={onPreviewChange || this.updatePreview}
                  preview={preview || this.state.preview}
                  ranges={ranges}
                  key={i}
                  drag={this.state.drag}
                  dateOptions={this.dateOptions}
                  disabledDates={disabledDates}
                  disabledDay={disabledDay}
                  month={monthStep}
                  onDragSelectionStart={this.onDragSelectionStart}
                  onDragSelectionEnd={this.onDragSelectionEnd}
                  onDragSelectionMove={this.onDragSelectionMove}
                  onMouseLeave={() => onPreviewChange?.()}
                  styles={this.styles}
                  showWeekDays={!isVertical || i === 0}
                  showMonthName={!isVertical || i > 0}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Calendar.propTypes = {
  showMonthArrow: PropTypes.bool,
  showMonthAndYearPickers: PropTypes.bool,
  disabledDates: PropTypes.array,
  disabledDay: PropTypes.func,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  date: PropTypes.object,
  onChange: PropTypes.func,
  onPreviewChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  classNames: PropTypes.object,
  locale: PropTypes.object,
  shownDate: PropTypes.object,
  onShownDateChange: PropTypes.func,
  ranges: PropTypes.arrayOf(rangeShape),
  preview: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    color: PropTypes.string,
  }),
  dateDisplayFormat: PropTypes.string,
  monthDisplayFormat: PropTypes.string,
  weekdayDisplayFormat: PropTypes.string,
  weekStartsOn: PropTypes.number,
  dayDisplayFormat: PropTypes.string,
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  initialFocusedRange: PropTypes.arrayOf(PropTypes.number),
  months: PropTypes.number,
  className: PropTypes.string,
  showDateDisplay: PropTypes.bool,
  showPreview: PropTypes.bool,
  displayMode: PropTypes.oneOf(['dateRange', 'date']),
  color: PropTypes.string,
  updateRange: PropTypes.func,
  scroll: PropTypes.shape({
    enabled: PropTypes.bool,
    monthHeight: PropTypes.number,
    longMonthHeight: PropTypes.number,
    monthWidth: PropTypes.number,
    calendarWidth: PropTypes.number,
    calendarHeight: PropTypes.number,
  }),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  startDatePlaceholder: PropTypes.string,
  endDatePlaceholder: PropTypes.string,
  navigatorRenderer: PropTypes.func,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  editableDateInputs: PropTypes.bool,
  dragSelectionEnabled: PropTypes.bool,
  fixedHeight: PropTypes.bool,
  ariaLabels: ariaLabelsShape,
};

export default Calendar;
