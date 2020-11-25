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

var LeftDoubleArrow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LeftDoubleArrow, _React$Component);

  function LeftDoubleArrow() {
    _classCallCheck(this, LeftDoubleArrow);

    return _possibleConstructorReturn(this, _getPrototypeOf(LeftDoubleArrow).apply(this, arguments));
  }

  _createClass(LeftDoubleArrow, [{
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
        d: "M14.9265 7.52558C15.2911 7.17656 15.2911 6.61078 14.9265 6.26176C14.5623 5.91275 13.9711 5.91275 13.6068 6.26176L8.2732 11.3681C7.90893 11.7171 7.90893 12.2829 8.2732 12.6319L13.6068 17.7382C13.9711 18.0873 14.5623 18.0873 14.9265 17.7382C15.2911 17.3892 15.2911 16.8234 14.9265 16.4744L10.2505 11.9974L14.9265 7.52558Z",
        fill: "#777A80"
      }), _react["default"].createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M19.9265 7.52558C20.2911 7.17656 20.2911 6.61078 19.9265 6.26176C19.5623 5.91275 18.9711 5.91275 18.6068 6.26176L13.2732 11.3681C12.9089 11.7171 12.9089 12.2829 13.2732 12.6319L18.6068 17.7382C18.9711 18.0873 19.5623 18.0873 19.9265 17.7382C20.2911 17.3892 20.2911 16.8234 19.9265 16.4744L15.2505 11.9974L19.9265 7.52558Z",
        fill: "#777A80"
      }));
    }
  }]);

  return LeftDoubleArrow;
}(_react["default"].Component);

LeftDoubleArrow.propTypes = {
  onClick: _propTypes["default"].func.isRequired
};
var _default = LeftDoubleArrow;
exports["default"] = _default;