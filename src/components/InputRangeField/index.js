import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MIN = 0;
const MAX = 99999;

class InputRangeField extends Component {
  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    const { value, label, placeholder } = this.props;

    return (
      value !== nextProps.value ||
      label !== nextProps.label ||
      placeholder !== nextProps.placeholder
    );
  }

  onChange = e => {
    const { onChange } = this.props;

    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);

    onChange(value);
  };

  render() {
    const { label, placeholder, value, styles, onBlur, onFocus } = this.props;

    return (
      <div className={styles.inputRange}>
        <input
          className={styles.inputRangeInput}
          placeholder={placeholder}
          value={value}
          min={MIN}
          max={MAX}
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <span className={styles.inputRangeLabel}>{label}</span>
      </div>
    );
  }
}

InputRangeField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  styles: PropTypes.shape({
    inputRange: PropTypes.string,
    inputRangeInput: PropTypes.string,
    inputRangeLabel: PropTypes.string,
  }).isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputRangeField.defaultProps = {
  value: '',
  placeholder: '-',
};

export default InputRangeField;
