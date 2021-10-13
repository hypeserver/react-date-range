import React, { Component } from 'react';
import styles from '../../styles';
import { defaultInputRangesGen, defaultStaticRangesGen } from '../../defaultRanges';
import InputRangeField from '../InputRangeField';
import cx from 'classnames';
import { InputRange, InputRangeWihLabel, isSureRange, isWithRangeGen, NotFullyEmptyRange, OtherRangeProps, MaybeEmptyRange, RangeFocus, StaticRange, WeekStartsOn } from '../../types';
import { defaultInputRanges, defaultStaticRanges } from '../..';

type ComponentProps = {
  className?: string;
  focusedRange: RangeFocus;
  footerContent?: JSX.Element;
  headerContent?: JSX.Element;
  inputRanges: InputRangeWihLabel[];
  onChange?: (keyedRange: { [k: string]: MaybeEmptyRange; }) => void;
  onPreviewChange?: (r?: MaybeEmptyRange) => void;
  rangeColors: string[];
  ranges: NotFullyEmptyRange[];
  renderStaticRangeLabel?: (r: StaticRange) => JSX.Element;
  staticRanges: StaticRange[];
  weekStartsOn: WeekStartsOn;
}

export type DefinedRangeProps = ComponentProps;

const defaultWeekStartsOn: WeekStartsOn = 0;

class DefinedRange extends Component<ComponentProps> {

  public static defaultProps = {
    ranges: [],
    staticRanges: defaultStaticRanges,
    inputRanges: defaultInputRanges,
    rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
    focusedRange: [0, 0],
    weekStartsOn: defaultWeekStartsOn,
  };

  rangesRespectingWeekStartsOn: {
    staticRanges: StaticRange[];
    inputRanges: InputRangeWihLabel[];
  }

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
    this.rangesRespectingWeekStartsOn = (this.props.weekStartsOn !== defaultWeekStartsOn)
      ? {
        staticRanges: defaultStaticRangesGen(this.props),
        inputRanges: defaultInputRangesGen(this.props),
      }
      : {
        staticRanges: this.props.staticRanges,
        inputRanges: this.props.inputRanges,
      };
  }

  handleRangeChange = (range: MaybeEmptyRange) => {
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
    return option.getCurrentValue(selectedRange) || '';
  }

  getSelectedRange(ranges: MaybeEmptyRange[], staticRange: StaticRange) {
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
      onPreviewChange,
      rangeColors,
      ranges,
      renderStaticRangeLabel,
    } = this.props;

    const {
      inputRanges,
      staticRanges,
    } = this.rangesRespectingWeekStartsOn;

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
            const actualStaticRange = isWithRangeGen(staticRange) ? staticRange.range(this.props) : staticRange.range as MaybeEmptyRange;

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
