import React from 'react';
import { StylesType } from '../../styles';
import { AriaLabelsType } from '../../accessibility';
import { Locale, WeekOptions, Month as FNSMonth, addDays, addMonths, addYears, differenceInCalendarMonths, differenceInDays, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek, subMonths, isSameMonth, FormatOptions, ParseOptions, setMonth, setYear, min, max } from 'date-fns';
import { DateRange } from '../DayCell';
import { enUS } from 'date-fns/locale/en-US';
import { calcFocusDate, generateStyles, getMonthDisplayRange } from '../../utils';
import coreStyles from '../../styles';
import DateInput from '../DateInput';
import classnames from 'classnames';
import ReactList from 'react-list';
import Month from '../Month';

export type CalendarProps = {
  showMonthArrow?: boolean,
  showMonthAndYearPickers?: boolean,
  disabledDates?: Date[],
  disabledDay?: (date: Date) => boolean,
  minDate?: Date,
  maxDate?: Date,
  date?: Date,
  onChange?: (date: Date) => void,
  onPreviewChange?: (date?: Date) => void,
  onRangeFocusChange?: (range: number[]) => void,
  classNames?: Partial<StylesType>,
  locale?: Locale,
  shownDate?: Date,
  onShownDateChange?: (date: Date) => void,
  ranges?: DateRange[],
  preview?: {
    startDate?: Date,
    endDate?: Date,
    color?: string
  },
  dateDisplayFormat?: string,
  monthDisplayFormat?: string,
  weekdayDisplayFormat?: string,
  weekStartsOn?: number,
  dayDisplayFormat?: string,
  focusedRange?: number[],
  dayContentRenderer?: (date: Date) => React.ReactElement,
  initialFocusedRange?: number[],
  months?: number,
  className?: string,
  showDateDisplay?: boolean,
  showPreview?: boolean,
  displayMode?: "dateRange" | "date",
  color?: string,
  updateRange?: (range: DateRange) => void,
  scroll?: {
    enabled?: boolean,
    monthHeight?: number,
    longMonthHeight?: number,
    monthWidth?: number,
    calendarWidth?: number,
    calendarHeight?: number
  },
  direction?: 'vertical' | 'horizontal',
  startDatePlaceholder?: string,
  endDatePlaceholder?: string,
  rangeColors?: string[],
  editableDateInputs?: boolean,
  dragSelectionEnabled?: boolean,
  fixedHeight?: boolean,
  calendarFocus?: "forwards" | "backwards",
  preventSnapRefocus?: boolean,
  ariaLabels?: AriaLabelsType,
  preventScrollToFocusedMonth?: boolean
};

export default function Calendar({
  showMonthArrow = true,
  showMonthAndYearPickers = true,
  disabledDates = [],
  disabledDay = () => false,
  minDate = addYears(new Date(), -100),
  maxDate = addYears(new Date(), 20),
  date,
  onChange,
  onPreviewChange,
  onRangeFocusChange,
  classNames = {},
  locale = enUS,
  shownDate,
  onShownDateChange,
  ranges = [],
  preview,
  dateDisplayFormat = 'MMM d, yyyy',
  monthDisplayFormat = 'MMM yyyy',
  weekdayDisplayFormat = 'E',
  weekStartsOn,
  dayDisplayFormat = 'd',
  focusedRange = [0, 0],
  dayContentRenderer,
  months = 1,
  className,
  showDateDisplay = true,
  showPreview = true,
  displayMode = 'date',
  color = '#3d91ff',
  updateRange,
  scroll = {
    enabled: false
  },
  direction = 'vertical',
  startDatePlaceholder = `Early`,
  endDatePlaceholder = `Continuous`,
  rangeColors = ['#3d91ff', '#3ecf8e', '#fed14c'],
  editableDateInputs = false,
  dragSelectionEnabled = true,
  fixedHeight = false,
  calendarFocus = 'forwards',
  preventSnapRefocus = false,
  ariaLabels = {},
  preventScrollToFocusedMonth = false
}: CalendarProps) {

  const refs = React.useRef({
    dateOptions: {
      locale,
      weekStartsOn
    },
    styles: generateStyles([coreStyles, classNames]),
    listSizeCache: {},
    list: null,
    scroll,
    isFirstRender: true,
    date: date,
    ranges: ranges
  });

  const [state, setState] = React.useState({
    monthNames: getMonthNames(locale),
    focusedDate: calcFocusDate(null, shownDate, date, months, ranges, focusedRange, displayMode),
    drag: {
      status: false,
      range: { startDate: null, endDate: null },
      disablePreview: false
    },
    scrollArea: calcScrollArea(direction, months, scroll),
    preview: undefined
  });

  const updateShownDate = () => {
    const newFocus = calcFocusDate(state.focusedDate, shownDate, date, months, ranges, focusedRange, displayMode);

    focusToDate(newFocus);
  }

  React.useEffect(() => {

    if (JSON.stringify(ranges) != JSON.stringify(refs.current.ranges) || date?.getTime?.() != refs.current.date?.getTime?.()) {
      refs.current.ranges = ranges;
      refs.current.date = date;

      if(!preventScrollToFocusedMonth) {
        updateShownDate();
      }
    }

    if (refs.current.dateOptions.locale != locale) {
      refs.current.dateOptions.locale = locale;
      setState(s => ({ ...s, monthNames: getMonthNames(locale) }));
    }

    refs.current.dateOptions.weekStartsOn = weekStartsOn;

    if (JSON.stringify(refs.current.scroll) != JSON.stringify(scroll)) {
      refs.current.scroll = scroll;


      setState(s => ({ ...s, scrollArea: calcScrollArea(direction, months, scroll) }));
    }

  }, [ranges, date, scroll, direction, months, locale, weekStartsOn]);

  React.useEffect(() => {
    if (scroll.enabled) {
      focusToDate(state.focusedDate);
    }
  }, [scroll.enabled]);

  const isVertical = direction === 'vertical';

  const onDragSelectionStart = (date: Date) => {
    if (dragSelectionEnabled) {
      setState({ ...state, drag: { status: true, range: { startDate: date, endDate: date }, disablePreview: false } });
    } else {
      onChange?.(date);
    }
  }

  const onDragSelectionEnd = (date: Date) => {
    if (!dragSelectionEnabled) {
      return;
    }

    if (displayMode == 'date' || !state.drag.status) {
      onChange?.(date);
      return;
    }

    const newRange = {
      startDate: state.drag.range.startDate,
      endDate: date
    }

    if (displayMode != 'dateRange' || isSameDay(newRange.startDate, date)) {
      setState({ ...state, drag: { status: false, range: { startDate: null, endDate: null }, disablePreview: state.drag.disablePreview } });
      onChange?.(date);
    } else {
      setState({ ...state, drag: { status: false, range: { startDate: null, endDate: null }, disablePreview: state.drag.disablePreview } });
      updateRange?.(newRange);
    }
  }

  const onDragSelectionMove = (date: Date) => {
    if (!state.drag.status || !dragSelectionEnabled) {
      return;
    }

    setState({ ...state, drag: { status: state.drag.status, range: { startDate: state.drag.range.startDate, endDate: date }, disablePreview: state.drag.disablePreview } });
  }

  const handleRangeFocusChange = (rangesIndex: number, rangeItemIndex: number) => {
    onRangeFocusChange?.([rangesIndex, rangeItemIndex]);
  }

  const estimateMonthSize = (index: number, cache?: {[x: string]: number}) => {
    
    if (cache) {
      refs.current.listSizeCache = cache;

      if (cache[index]) {
        return cache[index];
      }
    }

    if (direction == 'horizontal') {
      return state.scrollArea.monthWidth;
    }

    const monthStep = addMonths(minDate, index);
    const { start, end } = getMonthDisplayRange(monthStep, refs.current.dateOptions as WeekOptions);
    const isLongMonth = differenceInDays(end, start) + 1 > 7 * 5;
    return isLongMonth ? state.scrollArea.longMonthHeight : state.scrollArea.monthHeight;
  }

  const handleScroll = () => {
    const visibleMonths = refs.current.list.getVisibleRange();

    if (visibleMonths[0] === undefined) return;

    const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !isSameMonth(visibleMonth, state.focusedDate);

    if (isFocusedToDifferent && !refs.current.isFirstRender) {
      setState(s => ({ ...s, focusedDate: visibleMonth }));
      onShownDateChange?.(visibleMonth);
    }

    refs.current.isFirstRender = false;
  }

  const updatePreview = (val?: Date) => {
    if (!val) {
      setState(s => ({ ...s, preview: undefined }));
      return;
    }

    const preview = {
      startDate: val,
      endDate: val,
      color: color
    }

    setState(s => ({ ...s, preview }));
  }

  const focusToDate = (date: Date, preventUnnecessary = true) => {

    if (!scroll.enabled) {
      if (preventUnnecessary && preventSnapRefocus) {
        const focusedDateDiff = differenceInCalendarMonths(date, state.focusedDate);

        const isAllowedForward = calendarFocus === 'forwards' && focusedDateDiff >= 0;
        const isAllowedBackward = calendarFocus === 'backwards' && focusedDateDiff <= 0;
        if ((isAllowedForward || isAllowedBackward) && Math.abs(focusedDateDiff) < months) {
          return;
        }
      }

      setState(s => ({ ...s, focusedDate: date }));
      return;
    }

    const targetMonthIndex = differenceInCalendarMonths(date, minDate);
    const visibleMonths = refs.current.list.getVisibleRange();

    if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;

    refs.current.isFirstRender = true;
    refs.current.list.scrollTo(targetMonthIndex);
    setState(s => ({ ...s, focusedDate: date }));
  }

  const changeShownDate = (value: number, mode: "set" | "setYear" | "setMonth" | "monthOffset" = "set") => {
    const modeMapper = {
      monthOffset: () => addMonths(state.focusedDate, value),
      setMonth: () => setMonth(state.focusedDate, value),
      setYear: () => setYear(state.focusedDate, value),
      set: () => value,
    };

    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
    focusToDate(newDate, false);
    onShownDateChange?.(newDate);
  }

  const rangesInternal = ranges.map((range, i) => ({
    ...range,
    color: range.color || rangeColors[i] || color,
  }));

  return (
    <div
      className={classnames(refs.current.styles.calendarWrapper, className)}
      onMouseUp={() => {
        setState({ ...state, drag: { status: false, range: { startDate: null, endDate: null }, disablePreview: false } });
      }}
      onMouseLeave={() => {
        setState({ ...state, drag: { status: false, range: { startDate: null, endDate: null }, disablePreview: false } });
      }}>
      {showDateDisplay ? <DateDisplay onDragSelectionEnd={onDragSelectionEnd} handleRangeFocusChange={handleRangeFocusChange} dateOptions={refs.current.dateOptions as ParseOptions} ariaLabels={ariaLabels} styles={refs.current.styles} startDatePlaceholder={startDatePlaceholder} endDatePlaceholder={endDatePlaceholder} editableDateInputs={editableDateInputs} focusedRange={focusedRange} color={color} ranges={rangesInternal} rangeColors={rangeColors} dateDisplayFormat={dateDisplayFormat} /> : null}
      <MonthAndYear monthNames={state.monthNames} focusedDate={state.focusedDate} changeShownDate={changeShownDate} styles={refs.current.styles as StylesType} showMonthAndYearPickers={showMonthAndYearPickers} showMonthArrow={showMonthArrow} minDate={minDate} maxDate={maxDate} ariaLabels={ariaLabels} />
      {scroll.enabled ? (
        <div>
          {isVertical ? <Weekdays styles={refs.current.styles} dateOptions={refs.current.dateOptions} weekdayDisplayFormat={weekdayDisplayFormat} /> : null}
          <div
            className={classnames(
              refs.current.styles.infiniteMonths,
              isVertical ? refs.current.styles.monthsVertical : refs.current.styles.monthsHorizontal
            )}
            onMouseLeave={() => onPreviewChange?.()}
            style={{
              width: typeof state.scrollArea.calendarWidth === 'string' ? state.scrollArea.calendarWidth : ((state.scrollArea.calendarWidth || 0) + 11),
              height: state.scrollArea.calendarHeight + 11,
            }}
            onScroll={handleScroll}>
            <ReactList
              length={differenceInCalendarMonths(
                endOfMonth(maxDate),
                addDays(startOfMonth(minDate), -1)
              )}
              type="variable"
              ref={target => {
                refs.current.list = target;
              }}
              itemSizeEstimator={estimateMonthSize}
              axis={isVertical ? 'y' : 'x'}
              itemRenderer={(index, key) => {
                const monthStep = addMonths(minDate, index);
                return (
                  <Month
                    dayContentRenderer={dayContentRenderer}
                    fixedHeight={fixedHeight}
                    showPreview={showPreview}
                    weekdayDisplayFormat={weekdayDisplayFormat}
                    dayDisplayFormat={dayDisplayFormat}
                    displayMode={displayMode}
                    onPreviewChange={onPreviewChange || updatePreview}
                    preview={preview || state.preview}
                    ranges={rangesInternal}
                    key={key}
                    focusedRange={focusedRange}
                    drag={state.drag}
                    monthDisplayFormat={monthDisplayFormat}
                    dateOptions={refs.current.dateOptions as unknown as FormatOptions}
                    disabledDates={disabledDates}
                    disabledDay={disabledDay}
                    month={monthStep}
                    onDragSelectionStart={onDragSelectionStart}
                    onDragSelectionEnd={onDragSelectionEnd}
                    onDragSelectionMove={onDragSelectionMove}
                    onMouseLeave={() => onPreviewChange?.()}
                    styles={refs.current.styles as StylesType}
                    style={
                      isVertical
                        ? { height: estimateMonthSize(index) }
                        : { height: state.scrollArea.monthHeight, width: estimateMonthSize(index) }
                    }
                    showMonthName
                    showWeekDays={!isVertical}
                    color={color}
                    maxDate={maxDate}
                    minDate={minDate}
                    date={date}
                  />
                );
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className={classnames(
            refs.current.styles.months,
            isVertical ? refs.current.styles.monthsVertical : refs.current.styles.monthsHorizontal
          )}>
          {new Array(months).fill(null).map((_, i) => {
            let monthStep = addMonths(state.focusedDate, i);;
            if (calendarFocus === 'backwards') {
              monthStep = subMonths(state.focusedDate, months - 1 - i);
            }
            return (
              <Month
                dayContentRenderer={dayContentRenderer}
                fixedHeight={fixedHeight}
                weekdayDisplayFormat={weekdayDisplayFormat}
                dayDisplayFormat={dayDisplayFormat}
                monthDisplayFormat={monthDisplayFormat}
                style={{}}
                showPreview={showPreview}
                displayMode={displayMode}
                onPreviewChange={onPreviewChange || updatePreview}
                preview={preview || state.preview}
                ranges={rangesInternal}
                key={i}
                drag={state.drag}
                focusedRange={focusedRange}
                dateOptions={refs.current.dateOptions as FormatOptions}
                disabledDates={disabledDates}
                disabledDay={disabledDay}
                month={monthStep}
                onDragSelectionStart={onDragSelectionStart}
                onDragSelectionEnd={onDragSelectionEnd}
                onDragSelectionMove={onDragSelectionMove}
                onMouseLeave={() => onPreviewChange?.()}
                styles={refs.current.styles as StylesType}
                showWeekDays={!isVertical || i === 0}
                showMonthName={!isVertical || i > 0}
                color={color}
                maxDate={maxDate}
                minDate={minDate}
                date={date}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

type MonthAndYearProps = {
  styles: StylesType,
  showMonthArrow: boolean,
  minDate: Date,
  maxDate: Date,
  ariaLabels: AriaLabelsType,
  focusedDate: Date,
  showMonthAndYearPickers: boolean,
  monthNames: string[],
  changeShownDate: (value: number, mode: "set" | "monthOffset" | "setMonth" | "setYear") => void
};

function MonthAndYear({
  styles,
  showMonthArrow,
  minDate,
  maxDate,
  ariaLabels,
  focusedDate,
  showMonthAndYearPickers,
  changeShownDate,
  monthNames
}: MonthAndYearProps) {

  const upperYearLimit = maxDate.getFullYear();
  const lowerYearLimit = minDate.getFullYear();

  return (
    <div onMouseUp={e => e.stopPropagation()} className={styles.monthAndYearWrapper}>
      {showMonthArrow ? (
        <button
          type="button"
          className={classnames(styles.nextPrevButton, styles.prevButton)}
          onClick={() => changeShownDate(-1, 'monthOffset')}
          aria-label={ariaLabels.prevButton}>
          <i />
        </button>
      ) : null}
      {showMonthAndYearPickers ? (
        <span className={styles.monthAndYearPickers}>
          <span className={styles.monthPicker}>
            <select
              value={focusedDate.getMonth()}
              onChange={e => changeShownDate(Number(e.target.value), 'setMonth')}
              aria-label={ariaLabels.monthPicker}>
              {monthNames.map((monthName: string, i: number) => (
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
              onChange={e => changeShownDate(Number(e.target.value), 'setYear')}
              aria-label={ariaLabels.yearPicker}>
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
          onClick={() => changeShownDate(+1, 'monthOffset')}
          aria-label={ariaLabels.nextButton}>
          <i />
        </button>
      ) : null}
    </div>
  )
}

type WeekdaysProps = {
  styles: Partial<StylesType>,
  dateOptions: {
    locale: Locale,
    weekStartsOn?: number
  },
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
      {eachDayOfInterval({
        start: startOfWeek(now, dateOptions as WeekOptions),
        end: endOfWeek(now, dateOptions as WeekOptions),
      }).map((day, i) => (
        <span className={styles.weekDay} key={i}>
          {format(day, weekdayDisplayFormat, dateOptions as WeekOptions)}
        </span>
      ))}
    </div>
  );
}

type DateDisplayProps = {
  focusedRange: number[],
  color: string,
  ranges: DateRange[],
  rangeColors: string[],
  dateOptions: ParseOptions,
  dateDisplayFormat: string,
  editableDateInputs: boolean,
  startDatePlaceholder: string,
  endDatePlaceholder: string,
  ariaLabels: AriaLabelsType,
  styles: Partial<StylesType>,
  onDragSelectionEnd: (date: Date) => void,
  handleRangeFocusChange: (rangesIndex: number, rangeItemIndex: number) => void
};

function DateDisplay({
  focusedRange,
  color,
  ranges,
  rangeColors,
  dateDisplayFormat,
  editableDateInputs,
  startDatePlaceholder,
  endDatePlaceholder,
  ariaLabels,
  styles,
  dateOptions,
  onDragSelectionEnd,
  handleRangeFocusChange
}: DateDisplayProps) {
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
              placeholder={startDatePlaceholder}
              dateOptions={dateOptions}
              dateDisplayFormat={dateDisplayFormat}
              ariaLabel={
                ariaLabels.dateInput &&
                ariaLabels.dateInput[range.key] &&
                ariaLabels.dateInput[range.key].startDate
              }
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
              placeholder={endDatePlaceholder}
              dateOptions={dateOptions}
              dateDisplayFormat={dateDisplayFormat}
              ariaLabel={
                ariaLabels.dateInput &&
                ariaLabels.dateInput[range.key] &&
                ariaLabels.dateInput[range.key].endDate
              }
              onChange={onDragSelectionEnd}
              onFocus={() => handleRangeFocusChange(i, 1)}
            />
          </div>
        );
      })}
    </div>
  );
}

function getMonthNames(locale: Locale) {
  return [...Array(12).keys()].map(i => locale.localize.month(i as FNSMonth));
}

function calcScrollArea(direction: 'vertical' | 'horizontal', months: number, scroll: CalendarProps["scroll"]) {
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
}