import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRange, { DateRangeProps } from '../DateRange';
import DefinedRange, { DefinedRangeProps } from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles from '../../styles';
import { DateRange as DateRangeObject  } from '../../utilsTypes';
import { Preview, Styles } from '../DayCell/types';


interface DateRangePickerProps extends DateRangeProps, DefinedRangeProps  {
  classNames: string[]
  ranges: DateRangeObject[]
  className: string
  styles: Styles
}

interface DateRangePickerState {
  focusedRange: number[]
}


class DateRangePicker extends Component<DateRangePickerProps, DateRangePickerState> {
  static propTypes: any;
  static defaultProps: Styles;

  styles: Styles;
  // FIXME
  dateRange?: DateRange | null;

  constructor(props: DateRangePickerProps) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  render() {
    const { focusedRange } = this.state;
    return (
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        <DefinedRange
          {...this.props}
          focusedRange={focusedRange}
          onPreviewChange={value =>
            value && this.dateRange?.updatePreview(
              this.dateRange?.calcNewSelection(value, typeof value === 'string')
            )
          }
        />
        <DateRange
          {...this.props}
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          focusedRange={focusedRange}
          ref={t => (this.dateRange = t)}
        />
      </div>
    );
  }
}

DateRangePicker.propTypes = {
  ...DateRange.propTypes,
  ...DefinedRange.propTypes,
  className: PropTypes.string,
};

export default DateRangePicker;
