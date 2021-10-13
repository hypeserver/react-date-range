import React, { ChangeEvent, KeyboardEvent, PureComponent } from 'react';
import classnames from 'classnames';
import { format, parse, isValid, isEqual } from 'date-fns';
import { DateOptions } from '../../types';

type FormatDateProps = {
  value?: Date;
  dateDisplayFormat: string;
  dateOptions?: DateOptions;
}

type CompontentProps = FormatDateProps & {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  ariaLabel?: string;
  className?: string;
  onFocus: React.FocusEventHandler<HTMLInputElement>;
  onChange: (d: Date) => void;
};

type ComponentState = {
  invalid: boolean;
  changed: boolean;
  value: string;
}

class DateInput extends PureComponent<CompontentProps, ComponentState> {
  public static defaultProps = {
    readOnly: true,
    disabled: false,
    dateDisplayFormat: 'MMM D, YYYY',
  };

  constructor(props: CompontentProps) {
    super(props);

    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(this.props),
    };
  }

  componentDidUpdate(prevProps: CompontentProps) {
    const { value } = prevProps;

    if (typeof value !== 'undefined' && typeof this.props.value !== 'undefined' && !isEqual(value, this.props.value)) {
      this.setState({ value: this.formatDate(this.props) });
    }
  }

  formatDate({ value, dateDisplayFormat, dateOptions }: FormatDateProps) {
    if (value && isValid(value) && dateDisplayFormat) {
      return format(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }

  update(value: string) {
    const { invalid, changed } = this.state;

    if (invalid || !changed || !value) {
      return;
    }

    const { onChange, dateDisplayFormat, dateOptions } = this.props;
    const parsed = parse(value, dateDisplayFormat, new Date(), dateOptions);

    if (isValid(parsed)) {
      this.setState({ changed: false }, () => onChange(parsed));
    } else {
      this.setState({ invalid: true });
    }
  }

  onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = this.state;

    if (e.key === 'Enter') {
      this.update(value);
    }
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value, changed: true, invalid: false });
  };

  onBlur = () => {
    const { value } = this.state;
    this.update(value);
  };

  render() {
    const { className, readOnly, placeholder, ariaLabel, disabled, onFocus } = this.props;
    const { value, invalid } = this.state;

    return (
      <span className={classnames('rdrDateInput', className)}>
        <input
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={onFocus}
        />
        {invalid && <span className="rdrWarning">&#9888;</span>}
      </span>
    );
  }
}

export default DateInput;
