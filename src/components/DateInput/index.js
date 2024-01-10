import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format, parse, isValid as isValidDateFns, isEqual } from 'date-fns';

class DateInput extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invalid: {
        invalidFormat: false,
        outOfRange: false,
      },
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

  isValid = value => {
    return { isValidFormat: isValidDateFns(value), isInRange: this.props.isDateInRange(value) };
  };

  formatDate({ value, dateDisplayFormat, dateOptions }) {
    if (value) {
      const { isInRange, isValidFormat } = this.isValid(value);
      if (isInRange && isValidFormat) {
        return format(value, dateDisplayFormat, dateOptions);
      }
    }

    return '';
  }

  update(value) {
    const {
      invalid: { invalidFormat, outOfRange },
      changed,
    } = this.state;

    if (invalidFormat || outOfRange || !changed || !value) {
      return;
    }

    const { onChange, dateDisplayFormat, dateOptions } = this.props;
    const parsed = parse(value, dateDisplayFormat, new Date(), dateOptions);
    const { isInRange, isValidFormat } = this.isValid(parsed);
    if (isInRange && isValidFormat) {
      this.setState({ changed: false }, () => onChange(parsed));
    } else {
      this.setState({
        invalid: {
          invalidFormat: !isValidFormat,
          outOfRange: !isInRange,
        },
      });
    }
  }

  onKeyDown = e => {
    const { value } = this.state;

    if (e.key === 'Enter') {
      this.update(value);
    }
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
      changed: true,
      invalid: {
        invalidFormat: false,
        outOfRange: false,
      },
    });
  };

  onBlur = () => {
    const { value } = this.state;
    this.update(value);
  };

  render() {
    const { className, readOnly, placeholder, ariaLabel, disabled, onFocus } = this.props;
    const {
      value,
      invalid: { invalidFormat, outOfRange },
    } = this.state;

    const tooltipWarningMessage = invalidFormat
      ? 'The date format is invalid'
      : outOfRange
      ? 'The date is out of range'
      : '';

    return (
      <span
        className={classnames(
          { rdrInvalidDateInput: invalidFormat || outOfRange },
          'rdrDateInput',
          className
        )}>
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
        {(invalidFormat || outOfRange) && <span className="rdrWarning">&#9888;</span>}
        {tooltipWarningMessage && (
          <span className="rdrTooltipWarning">{tooltipWarningMessage}</span>
        )}
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
  isDateInRange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
