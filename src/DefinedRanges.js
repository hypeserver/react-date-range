import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { defaultInputRanges, defaultStaticRanges } from './defaultRanges';
import { rangeShape } from './DayCell';
import cx from 'classnames';

class DefinedRanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeOffset: 0,
      focusedInput: -1,
    };
    this.handleRangeChange = this.handleRangeChange.bind(this);
  }
  handleRangeChange(range) {
    const { onChange } = this.props;
    onChange && onChange(range);
  }
  checkIsSelected(definedRange, ranges) {
    return ranges.some(range => definedRange.isSelected && definedRange.isSelected(range));
  }
  render() {
    const { onPreviewChange } = this.props;
    const validRanges = this.props.ranges.filter(
      item => item.startDate && item.endDate && !item.disabled
    );
    return (
      <div
        className={styles.definedRangesWrapper}
        onMouseLeave={() => {
          this.props.onPreviewChange && this.props.onPreviewChange();
        }}>
        {this.props.headerContent}
        <div className={styles.staticRanges}>
          {this.props.staticRanges.map((rangeOption, i) => (
            <button
              className={cx(styles.staticRange, {
                [styles.staticRangeSelected]: this.checkIsSelected(rangeOption, validRanges),
              })}
              key={i}
              onClick={() => this.handleRangeChange(rangeOption.range(this.props))}
              onFocus={() => onPreviewChange && onPreviewChange(rangeOption.range(this.props))}
              onMouseOver={() => onPreviewChange && onPreviewChange(rangeOption.range(this.props))}>
              <span tabIndex={-1} className={styles.staticRangeLabel}>
                {rangeOption.label}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.inputRanges}>
          {this.props.inputRanges.map((rangeOption, i) => (
            <div className={styles.inputRange} key={i}>
              <input
                className={styles.inputRangeInput}
                onFocus={() => this.setState({ focusedInput: i, rangeOffset: 0 })}
                onBlur={() => this.setState({ rangeOffset: 0 })}
                onChange={e => {
                  let value = parseInt(e.target.value, 10);
                  value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                  this.handleRangeChange(rangeOption.range(value, this.props));
                }}
                min={0}
                max={99999}
                value={
                  rangeOption.getCurrentValue
                    ? rangeOption.getCurrentValue(
                        this.props.ranges[this.props.focusedRangeIndex] || {}
                      )
                    : '-'
                }
              />
              <span className={styles.inputRangeLabel}>{rangeOption.label}</span>
            </div>
          ))}
        </div>
        {this.props.footerContent}
      </div>
    );
  }
}

DefinedRanges.propTypes = {
  inputRanges: PropTypes.array,
  staticRanges: PropTypes.array,
  ranges: PropTypes.arrayOf(rangeShape),
  focusedRangeIndex: PropTypes.number,
  onPreviewChange: PropTypes.func,
  onChange: PropTypes.func,
  footerContent: PropTypes.any,
  headerContent: PropTypes.any,
};

DefinedRanges.defaultProps = {
  inputRanges: defaultInputRanges,
  staticRanges: defaultStaticRanges,
};

export default DefinedRanges;
