import React, { useState } from 'react';
import DateRange from '../DateRange';
import DefinedRange, { DefinedRangeCP } from '../DefinedRange';
import { findNextRangeIndex, generateStyles } from '../../utils';
import classnames from 'classnames';
import coreStyles from '../../styles';
import { DateRangeProps, MaybeEmptyRange, RangeFocus } from '../../types';

type ComponentDefaultProps = {
  className?: string,
}
export type DateRangePickerCDP = ComponentDefaultProps;

type ComponentProps = DateRangeProps & DefinedRangeCP & ComponentDefaultProps;
export type DateRangePickerCP = ComponentProps;

const defaultProps: ComponentDefaultProps = {
  className: '',
}

const DateRangePicker: React.FC<ComponentProps> = (props) => {

  const allProps: ComponentProps = { ...defaultProps, ...props };
  const { classNames, className, ranges } = allProps;
  const styles = generateStyles([coreStyles, classNames]);
  const [focusedRange, setFocusedRange] = useState<RangeFocus>((props.ranges && [findNextRangeIndex(props.ranges), 0]) || [0, 0])
  const usableFocusedRange = allProps.focusedRange || focusedRange;
  const [nextPreviewRange, setNextPreviewRange] = useState<MaybeEmptyRange | undefined>();
  const onPreviewChange = allProps.onPreviewChange || setNextPreviewRange;

  return (
    <div className={classnames(styles.dateRangePickerWrapper, className)}>
      <DefinedRange
        {...allProps}
        focusedRange={usableFocusedRange}
        onPreviewChange={onPreviewChange}
        // range={this.props.ranges[focusedRange[0]]}
        ranges={ranges} // replaces the single range above (added by g)
      />
      <DateRange
        nextPreviewRange={nextPreviewRange}
        onRangeFocusChange={setFocusedRange}
        {...allProps}
        focusedRange={usableFocusedRange}
      />
    </div>
  );
}

export default DateRangePicker;
