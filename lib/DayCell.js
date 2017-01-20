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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _stylesJs = require('./styles.js');

var DayCell = (function (_Component) {
  _inherits(DayCell, _Component);

  function DayCell(props, context) {
    _classCallCheck(this, DayCell);

    _get(Object.getPrototypeOf(DayCell.prototype), 'constructor', this).call(this, props, context);

    var specialColors = [];
    var _this = this;
    if (this.props.specialDays) {
      this.props.specialDays.forEach(function (specialDay) {
        var dayInQuestion = _this.props.dayMoment.startOf('day');
        var rangeStart = (0, _moment2['default'])(new Date(specialDay.start)).startOf('day');
        var rangeEnd = (0, _moment2['default'])(new Date(specialDay.end)).startOf('day');
        if (dayInQuestion.isSameOrAfter(rangeStart) && dayInQuestion.isSameOrBefore(rangeEnd)) {
          specialColors.push(specialDay.color);
        }
      });
    }

    this.state = {
      hover: false,
      active: false,
      specialColors: specialColors
    };

    this.styles = this.props.theme;
  }

  _createClass(DayCell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextSpecialColors = [];
      var _this = this;
      if (this.props.specialDays) {
        this.props.specialDays.forEach(function (specialDay) {
          var dayInQuestion = _this.props.dayMoment.startOf('day');
          var rangeStart = (0, _moment2['default'])(new Date(specialDay.start)).startOf('day');
          var rangeEnd = (0, _moment2['default'])(new Date(specialDay.end)).startOf('day');
          if (dayInQuestion.isSameOrAfter(rangeStart) && dayInQuestion.isSameOrBefore(rangeEnd)) {
            nextSpecialColors.push(specialDay.color);
          }
        });
      }
      this.setState({ specialColors: nextSpecialColors });
    }
  }, {
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
      var isStartEdge = _props.isStartEdge;
      var isEndEdge = _props.isEndEdge;
      var dayMoment = _props.dayMoment;
      var isToday = _props.isToday;
      var isSunday = _props.isSunday;
      var styles = this.styles;

      var hoverStyle = hover ? styles['DayHover'] : {};
      var activeStyle = active ? styles['DayActive'] : {};
      var passiveStyle;
      if (this.state.specialColors && this.state.specialColors > 0) {
        passiveStyle = { background: this.state.specialColors[0] };
      } else {
        passiveStyle = isPassive ? styles['DayPassive'] : {};
      }
      var startEdgeStyle = isStartEdge ? styles['DayStartEdge'] : {};
      var endEdgeStyle = isEndEdge ? styles['DayEndEdge'] : {};
      var selectedStyle = isSelected ? styles['DaySelected'] : {};
      var inRangeStyle = isInRange ? styles['DayInRange'] : {};
      var todayStyle = isToday ? styles['DayToday'] : {};
      var sundayStyle = isSunday ? styles['DaySunday'] : {};

      return _extends({}, todayStyle, sundayStyle, inRangeStyle, hoverStyle, passiveStyle, activeStyle, selectedStyle, startEdgeStyle, endEdgeStyle);
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames(classes) {
      var _classnames;

      var _props2 = this.props;
      var isSelected = _props2.isSelected;
      var isInRange = _props2.isInRange;
      var isPassive = _props2.isPassive;
      var isStartEdge = _props2.isStartEdge;
      var isEndEdge = _props2.isEndEdge;
      var isToday = _props2.isToday;
      var isSunday = _props2.isSunday;

      return (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, classes.day, true), _defineProperty(_classnames, classes.dayActive, isSelected), _defineProperty(_classnames, classes.dayPassive, isPassive), _defineProperty(_classnames, classes.dayInRange, isInRange), _defineProperty(_classnames, classes.dayStartEdge, isStartEdge), _defineProperty(_classnames, classes.dayEndEdge, isEndEdge), _defineProperty(_classnames, classes.dayToday, isToday), _defineProperty(_classnames, classes.daySunday, isSunday), _classnames));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var dayMoment = _props3.dayMoment;
      var onlyClasses = _props3.onlyClasses;
      var classNames = _props3.classNames;
      var styles = this.styles;

      var stateStyle = this.getStateStyles();
      var classes = this.getClassNames(classNames);
      var dayWrapperStyles = {
        width: styles['Day'].width,
        height: styles['Day'].height,
        display: styles['Day'].display
      };

      return _react2['default'].createElement(
        'span',
        {
          style: onlyClasses ? undefined : dayWrapperStyles,
          onClick: this.handleSelect.bind(this) },
        _react2['default'].createElement(
          'span',
          {
            onMouseEnter: this.handleMouseEvent.bind(this),
            onMouseLeave: this.handleMouseEvent.bind(this),
            onMouseDown: this.handleMouseEvent.bind(this),
            onMouseUp: this.handleMouseEvent.bind(this),
            className: classes,
            style: onlyClasses ? undefined : _extends({}, styles['Day'], stateStyle) },
          dayMoment.date()
        )
      );
    }
  }]);

  return DayCell;
})(_react.Component);

DayCell.defaultProps = {
  theme: { 'Day': {} },
  onlyClasses: false
};

DayCell.propTypes = {
  dayMoment: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func,
  isSelected: _react.PropTypes.bool,
  isInRange: _react.PropTypes.bool,
  isPassive: _react.PropTypes.bool,
  theme: _react.PropTypes.shape({
    Day: _react.PropTypes.object.isRequired
  }).isRequired,
  onlyClasses: _react.PropTypes.bool,
  classNames: _react.PropTypes.object,
  specialDays: _react.PropTypes.array
};

exports['default'] = DayCell;
module.exports = exports['default'];