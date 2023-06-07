import React, { Component } from 'react';
import Select from './Select';
import PropTypes from 'prop-types';

const formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }

  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value,
    disabled,
  };
};

class Combobox extends Component {
  onItemChange = (type, itemValue) => {
    const {
      onChange,
      defaultOpenValue,
      use12Hours,
      value: propValue,
      isAM,
      onAmPmChange,
      onSelected,
    } = this.props;
    const value = (propValue || defaultOpenValue).clone();

    if (type === 'hour') {
      if (use12Hours) {
        if (isAM) {
          value.hour(+itemValue % 12);
        } else {
          value.hour((+itemValue % 12) + 12);
        }
      } else {
        value.hour(+itemValue);
      }
    } else if (type === 'minute') {
      value.minute(+itemValue);
    } else if (type === 'ampm') {
      const ampm = itemValue.toUpperCase();
      if (use12Hours) {
        if (ampm === 'PM' && value.hour() < 12) {
          value.hour((value.hour() % 12) + 12);
        }

        if (ampm === 'AM') {
          if (value.hour() >= 12) {
            value.hour(value.hour() - 12);
          }
        }
      }
      onAmPmChange(ampm);
    } else {
      value.second(+itemValue);
    }
    onChange(value);

    if (onSelected && typeof onSelected === 'function') {
      onSelected(type);
    }
  };

  onEnterSelectPanel = range => {
    const { onCurrentSelectPanelChange } = this.props;
    onCurrentSelectPanelChange(range);
  };

  getHourSelect(hour) {
    const { prefixCls, hourOptions, disabledHours, showHour, use12Hours, onEsc } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();
    let hourOptionsAdj;
    let hourAdj;
    if (use12Hours) {
      hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
      hourAdj = hour % 12 || 12;
    } else {
      hourOptionsAdj = hourOptions;
      hourAdj = hour;
    }

    return (
      <Select
        prefixCls={prefixCls}
        options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
        selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('hour')}
        onEsc={onEsc}
      />
    );
  }

  getMinuteSelect(minute) {
    const {
      prefixCls,
      minuteOptions,
      disabledMinutes,
      defaultOpenValue,
      showMinute,
      value: propValue,
      onEsc,
    } = this.props;
    if (!showMinute) {
      return null;
    }
    const value = propValue || defaultOpenValue;
    const disabledOptions = disabledMinutes(value.hour());

    return (
      <Select
        prefixCls={prefixCls}
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('minute')}
        onEsc={onEsc}
      />
    );
  }

  getSecondSelect(second) {
    const {
      prefixCls,
      secondOptions,
      disabledSeconds,
      showSecond,
      defaultOpenValue,
      value: propValue,
      onEsc,
    } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = propValue || defaultOpenValue;
    const disabledOptions = disabledSeconds(value.hour(), value.minute());

    return (
      <Select
        prefixCls={prefixCls}
        options={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('second')}
        onEsc={onEsc}
      />
    );
  }

  getAMPMSelect() {
    const { prefixCls, use12Hours, format, isAM, onEsc } = this.props;
    if (!use12Hours) {
      return null;
    }

    const AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
      .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
      .map(c => ({ value: c }));

    const selected = isAM ? 0 : 1;

    return (
      <Select
        prefixCls={prefixCls}
        options={AMPMOptions}
        selectedIndex={selected}
        type="ampm"
        onSelect={this.onItemChange}
        onMouseEnter={() => this.onEnterSelectPanel('ampm')}
        onEsc={onEsc}
      />
    );
  }

  render() {
    const { prefixCls, defaultOpenValue, value: propValue } = this.props;
    const value = propValue || defaultOpenValue;
    return (
      <div className={`${prefixCls}-combobox`}>
        {this.getHourSelect(value.hour())}
        {this.getMinuteSelect(value.minute())}
        {this.getSecondSelect(value.second())}
        {this.getAMPMSelect(value.hour())}
      </div>
    );
  }
}
Combobox.propTypes = {
  defaultOpenValue: PropTypes.any,
  prefixCls: PropTypes.string,
  minuteOptions: PropTypes.any,
  disabledMinutes: PropTypes.any,
  value: PropTypes.any,
  use12Hours: PropTypes.bool,
  format: PropTypes.string,
  isAM: PropTypes.bool,
  onEsc: PropTypes.func,
  secondOptions: PropTypes.any,
  disabledSeconds: PropTypes.any,
  showSecond: PropTypes.bool,
  showMinute: PropTypes.bool,
  showHour: PropTypes.bool,
  hourOptions: PropTypes.any,
  disabledHours: PropTypes.any,
  onCurrentSelectPanelChange: PropTypes.func,
  onChange: PropTypes.func,
  onAmPmChange: PropTypes.func,
  onSelected: PropTypes.func,
};
export default Combobox;
