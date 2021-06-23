import React, { ChangeEvent, ChangeEventHandler, Component } from 'react';
import PropTypes from 'prop-types';
import { Styles } from '../DayCell/types';

const MIN = 0;
const MAX = 99999;

interface InputRangeFieldProps {
  value: number | string
  label: string
  styles: Styles
  onChange: (value: number) => void
  onFocus: () => void
  onBlur: () => void
  placeholder?: string
}


class InputRangeField extends Component<InputRangeFieldProps> {
  static propTypes = {};
  static defaultProps = {}

  // FIXME: context
  constructor(props: InputRangeFieldProps, context: any) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps: InputRangeFieldProps) {
    const { value, label, placeholder } = this.props;

    return (
      value !== nextProps.value ||
      label !== nextProps.label ||
      placeholder !== nextProps.placeholder
    );
  }

  onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
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
