"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TimeArrowUp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimeArrowUp, _React$Component);

  function TimeArrowUp() {
    _classCallCheck(this, TimeArrowUp);

    return _possibleConstructorReturn(this, _getPrototypeOf(TimeArrowUp).apply(this, arguments));
  }

  _createClass(TimeArrowUp, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("svg", {
        width: "6",
        height: "4",
        className: "time-input-arrow",
        viewBox: "0 0 6 4",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        onClick: this.props.onClick
      }, _react["default"].createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.23721 3.66249C5.41172 3.84475 5.69461 3.84475 5.86912 3.66249C6.04363 3.48035 6.04363 3.18475 5.86912 3.00262L3.31595 0.335819C3.14145 0.153685 2.85855 0.153685 2.68405 0.335819L0.130881 3.00262C-0.0436273 3.18475 -0.0436273 3.48035 0.130881 3.66249C0.30539 3.84475 0.588281 3.84475 0.76279 3.66249L3.00128 1.32449L5.23721 3.66249Z",
        fill: "#7A8699"
      }));
    }
  }]);

  return TimeArrowUp;
}(_react["default"].Component);

TimeArrowUp.propTypes = {
  onClick: _propTypes["default"].func.isRequired
};
var _default = TimeArrowUp;
exports["default"] = _default;