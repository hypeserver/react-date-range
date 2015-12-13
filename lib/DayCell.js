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

var DayCell = (function (_Component) {
  _inherits(DayCell, _Component);

  function DayCell(props, context) {
    _classCallCheck(this, DayCell);

    _get(Object.getPrototypeOf(DayCell.prototype), 'constructor', this).call(this, props, context);

    this.state = {
      hover: false,
      active: false
    };

    this.styles = this.props.theme;
  }

  _createClass(DayCell, [{
    key: 'handleMouseEvent',
    value: function handleMouseEvent(event) {
      event.preventDefault();

      if (this.props.isPassive) return null;

      var newState = {};

      switch (event.type) {
        case 'mouseenter':
          newState['hover'] = true;
          break;

        case 'mouseup':
        case 'mouseleave':
          newState['hover'] = false;
          newState['active'] = false;
          break;

        case 'mousedown':
          newState['active'] = true;
          break;
      }

      this.setState(newState);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(event) {
      event.preventDefault();

      if (this.props.isPassive) return null;

      this.props.onSelect(this.props.dayMoment);
    }
  }, {
    key: 'getStateStyles',
    value: function getStateStyles() {
      var _state = this.state;
      var hover = _state.hover;
      var active = _state.active;
      var _props = this.props;
      var isSelected = _props.isSelected;
      var isInRange = _props.isInRange;
      var isPassive = _props.isPassive;
      var dayMoment = _props.dayMoment;
      var isToday = _props.isToday;
      var styles = this.styles;

      var hoverStyle = hover ? styles['DayHover'] : {};
      var activeStyle = active ? styles['DayActive'] : {};
      var passiveStyle = isPassive ? styles['DayPassive'] : {};
      var selectedStyle = isSelected ? styles['DaySelected'] : {};
      var inRangeStyle = isInRange ? styles['DayInRange'] : {};
      var todayStyle = isToday ? styles['DayToday'] : {};

      return _extends({}, todayStyle, inRangeStyle, hoverStyle, passiveStyle, activeStyle, selectedStyle);
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var _props2 = this.props;
      var isSelected = _props2.isSelected;
      var isInRange = _props2.isInRange;
      var isPassive = _props2.isPassive;
      var isToday = _props2.isToday;

      var classNames = 'rdr-Day ';

      classNames = isToday ? classNames + 'is-today ' : classNames;
      classNames = isSelected ? classNames + 'is-selected ' : classNames;
      classNames = isInRange ? classNames + 'is-inRange ' : classNames;
      classNames = isPassive ? classNames + 'is-passive ' : classNames;

      return classNames;
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;
      var dayMoment = this.props.dayMoment;

      var stateStyle = this.getStateStyles();
      var classNames = this.getClassNames();

      return _react2['default'].createElement(
        'span',
        {
          onMouseEnter: this.handleMouseEvent.bind(this),
          onMouseLeave: this.handleMouseEvent.bind(this),
          onMouseDown: this.handleMouseEvent.bind(this),
          onMouseUp: this.handleMouseEvent.bind(this),
          onClick: this.handleSelect.bind(this),
          className: classNames,
          style: _extends({}, styles['Day'], stateStyle) },
        dayMoment.date()
      );
    }
  }]);

  return DayCell;
})(_react.Component);

DayCell.defaultProps = {
  theme: { 'Day': {} }
};

DayCell.propTypes = {
  dayMoment: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func,
  isSelected: _react.PropTypes.bool,
  isInRange: _react.PropTypes.bool,
  isPassive: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    Day: _react.PropTypes.object.isRequired
  }).isRequired
};

exports['default'] = DayCell;
module.exports = exports['default'];