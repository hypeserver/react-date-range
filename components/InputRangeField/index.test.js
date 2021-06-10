"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _InputRangeField = _interopRequireDefault(require("../InputRangeField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  inputRange: 'range',
  inputRangeInput: 'input',
  inputRangeLabel: 'label'
};

var toChangeEvent = function toChangeEvent(value) {
  return {
    target: {
      value: value
    }
  };
};

describe('InputRangeField tests', function () {
  test('Should parse input value to number', function () {
    var onChange = jest.fn();
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      label: "Input label",
      styles: styles,
      onChange: onChange,
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }));
    wrapper.find('input').simulate('change', toChangeEvent('3'));
    expect(onChange).lastCalledWith(3);
    wrapper.find('input').simulate('change', toChangeEvent(12));
    expect(onChange).lastCalledWith(12);
    wrapper.find('input').simulate('change', toChangeEvent(''));
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent('invalid number'));
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent(-12));
    expect(onChange).lastCalledWith(0);
    wrapper.find('input').simulate('change', toChangeEvent(99999999));
    expect(onChange).lastCalledWith(99999);
    expect(onChange).toHaveBeenCalledTimes(6);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should rerender when props change', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 12,
      placeholder: "Placeholder",
      label: "Input label",
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }));
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual(12);
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    wrapper.setProps({
      value: '32'
    });
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual('32');
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    wrapper.setProps({
      placeholder: '-'
    });
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual('32');
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('-');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    wrapper.setProps({
      label: 'Label'
    });
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual('32');
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('-');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Label');
  });
  test('Should render the label as a Component', function () {
    var Label = function Label() {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: "input-range-field-label"
      }, "Input label");
    };

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      value: 12,
      placeholder: "Placeholder",
      label: /*#__PURE__*/_react.default.createElement(Label, null),
      styles: styles,
      onChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    }));
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual(12);
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    expect(wrapper.find(".input-range-field-label").text()).toEqual('Input label');
    wrapper.setProps({
      value: '32'
    });
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual('32');
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('Placeholder');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    wrapper.setProps({
      placeholder: '-'
    });
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual('32');
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('-');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Input label');
    wrapper.setProps({
      label: 'Label'
    });
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('value')).toEqual('32');
    expect(wrapper.find(".".concat(styles.inputRangeInput)).prop('placeholder')).toEqual('-');
    expect(wrapper.find(".".concat(styles.inputRangeLabel)).text()).toEqual('Label');
  });
});