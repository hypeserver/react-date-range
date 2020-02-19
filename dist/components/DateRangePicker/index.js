"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateRange = _interopRequireDefault(require("../DateRange"));

var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));

var _utils = require("../../utils");

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("../../styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class DateRangePicker extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedRange: [(0, _utils.findNextRangeIndex)(props.ranges), 0]
    };
    this.styles = (0, _utils.generateStyles)([_styles.default, props.classNames]);
  }

  render() {
    const {
      focusedRange
    } = this.state;
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(this.styles.dateRangePickerWrapper, this.props.className)
    }, _react.default.createElement(_DefinedRange.default, _extends({
      focusedRange: focusedRange,
      onPreviewChange: value => this.dateRange.updatePreview(value)
    }, this.props, {
      range: this.props.ranges[focusedRange[0]],
      className: undefined
    })), _react.default.createElement(_DateRange.default, _extends({
      onRangeFocusChange: focusedRange => this.setState({
        focusedRange
      }),
      focusedRange: focusedRange
    }, this.props, {
      ref: t => this.dateRange = t,
      className: undefined
    })));
  }

}

DateRangePicker.defaultProps = {};
DateRangePicker.propTypes = { ..._DateRange.default.propTypes,
  ..._DefinedRange.default.propTypes,
  className: _propTypes.default.string
};
var _default = DateRangePicker;
exports.default = _default;