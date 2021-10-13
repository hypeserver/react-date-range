import React, { Component } from 'react';
import styles from '../../styles';
import { defaultInputRangesGen, defaultStaticRangesGen } from '../../defaultRanges';
import InputRangeField from '../InputRangeField';
import cx from 'classnames';
import { InputRange, InputRangeWihLabel, isSureRange, isWithRangeGen, MaybeMaybeRange, OtherRangeProps, Range, RangeFocus, StaticRange, WeekStartsOn } from '../../types';

type ComponentProps = {
  className?: string;
  focusedRange: RangeFocus;
  footerContent?: JSX.Element;
  headerContent?: JSX.Element;
  inputRanges: InputRangeWihLabel[];
  onChange?: (keyedRange: { [k: string]: Range; }) => void;
  onPreviewChange?: (r?: Range) => void;
  rangeColors: string[];
  ranges: MaybeMaybeRange[];
  renderStaticRangeLabel?: (r: StaticRange) => JSX.Element;
  staticRanges: StaticRange[];
  weekStartsOn: WeekStartsOn;
}

export type DefinedRangeProps = ComponentProps;

class DefinedRange extends Component<ComponentProps> {

  public static defaultProps = {
    ranges: [],
    inputRanges: [],
    staticRanges: [],
    rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
    focusedRange: [0, 0],
    weekStartsOn: 1,
  };
  // dateOptions: { weekStartsOn: any; inputRanges: InputRangeWihLabel[]; staticRanges: StaticRange[]; };

  constructor(props: ComponentProps) {
    super(props);
    // const weekStartsOn = this.props.weekStartsOn !== undefined ? this.props.weekStartsOn : 0;
    // this.dateOptions = {
    //   weekStartsOn,
    //   inputRanges:
    //     this.props.inputRanges !== undefined ? this.props.inputRanges : defaultInputRangesGen({ weekStartsOn }),
    //   staticRanges:
    //     this.props.staticRanges !== undefined
    //       ? this.props.staticRanges
    //       : defaultStaticRangesGen({ weekStartsOn }),
    // };
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
  }

  handleRangeChange = (range: Range) => {
    const { onChange, ranges, focusedRange } = this.props;
    const selectedRange = ranges[focusedRange[0]];
    if (!onChange || !selectedRange) return;
    onChange({
      [selectedRange.key || `range${focusedRange[0] + 1}`]: { ...selectedRange, ...range },
    });
  }

  getRangeOptionValue(option: InputRange) {
    const { ranges = [], focusedRange = [] } = this.props;

    if (typeof option.getCurrentValue !== 'function') {
      return '';
    }

    const selectedRange = (focusedRange[0] && ranges[focusedRange[0]]) || {};
    if (!isSureRange(selectedRange)) {
      throw new Error('Bug, expecting sure range at this stage');
    }
    return option.getCurrentValue(selectedRange) || '';
  }

  getSelectedRange(ranges: Range[], staticRange: StaticRange) {
    const focusedRangeIndex = ranges.findIndex(range => {
      if (!isSureRange<OtherRangeProps>(range) || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return { selectedRange, focusedRangeIndex };
  }

  render() {
    const {
      className,
      footerContent,
      headerContent,
      inputRanges,
      onPreviewChange,
      rangeColors,
      ranges,
      renderStaticRangeLabel,
      staticRanges,
    } = this.props;

    console.log('ir', inputRanges);
    console.log('sr', staticRanges);

    return (
      <div className={cx(styles.definedRangesWrapper, className)}>
        {headerContent}
        <div className={styles.staticRanges}>
          {staticRanges.map((staticRange, i) => {
            const { selectedRange, focusedRangeIndex } = this.getSelectedRange(ranges, staticRange);
            if (staticRange.hasCustomRendering && !renderStaticRangeLabel) {
              throw new Error('You should provie a renderStaticRangeLabel function when setting staticRange.hasCustomRendering = true');
            }
            if (!staticRange.label && !renderStaticRangeLabel) {
              throw new Error('Either provie a range with a label property or a renderStaticRangeLabel function to this component');
            }
            const labelContent = renderStaticRangeLabel && staticRange.hasCustomRendering
              ? renderStaticRangeLabel(staticRange)
              : staticRange.label;
            const actualStaticRange = isWithRangeGen(staticRange) ? staticRange.range(this.props) : staticRange.range as Range;

            return (
              <button
                type="button"
                className={cx(styles.staticRange, {
                  [styles.staticRangeSelected]: Boolean(selectedRange),
                })}
                style={{
                  color: selectedRange
                    ? selectedRange.color || rangeColors[focusedRangeIndex]
                    : undefined,
                }}
                key={i}
                onClick={() => this.handleRangeChange(actualStaticRange)}
                onFocus={() => onPreviewChange && onPreviewChange(actualStaticRange)}
                onMouseOver={() =>
                  onPreviewChange && onPreviewChange(actualStaticRange)
                }
                onMouseLeave={() => {
                  onPreviewChange && onPreviewChange();
                }}>
                <span tabIndex={-1} className={styles.staticRangeLabel}>
                  {labelContent}
                </span>
              </button>
            );
          })}
        </div>
        <div className={styles.inputRanges}>
          {inputRanges.map((rangeOption, i) => (
            <InputRangeField
              key={i}
              styles={styles}
              label={rangeOption.label}
              onFocus={() => this.setState({ focusedInput: i, rangeOffset: 0 })}
              onBlur={() => this.setState({ rangeOffset: 0 })}
              onChange={value => this.handleRangeChange(rangeOption.range(value, this.props))}
              value={this.getRangeOptionValue(rangeOption)}
            />
          ))}
        </div>
        {footerContent}
      </div>
    );
  }
}

export default DefinedRange;
