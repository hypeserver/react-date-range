import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import coreStyles from '../../styles';
import { calcNewSelection, findNextRangeIndex, generateStyles, restrictMinMaxDate } from '../../utils';
import Calendar from '../Calendar';
import { rangeShape } from '../DayCell';

class DateRange extends Component {
  constructor(props, context) {
    super(props, context);
    const ranges = restrictMinMaxDate(props.ranges, props.minDate, props.maxDate);
    this.state = {
      focusedRange: props.initialFocusedRange || [findNextRangeIndex(ranges), 0],
      preview: null,
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  calcNewSelection = (value, isSingleValue = true) => {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const {
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      retainEndDateOnFirstSelection,
      disabledDates,
      ranges,
    } = this.props;
    const correctRanges = restrictMinMaxDate(ranges, this.props.minDate, this.props.maxDate);

    return calcNewSelection(
      value,
      isSingleValue,
      focusedRange,
      correctRanges,
      onChange,
      maxDate,
      moveRangeOnFirstSelection,
      retainEndDateOnFirstSelection,
      disabledDates
    );
  };
  setSelection = (value, isSingleValue) => {
    const ranges = restrictMinMaxDate(this.props.ranges, this.props.minDate, this.props.maxDate);
    const { onChange, onRangeFocusChange } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const focusedRangeIndex = focusedRange[0];
    const selectedRange = ranges[focusedRangeIndex];
    if (!selectedRange) {
      return;
    }
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
  };
  handleRangeFocusChange = focusedRange => {
    this.setState({ focusedRange });
    this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
  };
  updatePreview = val => {
    if (!val) {
      this.setState({ preview: null });
      return;
    }
    const { rangeColors } = this.props;
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const ranges = restrictMinMaxDate(this.props.ranges, this.props.minDate, this.props.maxDate);
    const color = ranges[focusedRange[0]]?.color || rangeColors[focusedRange[0]] || color;
    this.setState({ preview: { ...val.range, color } });
  };
  render() {
    const ranges = restrictMinMaxDate(this.props.ranges, this.props.minDate, this.props.maxDate);
    return (
      <Calendar
        focusedRange={this.state.focusedRange}
        onRangeFocusChange={this.handleRangeFocusChange}
        preview={this.state.preview}
        onPreviewChange={value => {
          this.updatePreview(value ? this.calcNewSelection(value) : null);
        }}
        {...this.props}
        ranges={ranges}
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
  retainEndDateOnFirstSelection: false,
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
  retainEndDateOnFirstSelection: PropTypes.bool,
};

export default DateRange;
