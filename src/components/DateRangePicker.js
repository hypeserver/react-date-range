import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import DefinedRanges from './DefinedRanges';
import { findNextRangeIndex, generateStyles } from '../utils.js';
import classnames from 'classnames';
import coreStyles from '../styles';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  handleChange(range) {
    const { focusedRange } = this.state;
    const { ranges, onChange } = this.props;
    const selectedRangeIndex = focusedRange[0];
    const selectedRange = ranges[selectedRangeIndex];
    if (!selectedRange || !onChange) return;
    onChange({
      [selectedRange.key || `range${selectedRangeIndex + 1}`]: range,
    });
  }
  render() {
    const focusedRangeIndex = this.state.focusedRange[0];
    return (
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        <DefinedRanges
          {...this.props}
          range={this.props.ranges[focusedRangeIndex] || {}}
          onChange={this.handleChange}
          onPreviewChange={value => {
            this.dateRange.updatePreview(value);
          }}
          focusedRangeIndex={focusedRangeIndex}
          className={undefined}
        />
        <DateRange
          {...this.props}
          ref={t => {
            this.dateRange = t;
          }}
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          className={undefined}
        />
      </div>
    );
  }
}

DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRanges.propTypes,
  className: PropTypes.string,
};

export default DateRangePicker;
