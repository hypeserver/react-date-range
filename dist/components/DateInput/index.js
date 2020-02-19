"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class DateInput extends _react.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props)
    };
  }

  componentDidUpdate(prevProps) {
    const {
      value
    } = prevProps;

    if (!(0, _dateFns.isEqual)(value, this.props.value)) {
      this.setState({
        value: this.formatDate(this.props)
      });
    }
  }

  formatDate({
    value,
    dateDisplayFormat,
    dateOptions
  }) {
    if (value && (0, _dateFns.isValid)(value)) {
      return (0, _dateFns.format)(value, dateDisplayFormat, dateOptions);
    }

    return '';
  }

  update(value) {
    const {
      invalid,
      changed
    } = this.state;

    if (invalid || !changed || !value) {
      return;
    }

    const {
      onChange,
      dateDisplayFormat,
      dateOptions
    } = this.props;
    const parsed = (0, _dateFns.parse)(value, dateDisplayFormat, new Date(), dateOptions);

    if ((0, _dateFns.isValid)(parsed)) {
      this.setState({
        changed: false
      }, () => onChange(parsed));
    } else {
      this.setState({
        invalid: true
      });
    }
  }

  onKeyDown(e) {
    const {
      value
    } = this.state;

    if (e.key === 'Enter') {
      this.update(value);
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
      changed: true,
      invalid: false
    });
  }

  onBlur() {
    const {
      value
    } = this.state;
    this.update(value);
  }

  render() {
    const {
      className,
      readOnly,
      placeholder,
      disabled,
      onFocus
    } = this.props;
    const {
      value,
      invalid
    } = this.state;
    return _react.default.createElement("span", {
      className: (0, _classnames.default)('rdrDateInput', className)
    }, _react.default.createElement("input", {
      readOnly: readOnly,
      disabled: disabled,
      value: value,
      placeholder: placeholder,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: onFocus
    }), invalid && _react.default.createElement("span", {
      className: "rdrWarning"
    }, "\u26A0"));
  }

}

DateInput.propTypes = {
  value: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dateOptions: _propTypes.default.object,
  dateDisplayFormat: _propTypes.default.string,
  className: _propTypes.default.string,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired
};
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY'
};
var _default = DateInput;
exports.default = _default;