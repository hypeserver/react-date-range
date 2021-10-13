import React, { Component } from 'react';
import DateRange from '../DateRange';
import DefinedRange, { DefinedRangeProps } from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles, { ClassNames } from '../../styles';
import { DateRangeProps, RangeFocus } from '../../types';

type ComponentDefaultProps = {
  className?: string,
}

type ComponentProps = DateRangeProps & DefinedRangeProps & ComponentDefaultProps;

type ComponentState = { focusedRange: RangeFocus; };

class DateRangePicker extends Component<ComponentProps, ComponentState> {
  dateRange: DateRange | null = null;
  styles: Partial<ClassNames>;
  public static defaultProps: ComponentDefaultProps = {
    className: '',
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      focusedRange: (props.ranges && [findNextRangeIndex(props.ranges), 0]) || [0, 0],
    };
    this.styles = generateStyles([coreStyles, props.classNames]);
  }
  render() {
    const focusedRange = this.props.focusedRange || this.state.focusedRange;
    const onPreviewChange = this.props.onPreviewChange || (value =>
      this.dateRange?.updatePreview(
        value
          ? this.dateRange?.calcNewSelection(value)
          : undefined
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
        />
        <DateRange
          onRangeFocusChange={focusedRange => this.setState({ focusedRange })}
          {...this.props}
          focusedRange={focusedRange}
          ref={t => (this.dateRange = t)}
        />
      </div>
    );
  }
}

export default DateRangePicker;
