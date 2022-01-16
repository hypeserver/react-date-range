import React, { ChangeEvent, Component, FocusEventHandler } from 'react';

const MIN = 0;
const MAX = 99999;

type Styles = {
  inputRange: string;
  inputRangeInput: string;
  inputRangeLabel: string;
}

type ComponentProps = {
  value: string | number;
  label: string | JSX.Element,
  placeholder: string,
  styles: Styles;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onChange: (n: number) => void;
};


class InputRangeField extends Component<ComponentProps> {
  public static defaultProps = {
    value: '',
    placeholder: '-',
  };

  constructor(props: ComponentProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: ComponentProps) {
    const { value, label, placeholder } = this.props;

    return (
      value !== nextProps.value ||
      label !== nextProps.label ||
      placeholder !== nextProps.placeholder
    );
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const changeArg = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);
    this.props.onChange(changeArg);
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


export default InputRangeField;
