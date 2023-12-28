import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import coreStyles from '../../styles';
import { findNextRangeIndex, generateStyles, restrictMinMaxDate } from '../../utils';
import DateRange from '../DateRange';
import DefinedRange from '../DefinedRange';

class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    const ranges = restrictMinMaxDate(props.ranges, props.minDate, props.maxDate);
    this.state = {
      focusedRange: [findNextRangeIndex(ranges), 0],
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  render() {
    const { focusedRange } = this.state;
    const ranges = restrictMinMaxDate(this.props.ranges, this.props.minDate, this.props.maxDate);
    return (
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        <DefinedRange
          focusedRange={focusedRange}
          onPreviewChange={value =>
            this.dateRange.updatePreview(
              value ? this.dateRange.calcNewSelection(value, typeof value === 'string') : null
            )
          }
          {...this.props}
          range={ranges[focusedRange[0]]}
          className={undefined}
        />
        <DateRange
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          focusedRange={focusedRange}
          {...this.props}
          ranges={ranges}
          ref={t => (this.dateRange = t)}
          className={undefined}
        />
      </div>
    );
  }
}

DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string,
};

export default DateRangePicker;
