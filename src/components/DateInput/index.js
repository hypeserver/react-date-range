import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format, parse, isValid, isEqual } from 'date-fns';
import TimeInput from '../TimeInput';
import { FaClock } from 'react-icons/fa';

class DateInput extends PureComponent {
  constructor(props, context) {
    super(props, context);

    const formattedDate = this.formatDate(props);
    this.state = {
      invalid: false,
      changed: false,
      value: formattedDate,
      displayDateValue: formattedDate,
    };
  }

  componentDidUpdate(prevProps) {
    const { value, timeOptions } = prevProps;
    const { hour, minutes, seconds } = this.state;

    if (!isEqual(value, this.props.value)) {
      let newDate = this.props.value;
      if (hour) {
        newDate.setHours(hour);
      }
      if (minutes) {
        newDate.setMinutes(minutes);
      }

      if (timeOptions.showSeconds && seconds) {
        newDate.setSeconds(seconds);
      }

      this.setState({ value: newDate, displayDateValue: this.formatDate(this.props) });
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
    const { hour, minutes, seconds } = this.state;
    const { timeOptions } = this.props;

    let newDate = e.target.value;
    if (hour) {
      newDate.hour(hour);
    }
    if (minutes) {
      newDate.setMinutes(minutes);
    }

    if (timeOptions.showSeconds && seconds) {
      newDate.setSeconds(seconds);
    }

    this.setState({
      value: newDate,
      displayDateValue: e.target.value,
      changed: true,
      invalid: false,
    });
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
      timeOptions,
    } = this.props;

    const { invalid, displayDateValue } = this.state;

    const { showTime, showSeconds, use12Hours } = timeOptions || {};
    return (
      <span className={classnames('rdrDateInput', showTime && 'rdrTimeInput', className)}>
        <input
          readOnly={readOnly}
          disabled={disabled}
          value={displayDateValue}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={onFocus}
        />
        {showTime ? (
          <span className={timeContainerClassName}>
            <TimeInput
              allowEmpty={true}
              showSecond={showSeconds}
              use12Hours={use12Hours}
              onFocus={onFocus}
              closeOnMinuteSelect
              onClose={() => {
                this.props.onChange(this.props.value, true);
              }}
              inputIcon={<span className={timePickerClassName}>{<FaClock />}</span>}
              onChange={value => {
                const dateValue = this.props.value;

                let hour = 0;
                let minutes = 0;
                let seconds = 0;

                if (value) {
                  hour = value.hour();
                  minutes = value.minutes();

                  if (timeOptions.showSeconds) {
                    seconds = value.seconds();
                    dateValue.setSeconds(seconds);
                  }
                }

                dateValue.setHours(hour);
                dateValue.setMinutes(minutes);

                this.setState({ value: dateValue, hour: hour, minutes, seconds });
              }}
            />
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
  timeOptions: PropTypes.shape({
    showTime: PropTypes.bool,
    use12Hours: PropTypes.bool,
    showSeconds: PropTypes.bool,
  }),
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
