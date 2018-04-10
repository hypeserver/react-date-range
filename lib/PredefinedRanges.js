'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utilsParseInputJs = require('./utils/parseInput.js');

var _utilsParseInputJs2 = _interopRequireDefault(_utilsParseInputJs);

var _stylesJs = require('./styles.js');

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

      this.props.onSelect({
        startDate: (0, _utilsParseInputJs2['default'])(range['startDate'], null, 'startOf'),
        endDate: (0, _utilsParseInputJs2['default'])(range['endDate'], null, 'endOf')
      }, PredefinedRanges);
    }
  }, {
    key: 'renderRangeList',
    value: function renderRangeList(classes) {
      var _this = this;

      var _props = this.props;
      var ranges = _props.ranges;
      var range = _props.range;
      var onlyClasses = _props.onlyClasses;
      var styles = this.styles;

      return Object.keys(ranges).map(function (name) {
        var _classnames;

        var active = (0, _utilsParseInputJs2['default'])(ranges[name].startDate, null, 'startOf').isSame(range.startDate) && (0, _utilsParseInputJs2['default'])(ranges[name].endDate, null, 'endOf').isSame(range.endDate);

        var style = _extends({}, styles['PredefinedRangesItem'], active ? styles['PredefinedRangesItemActive'] : {});

        var predefinedRangeClass = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, classes.predefinedRangesItem, true), _defineProperty(_classnames, classes.predefinedRangesItemActive, active), _classnames));

        return _react2['default'].createElement(
          'a',
          {
            href: '#',
            key: 'range-' + name,
            className: predefinedRangeClass,
            style: onlyClasses ? undefined : style,
            onClick: _this.handleSelect.bind(_this, name)
          },
          name
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var style = _props2.style;
      var onlyClasses = _props2.onlyClasses;
      var classNames = _props2.classNames;
      var styles = this.styles;

      var classes = _extends({}, _stylesJs.defaultClasses, classNames);

      return _react2['default'].createElement(
        'div',
        {
          style: onlyClasses ? undefined : _extends({}, styles['PredefinedRanges'], style),
          className: classes.predefinedRanges
        },
        this.renderRangeList(classes)
      );
    }
  }]);

  return PredefinedRanges;
})(_react.Component);

PredefinedRanges.defaultProps = {
  onlyClasses: false,
  classNames: {}
};

PredefinedRanges.propTypes = {
  ranges: _propTypes2['default'].object.isRequired,
  onlyClasses: _propTypes2['default'].bool,
  classNames: _propTypes2['default'].object
};

exports['default'] = PredefinedRanges;
module.exports = exports['default'];