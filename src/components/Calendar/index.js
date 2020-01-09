import React, { useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { rangeShape } from '../DayCell';
import Month from '../Month';
import DateInput from '../DateInput';
import { calcFocusDate, generateStyles, getMonthDisplayRange } from '../../utils';
import classnames from 'classnames';
import ReactList from 'react-list';
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

const ReactListRefed = forwardRef((props, ref) => <ReactList {...props} ref={ref} />);

function Calendar(props) {
  const dateOptions = { locale: props.locale };
  const styles = generateStyles([coreStyles, props.classNames]);
  let listSizeCache = {};
  let listRef = useRef();
  let list = listRef.current;
  const monthNames = [...Array(12).keys()].map(i => props.locale.localize.month(i));
  let isFirstRender = true;

  const calcScrollArea = props => {
    const { direction, months, scroll } = props;
    if (!scroll.enabled) return { enabled: false };

    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
    if (direction === 'vertical') {
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
  };

  const focusToDate = (date, props = props, preventUnnecessary = true) => {
    if (!props.scroll.enabled) {
      setState({ ...state, focusedDate: date });
      return;
    }
    const targetMonthIndex = differenceInCalendarMonths(date, props.minDate, dateOptions);
    const visibleMonths = list.getVisibleRange();
    if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
    isFirstRender = true;
    list.scrollTo(targetMonthIndex);
    setState({ ...state, focusedDate: date });
  };

  const updateShownDate = (props = props) => {
    const newProps = props.scroll.enabled
      ? {
          ...props,
          months: list.getVisibleRange().length,
        }
      : props;
    const newFocus = calcFocusDate(state.focusedDate, newProps);
    focusToDate(newFocus, newProps);
  };
  const updatePreview = val => {
    if (!val) {
      setState({ ...state, preview: null });
      return;
    }
    const preview = {
      startDate: val,
      endDate: val,
      color: props.color,
    };
    setState({ ...state, preview });
  };

  const changeShownDate = (value, mode = 'set') => {
    const { focusedDate } = state;
    const { onShownDateChange, minDate, maxDate } = props;
    const modeMapper = {
      monthOffset: () => addMonths(focusedDate, value),
      setMonth: () => setMonth(focusedDate, value),
      setYear: () => setYear(focusedDate, value),
      set: () => value,
    };

    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
    focusToDate(newDate, props, false);
    onShownDateChange && onShownDateChange(newDate);
  };
  const handleRangeFocusChange = (rangesIndex, rangeItemIndex) => {
    props.onRangeFocusChange && props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
  };
  const handleScroll = () => {
    const { onShownDateChange, minDate } = props;
    const { focusedDate } = state;

    const visibleMonths = list.getVisibleRange();
    // prevent scroll jump with wrong visible value
    if (visibleMonths[0] === undefined) return;
    const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !isSameMonth(visibleMonth, focusedDate);
    if (isFocusedToDifferent && !isFirstRender) {
      setState({ ...state, focusedDate: visibleMonth });
      onShownDateChange && onShownDateChange(visibleMonth);
    }
    isFirstRender = false;
  };
  const renderMonthAndYear = (focusedDate, changeShownDate, props) => {
    const { showMonthArrow, minDate, maxDate, showMonthAndYearPickers } = props;
    const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
    const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
    return (
      <div onMouseUp={e => e.stopPropagation()} className={styles.monthAndYearWrapper}>
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.prevButton)}
            onClick={() => changeShownDate(-1, 'monthOffset')}>
            <i />
          </button>
        ) : null}
        {showMonthAndYearPickers ? (
          <span className={styles.monthAndYearPickers}>
            <span className={styles.monthPicker}>
              <select
                value={focusedDate.getMonth()}
                onChange={e => changeShownDate(e.target.value, 'setMonth')}>
                {monthNames.map((monthName, i) => (
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
                onChange={e => changeShownDate(e.target.value, 'setYear')}>
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
            {monthNames[focusedDate.getMonth()]} {focusedDate.getFullYear()}
          </span>
        )}
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.nextButton)}
            onClick={() => changeShownDate(+1, 'monthOffset')}>
            <i />
          </button>
        ) : null}
      </div>
    );
  };
  const renderWeekdays = () => {
    const now = new Date();
    return (
      <div className={styles.weekDays}>
        {eachDayOfInterval({
          start: startOfWeek(now, dateOptions),
          end: endOfWeek(now, dateOptions),
        }).map((day, i) => (
          <span className={styles.weekDay} key={i}>
            {format(day, props.weekdayDisplayFormat, dateOptions)}
          </span>
        ))}
      </div>
    );
  };
  const renderDateDisplay = () => {
    const {
      focusedRange,
      color,
      ranges,
      rangeColors,
      dateDisplayFormat,
      editableDateInputs,
    } = props;

    const defaultColor = rangeColors[focusedRange[0]] || color;

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
                placeholder="Early"
                dateOptions={dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                onChange={onDragSelectionEnd}
                onFocus={() => handleRangeFocusChange(i, 0)}
              />
              <DateInput
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1,
                })}
                readOnly={!editableDateInputs}
                disabled={range.disabled}
                value={range.endDate}
                placeholder="Continuous"
                dateOptions={dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                onChange={onDragSelectionEnd}
                onFocus={() => handleRangeFocusChange(i, 1)}
              />
            </div>
          );
        })}
      </div>
    );
  };
  const onDragSelectionStart = date => {
    const { onChange, dragSelectionEnabled } = props;

    if (dragSelectionEnabled) {
      setState({
        ...state,
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

  const onDragSelectionEnd = date => {
    const { updateRange, displayMode, onChange, dragSelectionEnabled } = props;

    if (!dragSelectionEnabled) return;

    if (displayMode === 'date' || !state.drag.status) {
      onChange && onChange(date);
      return;
    }
    const newRange = {
      startDate: state.drag.range.startDate,
      endDate: date,
    };
    if (displayMode !== 'dateRange' || isSameDay(newRange.startDate, date)) {
      setState({ ...state, drag: { status: false, range: {} } });
      onChange && onChange(date);
    } else {
      setState({ ...state, drag: { status: false, range: {} } });
      updateRange && updateRange(newRange);
    }
  };
  const onDragSelectionMove = date => {
    const { drag } = state;
    if (!drag.status || !props.dragSelectionEnabled) return;
    setState({
      ...state,

      drag: {
        status: drag.status,
        range: { startDate: drag.range.startDate, endDate: date },
        disablePreview: true,
      },
    });
  };

  const estimateMonthSize = (index, cache) => {
    const { direction, minDate } = props;
    const { scrollArea } = state;
    if (cache) {
      listSizeCache = cache;
      if (cache[index]) return cache[index];
    }
    if (direction === 'horizontal') return scrollArea.monthWidth;
    const monthStep = addMonths(minDate, index);
    const { start, end } = getMonthDisplayRange(monthStep, dateOptions);
    const isLongMonth = differenceInDays(end, start, dateOptions) + 1 > 7 * 5;
    return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
  };

  const [state, setState] = useState({
    focusedDate: calcFocusDate(null, props),
    drag: {
      status: false,
      range: { startDate: null, endDate: null },
      disablePreview: false,
    },
    scrollArea: calcScrollArea(props),
  });

  const {
    showDateDisplay,
    onPreviewChange,
    scroll,
    direction,
    disabledDates,
    maxDate,
    minDate,
    rangeColors,
    color,
  } = props;
  const { scrollArea, focusedDate } = state;
  const isVertical = direction === 'vertical';
  const navigatorRenderer = props.navigatorRenderer || renderMonthAndYear;

  const ranges = props.ranges.map((range, i) => ({
    ...range,
    color: range.color || rangeColors[i] || color,
  }));

  return (
    <div
      className={classnames(styles.calendarWrapper, props.className)}
      onMouseUp={() => setState({ ...state, drag: { status: false, range: {} } })}
      onMouseLeave={() => {
        setState({ ...state, drag: { status: false, range: {} } });
      }}>
      {showDateDisplay && renderDateDisplay()}
      {navigatorRenderer(focusedDate, changeShownDate, props)}
      {scroll.enabled ? (
        <div>
          {isVertical && renderWeekdays(dateOptions)}
          <div
            className={classnames(
              styles.infiniteMonths,
              isVertical ? styles.monthsVertical : styles.monthsHorizontal
            )}
            onMouseLeave={() => onPreviewChange && onPreviewChange()}
            style={{
              width: scrollArea.calendarWidth + 11,
              height: scrollArea.calendarHeight + 11,
            }}
            onScroll={handleScroll}>
            <ReactList
              length={differenceInCalendarMonths(
                endOfMonth(maxDate),
                addDays(startOfMonth(minDate), -1),
                dateOptions
              )}
              treshold={500}
              type="variable"
              ref={listRef}
              itemSizeEstimator={estimateMonthSize}
              axis={isVertical ? 'y' : 'x'}
              itemRenderer={(index, key) => {
                const monthStep = addMonths(minDate, index);
                return (
                  <Month
                    {...props}
                    onPreviewChange={props.onPreviewChange || updatePreview}
                    preview={props.preview || state.preview}
                    ranges={ranges}
                    key={key}
                    drag={state.drag}
                    dateOptions={dateOptions}
                    disabledDates={disabledDates}
                    month={monthStep}
                    onDragSelectionStart={onDragSelectionStart}
                    onDragSelectionEnd={onDragSelectionEnd}
                    onDragSelectionMove={onDragSelectionMove}
                    onMouseLeave={() => onPreviewChange && onPreviewChange()}
                    styles={styles}
                    style={
                      isVertical
                        ? { height: estimateMonthSize(index) }
                        : { height: scrollArea.monthHeight, width: estimateMonthSize(index) }
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
            styles.months,
            isVertical ? styles.monthsVertical : styles.monthsHorizontal
          )}>
          {new Array(props.months).fill(null).map((_, i) => {
            const monthStep = addMonths(state.focusedDate, i);
            return (
              <Month
                {...props}
                onPreviewChange={props.onPreviewChange || updatePreview}
                preview={props.preview || state.preview}
                ranges={ranges}
                key={i}
                drag={state.drag}
                dateOptions={dateOptions}
                disabledDates={disabledDates}
                month={monthStep}
                onDragSelectionStart={onDragSelectionStart}
                onDragSelectionEnd={onDragSelectionEnd}
                onDragSelectionMove={onDragSelectionMove}
                onMouseLeave={() => onPreviewChange && onPreviewChange()}
                styles={styles}
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

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
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
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false,
  },
  direction: 'vertical',
  maxDate: addYears(new Date(), 20),
  minDate: addYears(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  editableDateInputs: false,
  dragSelectionEnabled: true,
};

Calendar.propTypes = {
  showMonthArrow: PropTypes.bool,
  showMonthAndYearPickers: PropTypes.bool,
  disabledDates: PropTypes.array,
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
  navigatorRenderer: PropTypes.func,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  editableDateInputs: PropTypes.bool,
  dragSelectionEnabled: PropTypes.bool,
};

export default Calendar;
