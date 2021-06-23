import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format, parse, isValid, isEqual } from 'date-fns';
import { DateOptions } from '../../utilsTypes';

interface DateInputProps {
  value: number | Date // ???
  onChange: (value: Date) => void
  className: string
  placeholder: string
  readOnly: boolean
  disabled: boolean
  onFocus: React.FocusEventHandler<HTMLInputElement>
  dateDisplayFormat: string
  dateOptions: DateOptions
  // FIXME
  ariaLabel: any
}

interface DateInputState {
  changed: boolean
  invalid: boolean
  value: string
}

class DateInput extends PureComponent<DateInputProps, DateInputState> {
  static propTypes = {}
  static defaultProps = {}
  // FIXME: context
  constructor(props: DateInputProps, context: any) {
    super(props, context);

    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props),
    };
  }

  componentDidUpdate(prevProps: DateInputProps) {
    const { value } = prevProps;

    if (!isEqual(value, this.props.value)) {
      this.setState({ value: this.formatDate(this.props) });
    }
  }

  formatDate({ value, dateDisplayFormat, dateOptions }: { value: number | Date, dateDisplayFormat: string, dateOptions: object}) {
    if (value && isValid(value)) {
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

  onKeyDown = e => {
    const { value } = this.state;

    if (e.key === 'Enter') {
      this.update(value);
    }
  };

  onChange = e => {
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

DateInput.propTypes = {
  value: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  dateOptions: PropTypes.object,
  dateDisplayFormat: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
