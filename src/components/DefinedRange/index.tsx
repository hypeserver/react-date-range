import React, { useState } from 'react';
import styles from '../../styles';
import { defaultInputRangesGen, defaultStaticRangesGen } from '../../defaultRanges';
import InputRangeField from '../InputRangeField';
import classnames from 'classnames';
import { InputRange, InputRangeWihLabel, isSureRange, hasRangeGen, NotFullyEmptyRange, OtherRangeProps, MaybeEmptyRange, RangeFocus, StaticRange, WeekStartsOn } from '../../types';
import { defaultInputRanges, defaultStaticRanges, DEFAULT_WEEK_STARTS_ON } from '../..';

type ComponentProps = {
  className?: string;
  focusedRange?: RangeFocus;
  footerContent?: JSX.Element;
  headerContent?: JSX.Element;
  inputRanges?: InputRangeWihLabel[];
  onChange?: (keyedRange: { [k: string]: MaybeEmptyRange; }) => void;
  onPreviewChange?: (r?: MaybeEmptyRange) => void;
  rangeColors?: string[];
  ranges?: NotFullyEmptyRange[];
  renderStaticRangeLabel?: (r: StaticRange) => JSX.Element;
  staticRanges?: StaticRange[];
  weekStartsOn?: WeekStartsOn;
}
export type DefinedRangeCP = ComponentProps;

type DefaultComponentProps = StaticRangesInputRanges & {
  ranges: NotFullyEmptyRange[];
  rangeColors: string[];
  focusedRange: RangeFocus;
  weekStartsOn: WeekStartsOn;
};
export type DefinedRangeDCP = DefaultComponentProps;

const defaultProps: DefaultComponentProps = {
  ranges: [],
  staticRanges: defaultStaticRanges,
  inputRanges: defaultInputRanges,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0],
  weekStartsOn: DEFAULT_WEEK_STARTS_ON,
};

type StaticRangesInputRanges = {
  staticRanges: StaticRange[];
  inputRanges: InputRangeWihLabel[];
}

function getSelectedRange(ranges: MaybeEmptyRange[], staticRange: StaticRange) {
  const focusedRangeIndex = ranges.findIndex(range => {
    if (!isSureRange<OtherRangeProps>(range) || range.disabled) return false;
    return staticRange.isSelected(range);
  });
  const selectedRange = ranges[focusedRangeIndex];
  return { selectedRange, focusedRangeIndex };
}

const handleRangeChange = (range: MaybeEmptyRange, allProps: ComponentProps) => {
  const { onChange, ranges, focusedRange } = allProps;
  const frange = focusedRange || [0, 0];
  const selectedRange = ranges && ranges[frange[0]];
  if (!onChange || !selectedRange) return;
  onChange({
    [selectedRange.key || `range${frange[0] + 1}`]: { ...selectedRange, ...range },
  });
}

const getRangeOptionValue = (option: InputRange, allProps: ComponentProps) => {
    const { ranges = [], focusedRange = [] } = allProps;

    if (typeof option.getCurrentValue !== 'function') return '';

    const selectedRange = (focusedRange[0] && ranges[focusedRange[0]]) || {};
    return option.getCurrentValue(selectedRange) || '';
  }

const DefinedRange: React.FC<ComponentProps> = (props) => {
  const allProps: ComponentProps = { ...defaultProps, ...props };

  const weekStartsOn = allProps.weekStartsOn !== undefined && allProps.weekStartsOn || DEFAULT_WEEK_STARTS_ON;
  // commented out by g because unused
  // const [rangeOffset, setRangeOffset] = useState<number>(0);
  // const [focusedInput, setFocusedInput] = useState<number>(-1);
  const [rangesRespectingWeekStartsOn,] = useState<StaticRangesInputRanges>((allProps.weekStartsOn !== undefined && allProps.weekStartsOn !== DEFAULT_WEEK_STARTS_ON)
    ? {
      staticRanges: defaultStaticRangesGen({ weekStartsOn }),
      inputRanges: defaultInputRangesGen({ weekStartsOn }),
    }
    : {
      staticRanges: allProps.staticRanges || defaultStaticRanges,
      inputRanges: allProps.inputRanges || defaultInputRanges,
    }
  );

  const {
    className,
    footerContent,
    headerContent,
    onPreviewChange,
    rangeColors,
    ranges,
    renderStaticRangeLabel,
  } = allProps;

  const {
    inputRanges,
    staticRanges,
  } = rangesRespectingWeekStartsOn;

  return (
    <div className={classnames(styles.definedRangesWrapper, className)}>
      {headerContent}
      <div className={styles.staticRanges}>
        {staticRanges.map((staticRange, i) => {
          const { selectedRange, focusedRangeIndex } = getSelectedRange(ranges || [], staticRange);
          if (staticRange.hasCustomRendering && !renderStaticRangeLabel) {
            throw new Error('You should provie a renderStaticRangeLabel function when setting staticRange.hasCustomRendering = true');
          }
          if (!staticRange.label && !renderStaticRangeLabel) {
            throw new Error('Either provie a range with a label property or a renderStaticRangeLabel function to this component');
          }
          const labelContent = renderStaticRangeLabel && staticRange.hasCustomRendering
            ? renderStaticRangeLabel(staticRange)
            : staticRange.label;
          const actualStaticRange = hasRangeGen(staticRange) ? staticRange.range(allProps) : staticRange.range as MaybeEmptyRange;

          return (
            <button
              type="button"
              className={classnames(styles.staticRange, {
                [styles.staticRangeSelected]: Boolean(selectedRange),
              })}
              style={{
                color: selectedRange
                  ? selectedRange.color || (rangeColors && rangeColors[focusedRangeIndex])
                  : undefined,
              }}
              key={i}
              onClick={() => handleRangeChange(actualStaticRange, allProps)}
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
            // commented out by g because unused
            // onFocus={() => { setFocusedInput(i), setRangeOffset(0) }}
            // onBlur={() => setRangeOffset(0)}
            onFocus={() => {}}
            onBlur={() => {}}
            onChange={value => handleRangeChange(rangeOption.range(value, allProps), allProps)}
            value={getRangeOptionValue(rangeOption, allProps)}
          />
        ))}
      </div>
      {footerContent}
    </div>
  );
}

export default DefinedRange;
