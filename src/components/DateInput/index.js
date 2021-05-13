import React, { PureComponent } from 'react';
import TimePicker from '../TimePicker';
import { dateFormatContainsTime } from '../../utils';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { format, parse, isValid, isEqual } from 'date-fns';

class DateInput extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invalid: false,
      changed: false,
      focused: false,
      value: this.formatDate(props),
    };
  }

  componentDidUpdate(prevProps) {
    const { value, showTimePicker, dateDisplayFormat } = prevProps;

    if (!isEqual(value, this.props.value)) {
      this.setState({ value: this.formatDate(this.props) });
    }

    if (
      showTimePicker !== this.props.showTimePicker ||
      dateDisplayFormat !== this.props.dateDisplayFormat
    ) {
      if (this.props.showTimePicker && !dateFormatContainsTime(this.props.dateDisplayFormat)) {
        console.warn(
          'The `dateDisplayFormat` prop should contain time formatting when the `showTimePicker` prop is set to true. See the date-fns format table: https://date-fns.org/docs/format'
        );
      }
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
    setTimeout(() => this.setState({ focus: false }), 100);
  };

  onFocus = e => {
    const { onFocus } = this.props;
    this.setState({ focus: true }, () => onFocus(e));
  };

  render() {
    const { className, readOnly, placeholder, disabled } = this.props;
    const { value, invalid } = this.state;

    return (
      <span className={classnames('rdrDateInput', className)}>
        <input
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        {invalid && <span className="rdrWarning">&#9888;</span>}
        {this.props.showTimePicker && this.state.focus && <TimePicker {...this.props} />}
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
  className: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  showTimePicker: PropTypes.bool,
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
