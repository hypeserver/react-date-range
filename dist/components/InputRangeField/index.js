"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MIN = 0;
const MAX = 99999;

class InputRangeField extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      value,
      label,
      placeholder
    } = this.props;
    return value !== nextProps.value || label !== nextProps.label || placeholder !== nextProps.placeholder;
  }

  onChange(e) {
    const {
      onChange
    } = this.props;
    let value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);
    onChange(value);
  }

  render() {
    const {
      label,
      placeholder,
      value,
      styles,
      onBlur,
      onFocus
    } = this.props;
    return _react.default.createElement("div", {
      className: styles.inputRange
    }, _react.default.createElement("input", {
      className: styles.inputRangeInput,
      placeholder: placeholder,
      value: value,
      min: MIN,
      max: MAX,
      onChange: this.onChange,
      onFocus: onFocus,
      onBlur: onBlur
    }), _react.default.createElement("span", {
      className: styles.inputRangeLabel
    }, label));
  }

}

InputRangeField.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  label: _propTypes.default.string.isRequired,
  placeholder: _propTypes.default.string,
  styles: _propTypes.default.shape({
    inputRange: _propTypes.default.string,
    inputRangeInput: _propTypes.default.string,
    inputRangeLabel: _propTypes.default.string
  }).isRequired,
  onBlur: _propTypes.default.func.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired
};
InputRangeField.defaultProps = {
  value: '',
  placeholder: '-'
};
var _default = InputRangeField;
exports.default = _default;