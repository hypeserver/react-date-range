import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { defaultInputRanges, defaultStaticRanges } from '../../defaultRanges';
import { rangeShape } from '../DayCell';
import InputRangeField from '../InputRangeField';
import cx from 'classnames';

class DefinedRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
  }

  handleRangeChange = range => {
    const { onChange, ranges, focusedRange } = this.props;
    const selectedRange = ranges[focusedRange[0]];
    if (!onChange || !selectedRange) return;
    onChange({
      [selectedRange.key || `range${focusedRange[0] + 1}`]: { ...selectedRange, ...range },
    });
  };

  getRangeOptionValue(option) {
    const { ranges = [], focusedRange = [] } = this.props;

    if (typeof option.getCurrentValue !== 'function') {
      return '';
    }

    const selectedRange = ranges[focusedRange[0]] || {};
    return option.getCurrentValue(selectedRange) || '';
  }

  getSelectedRange(ranges, staticRange) {
    const focusedRangeIndex = ranges.findIndex(range => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return { selectedRange, focusedRangeIndex };
  }

  render() {
    const {
      headerContent,
      footerContent,
      onPreviewChange,
      inputRanges,
      staticRanges,
      ranges,
      renderStaticRangeLabel,
      rangeColors,
      className,
    } = this.props;

    return (
      <div className={cx(styles.definedRangesWrapper, className)}>
        {headerContent}
        <div className={styles.staticRanges}>
          {staticRanges.map((staticRange, i) => {
            const { selectedRange, focusedRangeIndex } = this.getSelectedRange(ranges, staticRange);
            let labelContent;

            if (staticRange.hasCustomRendering) {
              labelContent = renderStaticRangeLabel(staticRange);
            } else {
              labelContent = staticRange.label;
            }

            return (
              <button
                type="button"
                className={cx(styles.staticRange, {
                  [styles.staticRangeSelected]: Boolean(selectedRange),
                })}
                style={{
                  color: selectedRange
                    ? selectedRange.color || rangeColors[focusedRangeIndex]
                    : null,
                }}
                key={i}
                onClick={() => this.handleRangeChange(staticRange.range(this.props))}
                onFocus={() => onPreviewChange && onPreviewChange(staticRange.range(this.props))}
                onMouseOver={() =>
                  onPreviewChange && onPreviewChange(staticRange.range(this.props))
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

DefinedRange.propTypes = {
  inputRanges: PropTypes.array,
  staticRanges: PropTypes.array,
  ranges: PropTypes.arrayOf(rangeShape),
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  onPreviewChange: PropTypes.func,
  onChange: PropTypes.func,
  footerContent: PropTypes.any,
  headerContent: PropTypes.any,
  rangeColors: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  renderStaticRangeLabel: PropTypes.func,
};

DefinedRange.defaultProps = {
  inputRanges: defaultInputRanges,
  staticRanges: defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0],
};

export default DefinedRange;
