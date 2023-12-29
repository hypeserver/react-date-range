import cx from 'classnames';
import * as dateFns from 'date-fns';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { defaultInputRanges, defaultStaticRanges } from '../../defaultRanges';
import styles from '../../styles';
import { restrictMinMaxDate } from '../../utils';
import { rangeShape } from '../DayCell';
import InputRangeField from '../InputRangeField';

class DefinedRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
  }

  handleRangeChange = range => {
    const { onChange, ranges, focusedRange, minDate, maxDate } = this.props;
    const selectedRange = ranges[focusedRange[0]];
    if (!onChange || !selectedRange) {
      return;
    }
    const newRange = restrictMinMaxDate([range], minDate, maxDate)[0];
    onChange({
      [selectedRange.key || `range${focusedRange[0] + 1}`]: { ...selectedRange, ...newRange },
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
      minDate,
      maxDate,
    } = this.props;

    const validStaticRanges = staticRanges.filter(staticRange => {
      const rangeValue = staticRange.range(this.props);
      if (rangeValue && maxDate && dateFns.isAfter(rangeValue.startDate, maxDate)) {
        return false;
      }
      if (rangeValue && minDate && dateFns.isBefore(rangeValue.endDate, minDate)) {
        return false;
      }
      return true;
    });

    const validInputRanges = inputRanges.filter(rangeOption => {
      const value = this.getRangeOptionValue(rangeOption);
      const rangeValue = rangeOption.range(value, this.props);
      const isStartDateValid = dateFns.isValid(rangeValue.startDate);
      const isEndDateValid = dateFns.isValid(rangeValue.endDate);

      if (rangeValue && minDate && isStartDateValid && dateFns.isBefore(rangeValue.startDate, minDate)) {
        return false;
      }
      if (rangeValue && maxDate && isStartDateValid && dateFns.isAfter(rangeValue.startDate, maxDate)) {
        return false;
      }
      if (rangeValue && maxDate && isEndDateValid && dateFns.isAfter(rangeValue.endDate, maxDate)) {
        return false;
      }
      if (rangeValue && minDate && isEndDateValid && dateFns.isBefore(rangeValue.endDate, minDate)) {
        return false;
      }
      return true;
    });

    if (validInputRanges.length === 0 && validStaticRanges.length === 0) {
      return null;
    }

    return (
      <div className={cx(styles.definedRangesWrapper, className)}>
        {headerContent}
        <div className={styles.staticRanges}>
          {validStaticRanges.map((staticRange, i) => {
            const { selectedRange, focusedRangeIndex } = this.getSelectedRange(ranges, staticRange);
            let labelContent;

            if (staticRange.hasCustomRendering) {
              labelContent = renderStaticRangeLabel(staticRange);
            } else {
              labelContent = staticRange.label;
            }
            const rangeValue = staticRange.range(this.props);
            return (
              <button
                type="button"
                className={cx(styles.staticRange, {
                  [styles.staticRangeSelected]: Boolean(selectedRange),
                })}
                style={{
                  color: selectedRange ? selectedRange.color || rangeColors[focusedRangeIndex] : null,
                }}
                key={i}
                onClick={() => this.handleRangeChange(rangeValue)}
                onFocus={() => onPreviewChange && onPreviewChange(rangeValue)}
                onMouseOver={() => onPreviewChange && onPreviewChange(rangeValue)}
                onMouseLeave={() => {
                  onPreviewChange && onPreviewChange();
                }}
              >
                <span tabIndex={-1} className={styles.staticRangeLabel}>
                  {labelContent}
                </span>
              </button>
            );
          })}
        </div>
        <div className={styles.inputRanges}>
          {validInputRanges.map((rangeOption, i) => (
            <InputRangeField
              key={i}
              styles={styles}
              label={rangeOption.label}
              onFocus={() => this.setState({ focusedInput: i, rangeOffset: 0 })}
              onBlur={() => this.setState({ rangeOffset: 0 })}
              onChange={newValue => this.handleRangeChange(rangeOption.range(newValue, this.props))}
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
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
};

DefinedRange.defaultProps = {
  inputRanges: defaultInputRanges,
  staticRanges: defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0],
};

export default DefinedRange;
