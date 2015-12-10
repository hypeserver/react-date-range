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

var _utilsParseInputJs = require('./utils/parseInput.js');

var _utilsParseInputJs2 = _interopRequireDefault(_utilsParseInputJs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var PredefinedRanges = (function (_Component) {
  _inherits(PredefinedRanges, _Component);

  function PredefinedRanges(props, context) {
    _classCallCheck(this, PredefinedRanges);

    _get(Object.getPrototypeOf(PredefinedRanges.prototype), 'constructor', this).call(this, props, context);

    this.styles = this.props.theme;
  }

  _createClass(PredefinedRanges, [{
    key: 'handleSelect',
    value: function handleSelect(name, event) {
      event.preventDefault();

      var range = this.props.ranges[name];

      // BECAUSE FUCK MOMENT
      this.props.onSelect({
        startDate: (0, _utilsParseInputJs2['default'])(range['startDate']),
        endDate: (0, _utilsParseInputJs2['default'])(range['endDate'])
      });
    }
  }, {
    key: 'renderRangeList',
    value: function renderRangeList() {
      var _this = this;

      var ranges = this.props.ranges;
      var styles = this.styles;

      return Object.keys(ranges).map((function (name) {
        return _react2['default'].createElement(
          'a',
          {
            href: '#',
            key: 'range-' + name,
            className: 'rdr-PredefinedRangeItem',
            style: styles['PredefinedRangeItem'],
            onClick: _this.handleSelect.bind(_this, name) },
          name
        );
      }).bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.props.style;
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['PredefinedRanges'], style), className: 'rdr-PredefinedRanges' },
        this.renderRangeList()
      );
    }
  }]);

  return PredefinedRanges;
})(_react.Component);

PredefinedRanges.propTypes = {
  ranges: _react.PropTypes.object.isRequired
};

exports['default'] = PredefinedRanges;
module.exports = exports['default'];