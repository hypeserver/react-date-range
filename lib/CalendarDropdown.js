'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilsParseInput = require('./utils/parseInput');

var _utilsParseInput2 = _interopRequireDefault(_utilsParseInput);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var CalendarDropdown = (function (_Component) {
  _inherits(CalendarDropdown, _Component);

  function CalendarDropdown(props, context) {
    _classCallCheck(this, CalendarDropdown);

    _get(Object.getPrototypeOf(CalendarDropdown.prototype), 'constructor', this).call(this, props, context);

    var format = props.format;
    var theme = props.theme;

    var date = (0, _utilsParseInput2['default'])(props.date, format);
    var state = {
      date: date,
      isHidden: true
    };

    this.state = state;
    this.styles = (0, _stylesJs2['default'])(theme);
  }

  _createClass(CalendarDropdown, [{
    key: 'onChange',
    value: function onChange(newDate) {
      this.setState({ date: newDate });
      this.props.onChange(newDate);
    }
  }, {
    key: 'toggleHidden',
    value: function toggleHidden() {
      var isHidden = this.state.isHidden;

      this.setState({ isHidden: !isHidden });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isHidden = _state.isHidden;
      var date = _state.date;
      var format = this.props.format;
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['CalendarDropdown'], this.props.style) },
        _react2['default'].createElement(
          'div',
          { style: styles['DropdownContainer'] },
          _react2['default'].createElement('input', { type: 'text', style: styles['DropdownInput'], readOnly: true, value: date.format(format).toString() }),
          _react2['default'].createElement(
            'button',
            { style: styles['DropdownButton'], onClick: this.toggleHidden.bind(this) },
            this.props.children
          ),
          _react2['default'].createElement(
            'div',
            { hidden: isHidden, style: styles['DropdownCalendar'] },
            _react2['default'].createElement(_Calendar2['default'], _extends({}, this.props, { onChange: this.onChange.bind(this) }))
          )
        )
      );
    }
  }]);

  return CalendarDropdown;
})(_react.Component);

exports['default'] = CalendarDropdown;
module.exports = exports['default'];