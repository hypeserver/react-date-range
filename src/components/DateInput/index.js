import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format, parse, isValid, isEqual } from 'date-fns';
import TimePicker from 'rc-time-picker';
import { Fa500Px, FaClock } from 'react-icons/fa';

class DateInput extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props),
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = prevProps;

    if (!isEqual(value, this.props.value)) {
      this.setState({ value: this.formatDate(this.props) });
    }
  }

  formatDate({ value, dateDisplayFormat, dateOptions }) {
    if (value && isValid(value)) {
      return format(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }

  update(value) {
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
    const {
      className,
      readOnly,
      placeholder,
      ariaLabel,
      disabled,
      onFocus,
      timeContainerClassName,
      timePickerClassName,
      showTime,
    } = this.props;
    const { value, invalid } = this.state;

    return (
      <span className={classnames('rdrDateInput', className, showTime && 'rdrDateInputTime')}>
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
        {showTime ? (
          <span className={timeContainerClassName}>
            <TimePicker
              allowEmpty={true}
              showSecond={false}
              onChange={value => {
                console.log('here onChange', value);
                // updateRange && updateRange()
              }}
              // todo add a clear icon
              // clearIcon={<Fa500Px size={2} />}
            />
            <span className={timePickerClassName}>
              <FaClock />
            </span>
          </span>
        ) : null}
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
  showTime: PropTypes.bool,
  timeContainerClassName: PropTypes.string,
  timePickerClassName: PropTypes.string,
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
