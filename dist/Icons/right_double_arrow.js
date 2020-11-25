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

var RightDoubleArrow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RightDoubleArrow, _React$Component);

  function RightDoubleArrow() {
    _classCallCheck(this, RightDoubleArrow);

    return _possibleConstructorReturn(this, _getPrototypeOf(RightDoubleArrow).apply(this, arguments));
  }

  _createClass(RightDoubleArrow, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("svg", {
        width: "29",
        height: "24",
        viewBox: "0 0 29 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        onClick: this.props.onClick
      }, _react["default"].createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M14.0735 7.52558C13.7089 7.17656 13.7089 6.61078 14.0735 6.26176C14.4377 5.91275 15.0289 5.91275 15.3932 6.26176L20.7268 11.3681C21.0911 11.7171 21.0911 12.2829 20.7268 12.6319L15.3932 17.7382C15.0289 18.0873 14.4377 18.0873 14.0735 17.7382C13.7089 17.3892 13.7089 16.8234 14.0735 16.4744L18.7495 11.9974L14.0735 7.52558Z",
        fill: "#777A80"
      }), _react["default"].createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9.07347 7.52558C8.70893 7.17656 8.70893 6.61078 9.07347 6.26176C9.43773 5.91275 10.0289 5.91275 10.3932 6.26176L15.7268 11.3681C16.0911 11.7171 16.0911 12.2829 15.7268 12.6319L10.3932 17.7382C10.0289 18.0873 9.43773 18.0873 9.07347 17.7382C8.70893 17.3892 8.70893 16.8234 9.07347 16.4744L13.7495 11.9974L9.07347 7.52558Z",
        fill: "#777A80"
      }));
    }
  }]);

  return RightDoubleArrow;
}(_react["default"].Component);

RightDoubleArrow.propTypes = {
  onClick: _propTypes["default"].func.isRequired
};
var _default = RightDoubleArrow;
exports["default"] = _default;