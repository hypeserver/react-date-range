import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { defaultInputRanges, defaultStaticRanges } from './defaultRanges';
import { rangeShape } from './DayCell';

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
  render() {
    const { onPreviewChange } = this.props;
    return (
      <div className={styles.definedRangesWrapper}>
        <div className={styles.staticRanges}>
          {this.props.staticRanges.map((rangeOption, i) => (
            <button
              className={styles.staticRange}
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
                onChange={e => {
                  let value = parseInt(e.target.value, 10);
                  value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                  this.setState({ rangeOffset: value });
                  this.handleRangeChange(rangeOption.range(value, this.props));
                }}
                min={0}
                max={99999}
                value={this.state.focusedInput === i ? this.state.rangeOffset : 0}
              />{' '}
              <span className={styles.inputRangeLabel}>{rangeOption.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

DefinedRanges.propTypes = {
  inputRanges: PropTypes.array,
  staticRanges: PropTypes.array,
  range: rangeShape,
  onPreviewChange: PropTypes.func,
  onChange: PropTypes.func,
};

DefinedRanges.defaultProps = {
  inputRanges: defaultInputRanges,
  staticRanges: defaultStaticRanges,
};

export default DefinedRanges;
