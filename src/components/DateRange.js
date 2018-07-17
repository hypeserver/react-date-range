import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar.js';
import { rangeShape } from './DayCell';
import { findNextRangeIndex, generateStyles } from '../utils.js';
import { isBefore, differenceInCalendarDays, addDays, min, isWithinInterval } from 'date-fns';
import classnames from 'classnames';
import coreStyles from '../styles';

class DateRange extends Component {
  constructor(props, context) {
    super(props, context);
    this.setSelection = this.setSelection.bind(this);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.calcNewSelection = this.calcNewSelection.bind(this);
    this.state = {
      focusedRange: props.initialFocusedRange || [findNextRangeIndex(props.ranges), 0],
      preview: null,
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  calcNewSelection(value, isSingleValue = true) {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const { ranges, onChange, maxDate, moveRangeOnFirstSelection, disabledDates } = this.props;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange || !onChange) return {};

    let { startDate, endDate } = selectedRange;
    if (!endDate) endDate = new Date(startDate);
    let nextFocusRange;
    if (!isSingleValue) {
      startDate = value.startDate;
      endDate = value.endDate;
    } else if (focusedRange[1] === 0) {
      // startDate selection
      const dayOffset = differenceInCalendarDays(endDate, startDate);
      startDate = value;
      endDate = moveRangeOnFirstSelection ? addDays(value, dayOffset) : value;
      if (maxDate) endDate = min([endDate, maxDate]);
      nextFocusRange = [focusedRange[0], 1];
    } else {
      endDate = value;
    }

    // reverse dates if startDate before endDate
    let hasBeenReversed = false;
    if (isBefore(endDate, startDate)) {
      hasBeenReversed = true;
      [startDate, endDate] = [endDate, startDate];
    }

    const inValidDatesWithinRange = disabledDates.filter(disabledDate =>
      isWithinInterval(disabledDate, {
        start: startDate,
        end: endDate,
      })
    );

    if (inValidDatesWithinRange.length > 0) {
      if (hasBeenReversed) {
        const minDate = new Date(Math.min.apply(null, inValidDatesWithinRange));
        startDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);
      } else {
        const maxDate = new Date(Math.max.apply(null, inValidDatesWithinRange));
        endDate = new Date(maxDate.getTime() - 24 * 60 * 60 * 1000);
      }
    }

    if (!nextFocusRange) {
      const nextFocusRangeIndex = findNextRangeIndex(this.props.ranges, focusedRange[0]);
      nextFocusRange = [nextFocusRangeIndex, 0];
    }
    return {
      wasValid: !(inValidDatesWithinRange.length > 0),
      range: { startDate, endDate },
      nextFocusRange: nextFocusRange,
    };
  }
  setSelection(value, isSingleValue) {
    const { onChange, ranges, onRangeFocusChange } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange) return;
    const newSelection = this.calcNewSelection(value, isSingleValue);
    onChange({
      [selectedRange.key || `range${focusedRangeIndex + 1}`]: {
        ...selectedRange,
        ...newSelection.range,
      },
    });
    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null,
    });
    onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
  }
  handleRangeFocusChange(focusedRange) {
    this.setState({ focusedRange });
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  }
  updatePreview(val) {
    if (!val || !val.wasValid) {
      this.setState({ preview: null });
      return;
    }
    const { rangeColors, ranges } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]] || color;
    this.setState({ preview: { ...val.range, color } });
  }
  render() {
    return (
      <Calendar
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        onPreviewChange={value => {
          this.updatePreview(value ? this.calcNewSelection(value) : null);
        }}
        {...this.props}
        displayMode="dateRange"
        className={classnames(this.styles.dateRangeWrapper, this.props.className)}
        onChange={this.setSelection}
        updateRange={val => this.setSelection(val, false)}
        ref={target => {
          this.calendar = target;
        }}
      />
    );
  }
}

DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: [],
};

DateRange.propTypes = {
  ...Calendar.propTypes,
  onChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  className: PropTypes.string,
  ranges: PropTypes.arrayOf(rangeShape),
  moveRangeOnFirstSelection: PropTypes.bool,
};

export default DateRange;
