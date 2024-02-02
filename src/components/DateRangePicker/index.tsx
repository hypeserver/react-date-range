import React from 'react';
import { DateRangeProps } from '../DateRange';
import DefinedRange, { DefinedRangeProps } from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import Styles from '../../styles';
import classnames from 'classnames';
import DateRange from '../DateRange';

export type DateRangePickerProps = DateRangeProps & DefinedRangeProps;


export default function DateRangePicker({
  weekStartsOn,
  weekdayDisplayFormat,
  editableDateInputs,
  endDatePlaceholder,
  rangeColors,
  ranges,
  renderStaticRangeLabel,
  retainEndDateOnFirstSelection,
  showMonthAndYearPickers,
  updateRange,
  initialFocusedRange,
  ariaLabels,
  scroll,
  showDateDisplay,
  showMonthArrow,
  showPreview,
  shownDate,
  startDatePlaceholder,
  date,
  dateDisplayFormat,
  dayContentRenderer,
  dayDisplayFormat,
  direction,
  disabledDates,
  disabledDay,
  displayMode,
  dragSelectionEnabled,
  fixedHeight,
  focusedRange,
  onChange,
  footerContent,
  headerContent,
  locale,
  calendarFocus,
  className,
  classNames,
  color,
  maxDate,
  minDate,
  monthDisplayFormat,
  months,
  moveRangeOnFirstSelection,
  preventScrollToFocusedMonth
}: DateRangePickerProps) {

  const refs = React.useRef({
    styles: generateStyles([Styles, classNames])
  });

  const [state, setState] = React.useState({
    focusedRange: [findNextRangeIndex(ranges), 0],
    rangePreview: undefined
  });


  return (
    <div className={classnames(refs.current.styles.dateRangePickerWrapper, className)}>
      <DefinedRange
        focusedRange={focusedRange || state.focusedRange}
        rangeColors={rangeColors}
        onChange={onChange}
        ranges={ranges}
        renderStaticRangeLabel={renderStaticRangeLabel}
        headerContent={headerContent}
        footerContent={footerContent}
      />
      <DateRange
        onRangeFocusChange={focusedRange => setState(s => ({...s, focusedRange}))}
        focusedRange={focusedRange || state.focusedRange}
        weekStartsOn={weekStartsOn}
        weekdayDisplayFormat={weekdayDisplayFormat}
        editableDateInputs={editableDateInputs}
        endDatePlaceholder={endDatePlaceholder}
        rangeColors={rangeColors}
        ranges={ranges}
        retainEndDateOnFirstSelection={retainEndDateOnFirstSelection}
        showMonthAndYearPickers={showMonthAndYearPickers}
        updateRange={updateRange}
        initialFocusedRange={initialFocusedRange}
        ariaLabels={ariaLabels}
        scroll={scroll}
        showDateDisplay={showDateDisplay}
        showMonthArrow={showMonthArrow}
        onChange={onChange}
        showPreview={showPreview}
        shownDate={shownDate}
        startDatePlaceholder={startDatePlaceholder}
        date={date}
        dateDisplayFormat={dateDisplayFormat}
        dayContentRenderer={dayContentRenderer}
        dayDisplayFormat={dayDisplayFormat}
        direction={direction}
        disabledDates={disabledDates}
        disabledDay={disabledDay}
        displayMode={displayMode}
        dragSelectionEnabled={dragSelectionEnabled}
        fixedHeight={fixedHeight}
        locale={locale}
        calendarFocus={calendarFocus}
        previewRange={state.rangePreview}
        classNames={classNames}
        color={color}
        maxDate={maxDate}
        minDate={minDate}
        monthDisplayFormat={monthDisplayFormat}
        months={months}
        moveRangeOnFirstSelection={moveRangeOnFirstSelection}
        preventScrollToFocusedMonth={preventScrollToFocusedMonth}
      />
    </div>
  )

}