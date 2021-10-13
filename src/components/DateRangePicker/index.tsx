import React, { Component } from 'react';
import DateRange from '../DateRange';
import DefinedRange, { DefinedRangeProps } from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles, { ClassNames } from '../../styles';
import { DateRangeProps, RangeFocus } from '../../types';

type ComponentProps = DateRangeProps & DefinedRangeProps & {
  className: string,
};

type ComponentState = { focusedRange: RangeFocus; };

class DateRangePicker extends Component<ComponentProps, ComponentState> {
  dateRange: any;
  styles: Partial<ClassNames>;

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      focusedRange: [findNextRangeIndex(props.ranges), 0],
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  render() {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const onPreviewChange = this.props.onPreviewChange || (value =>
      this.dateRange.updatePreview(
        value ? this.dateRange.calcNewSelection(value, typeof value === 'string') : null
      )
    )
    return (
      <div className={classnames(this.styles.dateRangePickerWrapper, this.props.className)}>
        <DefinedRange
          {...this.props}
          focusedRange={focusedRange}
          onPreviewChange={onPreviewChange}
          // range={this.props.ranges[focusedRange[0]]}
          ranges={this.props.ranges} // replaces the single range above (added by g)
          className={undefined}
        />
        <DateRange
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          {...this.props}
          focusedRange={focusedRange}
          ref={t => (this.dateRange = t)}
          className={undefined}
        />
      </div>
    );
  }
}

export default DateRangePicker;
