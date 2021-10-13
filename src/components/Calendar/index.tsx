/// <reference path="./../../types.d.ts"/>
import React, { PureComponent } from 'react';
import Month, { Drag } from '../Month';
import DateInput from '../DateInput';
import { calcFocusDate, CalcFocusDateProps, generateStyles, getMonthDisplayRange, inferAriaLabel, renderWeekdays } from '../../utils';
import { enUS } from '../../locale'
import classnames from 'classnames';
import ReactList from 'react-list';
import { shallowEqualObjects } from 'shallow-equal';
import {
  addMonths,
  subMonths,
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
  Locale,
  isValid,
} from 'date-fns';
import defaultLocale from 'date-fns/locale/en-US';
import coreStyles, { ClassNames } from '../../styles';
import { AriaLabelShape, CalendarDirection, CalendarFocus, CommonCalendarProps, DateOptions, DisplayMode, isModeMapperKey, isSureRange, Preview, MaybeEmptyRange, RangeFocus, ScrollOptions, SureStartEndDate } from '../../types';
import { DateReceivingFunc, OptionalDateReceivingFunc } from '../DayCell';

type ScrollArea = {
  enabled: boolean;
  monthHeight?: number;
  longMonthHeight?: number;
  calendarWidth?: number | 'auto';
  calendarHeight?: number;
  monthWidth?: number;
}

type ComponentState = {
  monthNames: string[];
  focusedDate: Date;
  drag: Drag;
  scrollArea: ScrollArea;
  preview?: Preview | null;

}

type DefaultCalendarProps = CalcFocusDateProps & {
  ariaLabels?: AriaLabelShape;
  calendarFocus: CalendarFocus;
  classNames: Partial<ClassNames>;
  color: string;
  dateDisplayFormat: string;
  dayDisplayFormat: string;
  direction: CalendarDirection;
  disabledDates: Date[];
  disabledDay: (day: Date) => boolean;
  dragSelectionEnabled: boolean;
  editableDateInputs: boolean;
  endDatePlaceholder: string;
  fixedHeight: boolean;
  focusedRange: RangeFocus;
  locale: Locale;
  maxDate: Date;
  minDate: Date;
  monthDisplayFormat: string;
  months: number;
  preventSnapRefocus: boolean;
  preview?: Preview | null;
  rangeColors: string[];
  ranges: MaybeEmptyRange[];
  scroll: {
    enabled: boolean;
  },
  showDateDisplay: boolean;
  showMonthAndYearPickers: boolean;
  showMonthArrow: boolean;
  showPreview: boolean;
  startDatePlaceholder: string;
  weekdayDisplayFormat: string;
  //added by g
  date: Date | number;
};

export type CalendarProps = CommonCalendarProps & {
  /** default: today */
  date: Date | number;
  /** default: none */
  onChange?: DateReceivingFunc;
  scroll?: { enabled: boolean; };
  preventSnapRefocus?: boolean;
  onPreviewChange?: OptionalDateReceivingFunc;
  updateRange?: (range: SureStartEndDate) => void;
  className?: string;
  displayMode?: DisplayMode;
}

type ComponentProps = CalendarProps & DefaultCalendarProps;

class Calendar extends PureComponent<ComponentProps, ComponentState> {

  dateOptions: DateOptions;
  styles: any;
  listSizeCache: any;
  isFirstRender: boolean;
  list: ReactList | null;

  public static defaultProps: DefaultCalendarProps = {
    ariaLabels: {
      monthPicker: "month picker",
      yearPicker: "year picker",
      prevButton: "previous month button",
      nextButton: "next month button",
    },
    calendarFocus: 'forwards',
    classNames: {},
    color: '#3d91ff',
    date: new Date(),
    dateDisplayFormat: 'MMM d, yyyy',
    dayDisplayFormat: 'd',
    direction: 'vertical',
    disabledDates: [],
    disabledDay: () => false,
    displayMode: 'date',
    dragSelectionEnabled: true,
    editableDateInputs: false,
    endDatePlaceholder: 'Continuous',
    fixedHeight: false,
    focusedRange: [0, 0],
    locale: defaultLocale,
    maxDate: addYears(new Date(), 20),
    minDate: addYears(new Date(), -100),
    monthDisplayFormat: 'MMM yyyy',
    months: 1,
    preventSnapRefocus: false,
    rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
    ranges: [],
    scroll: {
      enabled: false,
    },
    showDateDisplay: true,
    showMonthAndYearPickers: true,
    showMonthArrow: true,
    showPreview: true,
    startDatePlaceholder: 'Early',
    weekdayDisplayFormat: 'E',
  }

  constructor(props: ComponentProps) {
    super(props);
    this.dateOptions = { locale: this.props.locale, ...( this.props.weekStartsOn !== undefined ? { weekStartsOn: this.props.weekStartsOn } : {})};
    this.styles = generateStyles([coreStyles, this.props.classNames]);
    this.listSizeCache = {};
    this.isFirstRender = true;
    this.list = null;
    const focusedDate = calcFocusDate(null, this.props);
    this.state = {
      monthNames: this.getMonthNames(),
      focusedDate,
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false,
      },
      scrollArea: this.calcScrollArea(this.props),
    };
  }

  getMonthNames() {
    const locale = this.props.locale || enUS;
    return [...Array(12).keys()].map(i => locale.localize?.month(i));
  }

  calcScrollArea(props: {
    direction: 'vertical' | 'horizontal';
    months: number;
    scroll: ScrollOptions;
  }): ScrollArea {
    const { direction, months, scroll } = props;
    if (!scroll.enabled) return { enabled: false };

    const longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
    return (direction === 'vertical')
      ? {
        enabled: true,
        monthHeight: scroll.monthHeight || 220,
        longMonthHeight: longMonthHeight || 260,
        calendarWidth: 'auto',
        calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months,
      }
      : {
        enabled: true,
        monthWidth: scroll.monthWidth || 332,
        calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
        monthHeight: longMonthHeight || 300,
        calendarHeight: longMonthHeight || 300,
    };
  }

  focusToDate = (date: Date, props = this.props, preventUnnecessary = true) => {
    if (!props.scroll?.enabled) {
      if (preventUnnecessary && props.preventSnapRefocus) {
        const focusedDateDiff = differenceInCalendarMonths(date, this.state.focusedDate);
        const isAllowedForward = props.calendarFocus === 'forwards' && focusedDateDiff >= 0;
        const isAllowedBackward = props.calendarFocus === 'backwards' && focusedDateDiff <= 0;
        if ((isAllowedForward || isAllowedBackward) && Math.abs(focusedDateDiff) < props.months) {
          return;
        }
      }
      this.setState({ focusedDate: date });
      return;
    }
    const targetMonthIndex = differenceInCalendarMonths(date, props.minDate);
    const visibleMonths = this.list?.getVisibleRange();
    if (preventUnnecessary && visibleMonths?.includes(targetMonthIndex)) return;
    this.isFirstRender = true;
    this.list?.scrollTo(targetMonthIndex);
    this.setState({ focusedDate: date });
  }

  updateShownDate = (props = this.props) => {
    const newProps = props.scroll?.enabled
      ? {
          ...props,
          months: this.list?.getVisibleRange().length || 0,
        }
      : props;
    const newFocus = calcFocusDate(this.state.focusedDate, newProps);
    this.focusToDate(newFocus, newProps);
  }

  updatePreview = (val?: Date) => {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const preview = {
      startDate: val,
      endDate: val,
      color: this.props.color,
    };
    this.setState({ preview });
  }

  componentDidMount() {
    if (this.props.scroll.enabled) {
      // prevent react-list's initial render focus problem
      setTimeout(() => this.focusToDate(this.state.focusedDate));
    }
  }

  componentDidUpdate(prevProps: ComponentProps) {
    const displayMode: DisplayMode = this.props.displayMode || 'date';
    const propMapper = {
      dateRange: 'ranges',
      date: 'date',
    };
    const targetProp = propMapper[displayMode] as 'ranges' | 'date';
    if (this.props[targetProp] !== prevProps[targetProp]) {
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

  changeShownDate = (value: number | string | Date, mode: string = 'set') => {
    const { focusedDate } = this.state;
    const { onShownDateChange, minDate, maxDate } = this.props;
    if (value instanceof Date || typeof value !== 'number') {
      console.log(value);
      throw new Error('value should always be a number, string given');
    }
    const modeMapper = {
      monthOffset: () => addMonths(focusedDate, value),
      setMonth: () => setMonth(focusedDate, value),
      setYear: () => setYear(focusedDate, value),
      set: () => value,
    };

    if (!isModeMapperKey(mode, modeMapper)) {
      console.log('mode: ', mode);
      throw new Error('Unsupported mode');
    }

    const newDate = min([max([modeMapper[mode](), minDate]), maxDate]);
    this.focusToDate(newDate, this.props, false);
    onShownDateChange && onShownDateChange(newDate);
  }

  handleRangeFocusChange = (rangesIndex: number, rangeItemIndex: number) => {
    this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
  }

  handleScroll = () => {
    const { onShownDateChange, minDate } = this.props;
    const { focusedDate } = this.state;
    const { isFirstRender } = this;

    const visibleMonths = this.list?.getVisibleRange();
    // prevent scroll jump with wrong visible value
    if (visibleMonths === undefined || visibleMonths[0] === undefined) return;
    const visibleMonth = addMonths(minDate, visibleMonths[0] || 0);
    const isFocusedToDifferent = !isSameMonth(visibleMonth, focusedDate);
    if (isFocusedToDifferent && !isFirstRender) {
      this.setState({ focusedDate: visibleMonth });
      onShownDateChange && onShownDateChange(visibleMonth);
    }
    this.isFirstRender = false;
  };

  renderMonthAndYear = (focusedDate: Date, changeShownDate: (n: number | string, method: string) => void, props: ComponentProps) => {
    const { showMonthArrow, minDate, maxDate, showMonthAndYearPickers, ariaLabels } = props;
    const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
    const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
    const styles = this.styles;
    return (
      <div onMouseUp={e => e.stopPropagation()} className={styles.monthAndYearWrapper}>
        {showMonthArrow ? (
          <button
            type="button"
            className={classnames(styles.nextPrevButton, styles.prevButton)}
            onClick={() => changeShownDate(-1, 'monthOffset')}
            aria-label={ariaLabels?.prevButton}>
            <i />
          </button>
        ) : null}
        {showMonthAndYearPickers ? (
          <span className={styles.monthAndYearPickers}>
            <span className={styles.monthPicker}>
              <select
                value={focusedDate.getMonth()}
                onChange={e => changeShownDate(e.target.value, 'setMonth')}
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
                onChange={e => changeShownDate(e.target.value, 'setYear')}
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
            onClick={() => changeShownDate(+1, 'monthOffset')}
            aria-label={ariaLabels?.nextButton}>
            <i />
          </button>
        ) : null}
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
                value={range.startDate === null ? undefined : range.startDate}
                placeholder={startDatePlaceholder}
                dateOptions={this.dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                ariaLabel={inferAriaLabel(range, ariaLabels, 'startDate')}
                onChange={this.onDragSelectionEnd}
                onFocus={() => this.handleRangeFocusChange(i, 0)}
              />
              <DateInput
                className={classnames(styles.dateDisplayItem, {
                  [styles.dateDisplayItemActive]: focusedRange[0] === i && focusedRange[1] === 1,
                })}
                readOnly={!editableDateInputs}
                disabled={range.disabled}
                value={range.endDate === null ? undefined : range.endDate}
                placeholder={endDatePlaceholder}
                dateOptions={this.dateOptions}
                dateDisplayFormat={dateDisplayFormat}
                ariaLabel={inferAriaLabel(range, ariaLabels, 'endDate')}
                onChange={_ => this.onDragSelectionEnd}
                onFocus={_ => this.handleRangeFocusChange(i, 1)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  onDragSelectionStart = (date?: Date) => {
    const { onChange, dragSelectionEnabled } = this.props;

    if (dragSelectionEnabled) {
      this.setState({
        drag: {
          status: true,
          range: { startDate: date || null, endDate: date || null},
          disablePreview: true,
        },
      });
    } else {
      if (!date) {
        throw new Error('Bug, expecting date to not be undefined');
      }
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
    const newRange: MaybeEmptyRange = {
      startDate: this.state.drag.range.startDate || date,
      endDate: date,
    };
    if (displayMode !== 'dateRange' || (newRange.startDate && date && isSameDay(newRange.startDate, date))) {
      this.setState({ drag: { status: false, range: {}, disablePreview: this.state.drag.disablePreview } }, () => onChange && onChange(date));
    } else {
      this.setState({ drag: { status: false, range: {}, disablePreview: this.state.drag.disablePreview } }, () => {
        if (!isSureRange(newRange)) {
          console.log(newRange);
          throw new Error('Bug, expecting sure range, and found something else, likely a null range');
        }
        return updateRange && updateRange(newRange);
      });
    }
  }

  onDragSelectionMove = (date?: Date) => {
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

  estimateMonthSize = (index: number, cache?: { [k: number]: number; }): number => {
    const { direction, minDate } = this.props;
    const { scrollArea } = this.state;
    if (cache) {
      this.listSizeCache = cache;
      if (cache[index]) return cache[index];
    }
    if (direction === 'horizontal') {
      if (typeof scrollArea.monthWidth !== 'number') {
        console.log(scrollArea);
        throw new Error('scrollArea.monthWidth should be a number');
      }
      return scrollArea.monthWidth
    };
    const monthStep = addMonths(minDate, index);
    const { start, end } = getMonthDisplayRange(monthStep, this.dateOptions);
    const isLongMonth = differenceInDays(end, start) + 1 > 7 * 5;
    if (isLongMonth) {
      if (undefined === scrollArea.longMonthHeight) {
        throw new Error('scrollArea.longMonthWidth should be a number, but is undefined');
      }
      return scrollArea.longMonthHeight;
    } else {
      if (undefined === scrollArea.monthHeight) {
        throw new Error('scrollArea.monthHeight should be a number, but is undefined');
      }
      return scrollArea.monthHeight;
    }
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
    const isVertical = direction === 'vertical';
    const monthAndYearRenderer = navigatorRenderer || this.renderMonthAndYear;

    const ranges = this.props.ranges.map((range, i) => ({
      ...range,
      color: range.color || rangeColors[i] || color,
    }));

    return (
      <div
        className={classnames(this.styles.calendarWrapper, className)}
        onMouseUp={() => this.setState({ drag: { status: false, range: {}, disablePreview: this.state.drag.disablePreview } })}
        onMouseLeave={() => {
          this.setState({ drag: { status: false, range: {}, disablePreview: this.state.drag.disablePreview } });
        }}>
        {showDateDisplay && this.renderDateDisplay()}
        {monthAndYearRenderer(focusedDate, this.changeShownDate, this.props)}
        {scroll.enabled ? (
          <div>
            {isVertical && renderWeekdays(this.styles, this.dateOptions, this.props.weekdayDisplayFormat)}
            <div
              className={classnames(
                this.styles.infiniteMonths,
                isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal
              )}
              onMouseLeave={() => onPreviewChange && onPreviewChange()}
              style={{
                width: (typeof scrollArea.calendarWidth === 'string' && scrollArea.calendarWidth) || 11 + typeof scrollArea.calendarWidth !== 'undefined' ? scrollArea.calendarWidth : 0,
                height: 11 + (typeof scrollArea.calendarHeight !== 'undefined' ? scrollArea.calendarHeight : 0),
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
                      onPreviewChange={onPreviewChange || this.updatePreview}
                      onMouseLeave={() => onPreviewChange && onPreviewChange()}
                      styles={this.styles}
                      style={
                        isVertical
                          ? { height: this.estimateMonthSize(index) }
                          : { height: scrollArea.monthHeight, width: this.estimateMonthSize(index) }
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
              const monthStep = this.props.calendarFocus === 'backwards'
                ? subMonths(this.state.focusedDate, this.props.months - 1 - i)
                : addMonths(this.state.focusedDate, i);
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
                  onMouseLeave={() => onPreviewChange && onPreviewChange()}
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

export default Calendar;
