import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Header extends Component {
  static defaultProps = {
    inputReadOnly: false,
  };

  constructor(props) {
    super(props);
    const { value, format } = props;
    this.state = {
      str: (value && value.format(format)) || '',
      invalid: false,
    };
  }

  componentDidMount() {
    const { focusOnOpen } = this.props;
    if (focusOnOpen) {
      // requestAnimationFrame will cause jump on rc-trigger 3.x
      // https://github.com/ant-design/ant-design/pull/19698#issuecomment-552889571
      // use setTimeout can resolve it
      // 60ms is a magic timeout to avoid focusing before dropdown reposition correctly
      this.timeout = setTimeout(() => {
        this.refInput.focus();
        this.refInput.select();
      }, 60);
    }
  }

  componentDidUpdate(prevProps) {
    const { value, format } = this.props;
    if (value !== prevProps.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        str: (value && value.format(format)) || '',
        invalid: false,
      });
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onInputChange = event => {
    const str = event.target.value;
    this.setState({
      str,
    });
    const {
      format,
      hourOptions,
      minuteOptions,
      secondOptions,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      onChange,
    } = this.props;

    if (str) {
      const { value: originalValue } = this.props;
      const value = this.getProtoValue().clone();
      const parsed = moment(str, format, true);
      if (!parsed.isValid()) {
        this.setState({
          invalid: true,
        });
        return;
      }
      value
        .hour(parsed.hour())
        .minute(parsed.minute())
        .second(parsed.second());

      // if time value not allowed, response warning.
      if (
        hourOptions.indexOf(value.hour()) < 0 ||
        minuteOptions.indexOf(value.minute()) < 0 ||
        secondOptions.indexOf(value.second()) < 0
      ) {
        this.setState({
          invalid: true,
        });
        return;
      }

      // if time value is disabled, response warning.
      const disabledHourOptions = disabledHours();
      const disabledMinuteOptions = disabledMinutes(value.hour());
      const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
      if (
        (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0) ||
        (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0) ||
        (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
      ) {
        this.setState({
          invalid: true,
        });
        return;
      }

      if (originalValue) {
        if (
          originalValue.hour() !== value.hour() ||
          originalValue.minute() !== value.minute() ||
          originalValue.second() !== value.second()
        ) {
          // keep other fields for rc-calendar
          const changedValue = originalValue.clone();
          changedValue.hour(value.hour());
          changedValue.minute(value.minute());
          changedValue.second(value.second());
          onChange(changedValue);
        }
      } else if (originalValue !== value) {
        onChange(value);
      }
    } else {
      onChange(null);
    }

    this.setState({
      invalid: false,
    });
  };

  onKeyDown = e => {
    const { onEsc, onKeyDown } = this.props;
    if (e.keyCode === 27) {
      onEsc();
    }

    onKeyDown(e);
  };

  getProtoValue() {
    const { value, defaultOpenValue } = this.props;
    return value || defaultOpenValue;
  }

  getInput() {
    const { prefixCls, placeholder, inputReadOnly } = this.props;
    const { invalid, str } = this.state;
    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
    return (
      <input
        className={classNames(`${prefixCls}-input`, invalidClass)}
        ref={ref => {
          this.refInput = ref;
        }}
        onKeyDown={this.onKeyDown}
        value={str}
        placeholder={placeholder}
        onChange={this.onInputChange}
        readOnly={!!inputReadOnly}
      />
    );
  }

  render() {
    const { prefixCls } = this.props;
    return <div className={`${prefixCls}-input-wrap`}>{this.getInput()}</div>;
  }
}

Header.propTypes = {
  prefixCls: PropTypes.string,
  inputReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  onEsc: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.any,
  defaultOpenValue: PropTypes.any,
  format: PropTypes.string,
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  disabledHours: PropTypes.any,
  disabledMinutes: PropTypes.any,
  disabledSeconds: PropTypes.any,
  onChange: PropTypes.func,
  focusOnOpen: PropTypes.bool,
};

export default Header;
