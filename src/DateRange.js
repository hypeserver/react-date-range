import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar.js';
import { findNextRangeIndex, generateStyles } from './utils.js';
import { isBefore, differenceInCalendarDays, addDays, min } from 'date-fns';
import classnames from 'classnames';
import coreStyles from './styles';

class DateRange extends Component {
  constructor(props, context) {
    super(props, context);
    this.setSelection = this.setSelection.bind(this);
    this.handleRangeFocusChange = this.handleRangeFocusChange.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
    this.calcNewSelection = this.calcNewSelection.bind(this);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
      preview: null,
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  calcNewSelection(value) {
    const { focusedRange } = this.state;
    const { ranges, onChange, maxDate, moveRangeOnFirstSelection } = this.props;
    const selectedRangeIndex = focusedRange[0];
    const selectedRange = ranges[selectedRangeIndex];
    if (!selectedRange || !onChange) return {};

    let { startDate, endDate } = selectedRange;
    if (!endDate) endDate = new Date(startDate);
    let nextFocusRange;
    if (focusedRange[1] === 0) {
      // startDate selection
      const dayOffset = differenceInCalendarDays(endDate, startDate);
      startDate = value;
      endDate = moveRangeOnFirstSelection ? addDays(value, dayOffset) : value;
      if (maxDate) endDate = min([endDate, maxDate]);
      nextFocusRange = [focusedRange[0], 1];
    } else {
      endDate = value;
      // reverse dates if startDate before endDate
      if (isBefore(value, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      const nextFocusRangeIndex = findNextRangeIndex(this.props.ranges, focusedRange[0]);
      nextFocusRange = [nextFocusRangeIndex, 0];
    }
    return {
      range: { startDate, endDate },
      nextFocusRange: nextFocusRange,
    };
  }
  setSelection(value) {
    const { onChange, ranges } = this.props;
    const { focusedRange } = this.state;
    const selectedRangeIndex = focusedRange[0];
    const selectedRange = ranges[selectedRangeIndex];
    const newSelection = this.calcNewSelection(value);
    if (!selectedRange) return;
    onChange({
      [selectedRange.key || `range${selectedRangeIndex + 1}`]: newSelection.range,
    });
    this.setState({
      focusedRange: newSelection.nextFocusRange,
      preview: null,
    });
  }
  handleRangeFocusChange(focusedRange) {
    this.setState({ focusedRange });
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  }
  updatePreview(val) {
    this.setState({ preview: val });
  }
  render() {
    const selectedRange = this.props.ranges[this.state.focusedRange[0]] || {};
    return (
      <Calendar
        {...this.props}
        displayMode="dateRange"
        className={classnames(this.styles.dateRangeWrapper, this.props.className)}
        onChange={this.setSelection}
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        previewColor={selectedRange.color}
        onPreviewChange={value => {
          this.updatePreview(value ? this.calcNewSelection(value).range : null);
        }}
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
};

DateRange.propTypes = {
  ...Calendar.propTypes,
  onChange: PropTypes.func,
  onRangeFocusChange: PropTypes.func,
  className: PropTypes.string,
  ranges: Calendar.propTypes.ranges,
  moveRangeOnFirstSelection: PropTypes.bool,
};

export default DateRange;
