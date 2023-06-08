import React, { Component } from 'react';
import Trigger from 'rc-trigger';
import moment from 'moment';
import classNames from 'classnames';
import Panel from './Panel';
import placements from './placements';
import PropTypes from 'prop-types';

function noop() {}

function refFn(field, component) {
  this[field] = component;
}

class TimeInput extends Component {
  static defaultProps = {
    clearText: 'clear',
    prefixCls: 'rc-time-picker',
    defaultOpen: false,
    inputReadOnly: false,
    style: {},
    className: '',
    inputClassName: '',
    popupClassName: '',
    popupStyle: {},
    align: {},
    defaultOpenValue: moment(),
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    onChange: noop,
    onAmPmChange: noop,
    onOpen: noop,
    onClose: noop,
    onFocus: noop,
    onBlur: noop,
    addon: noop,
    use12Hours: false,
    focusOnOpen: false,
    onKeyDown: noop,
  };

  constructor(props) {
    super(props);
    this.saveInputRef = refFn.bind(this, 'picker');
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    let { value, defaultOpen, defaultValue, open = defaultOpen } = props;
    if (!value && defaultValue) {
      //convert 12:00 to moment object
      value = moment(defaultValue, this.getFormat());
    }

    this.state = {
      open,
      value,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if ('value' in props) {
      newState.value = props.value;
    }
    if (props.open !== undefined) {
      newState.open = props.open;
    }
    return Object.keys(newState).length > 0
      ? {
          ...state,
          ...newState,
        }
      : null;
  }

  onPanelChange = value => {
    this.setValue(value);
  };

  onAmPmChange = ampm => {
    const { onAmPmChange } = this.props;
    onAmPmChange(ampm);
  };

  onClear = event => {
    event.stopPropagation();
    this.setValue(null);
    this.setOpen(false);
  };

  onVisibleChange = open => {
    this.setOpen(open);
  };

  onEsc = () => {
    this.setOpen(false);
    this.focus();
  };

  onKeyDown = e => {
    if (e.keyCode === 40) {
      this.setOpen(true);
    }
  };

  setValue(value) {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    onChange(value);
  }

  getFormat() {
    const { format, showHour, showMinute, showSecond, use12Hours } = this.props;
    if (format) {
      return format;
    }

    if (use12Hours) {
      const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
        .filter(item => !!item)
        .join(':');

      return fmtString.concat(' a');
    }

    return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
      .filter(item => !!item)
      .join(':');
  }

  getPanelElement() {
    const {
      prefixCls,
      placeholder,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      inputReadOnly,
      showHour,
      showMinute,
      showSecond,
      defaultOpenValue,
      clearText,
      addon,
      use12Hours,
      focusOnOpen,
      onKeyDown,
      hourStep,
      minuteStep,
      secondStep,
      clearIcon,
      closeOnHourSelect,
      closeOnMinuteSelect,
    } = this.props;
    const { value } = this.state;
    return (
      <Panel
        clearText={clearText}
        prefixCls={`${prefixCls}-panel`}
        ref={this.savePanelRef}
        value={value}
        inputReadOnly={inputReadOnly}
        onChange={this.onPanelChange}
        onAmPmChange={this.onAmPmChange}
        defaultOpenValue={defaultOpenValue}
        showHour={showHour}
        showMinute={showMinute}
        showSecond={showSecond}
        onSelected={type => {
          if (type === 'hour' && closeOnHourSelect) {
            this.setOpen(false);
          }
          if (type === 'minute' && closeOnMinuteSelect) {
            this.setOpen(false);
          }
        }}
        onEsc={this.onEsc}
        format={this.getFormat()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
        use12Hours={use12Hours}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        addon={addon}
        focusOnOpen={focusOnOpen}
        onKeyDown={onKeyDown}
        clearIcon={clearIcon}
      />
    );
  }

  getPopupClassName() {
    const { showHour, showMinute, showSecond, use12Hours, prefixCls, popupClassName } = this.props;
    let selectColumnCount = 0;
    if (showHour) {
      selectColumnCount += 1;
    }
    if (showMinute) {
      selectColumnCount += 1;
    }
    if (showSecond) {
      selectColumnCount += 1;
    }
    if (use12Hours) {
      selectColumnCount += 1;
    }
    // Keep it for old compatibility
    return classNames(
      popupClassName,
      {
        [`${prefixCls}-panel-narrow`]: (!showHour || !showMinute || !showSecond) && !use12Hours,
      },
      `${prefixCls}-panel-column-${selectColumnCount}`
    );
  }

  setOpen(open) {
    const { onOpen, onClose } = this.props;
    const { open: currentOpen } = this.state;
    if (currentOpen !== open) {
      if (!('open' in this.props)) {
        this.setState({ open });
      }
      if (open) {
        onOpen({ open });
      } else {
        onClose({ open });
      }
    }
  }

  focus() {
    this.picker.focus();
  }

  blur() {
    this.picker.blur();
  }

  renderClearButton() {
    const { value } = this.state;
    const { prefixCls, allowEmpty, clearIcon, clearText, disabled } = this.props;
    if (!allowEmpty || !value || disabled) {
      return null;
    }

    if (React.isValidElement(clearIcon)) {
      const { onClick } = clearIcon.props || {};
      return React.cloneElement(clearIcon, {
        onClick: (...args) => {
          if (onClick) onClick(...args);
          this.onClear(...args);
        },
      });
    }

    return (
      <a
        role="button"
        className={`${prefixCls}-clear`}
        title={clearText}
        onClick={this.onClear}
        tabIndex={0}>
        {clearIcon || <i className={`${prefixCls}-clear-icon`} />}
      </a>
    );
  }

  render() {
    const {
      prefixCls,
      placeholder,
      placement,
      align,
      id,
      disabled,
      transitionName,
      style,
      className,
      inputClassName,
      getPopupContainer,
      name,
      autoComplete,
      onFocus,
      onBlur,
      autoFocus,
      inputReadOnly,
      popupStyle,
      inputIcon,
    } = this.props;
    const { open, value } = this.state;
    const popupClassName = this.getPopupClassName();

    return (
      <Trigger
        prefixCls={`${prefixCls}-panel`}
        popupClassName={popupClassName}
        popupStyle={popupStyle}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupTransitionName={transitionName}
        popupVisible={open}
        onPopupVisibleChange={this.onVisibleChange}>
        <span className={classNames(prefixCls, className)} style={style}>
          <input
            className={classNames(`${prefixCls}-input`, inputClassName)}
            ref={this.saveInputRef}
            type="text"
            placeholder={placeholder}
            name={name}
            onKeyDown={this.onKeyDown}
            disabled={disabled}
            value={(value && value.format(this.getFormat())) || ''}
            autoComplete={autoComplete}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            onChange={noop}
            readOnly={!!inputReadOnly}
            id={id}
          />
          {inputIcon || <span className={`${prefixCls}-icon`} />}
          {this.renderClearButton()}
        </span>
      </Trigger>
    );
  }
}

TimeInput.propTypes = {
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  open: PropTypes.bool,
  value: PropTypes.any,
  defaultOpenValue: PropTypes.any,
  allowEmpty: PropTypes.bool,
  clearIcon: PropTypes.node,
  id: PropTypes.string,
  align: PropTypes.object,
  placement: PropTypes.string,
  disabled: PropTypes.bool,
  transitionName: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  popupClassName: PropTypes.string,
  popupStyle: PropTypes.object,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.object,
  getPopupContainer: PropTypes.func,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  inputReadOnly: PropTypes.bool,
  inputIcon: PropTypes.node,
  inputClassName: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onAmPmChange: PropTypes.func,
  showHour: PropTypes.bool,
  showMinute: PropTypes.bool,
  showSecond: PropTypes.bool,
  format: PropTypes.string,
  disabledHours: PropTypes.any,
  disabledMinutes: PropTypes.any,
  disabledSeconds: PropTypes.any,
  hideDisabledOptions: PropTypes.bool,
  onChange: PropTypes.func,
  onEsc: PropTypes.func,
  use12Hours: PropTypes.bool,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  addon: PropTypes.func,
  focusOnOpen: PropTypes.bool,
  onKeyDown: PropTypes.func,
  clearText: PropTypes.string,
  popupTransitionName: PropTypes.string,
  onClear: PropTypes.func,
  defaultOpen: PropTypes.bool,
  defaultValue: PropTypes.any,
  closeOnMinuteSelect: PropTypes.bool,
  closeOnHourSelect: PropTypes.bool,
};
export default TimeInput;
