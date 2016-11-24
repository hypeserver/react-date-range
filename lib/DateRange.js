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

var _utilsParseInputJs = require('./utils/parseInput.js');

var _utilsParseInputJs2 = _interopRequireDefault(_utilsParseInputJs);

var _CalendarJs = require('./Calendar.js');

var _CalendarJs2 = _interopRequireDefault(_CalendarJs);

var _PredefinedRangesJs = require('./PredefinedRanges.js');

var _PredefinedRangesJs2 = _interopRequireDefault(_PredefinedRangesJs);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var DateRange = (function (_Component) {
  _inherits(DateRange, _Component);

  function DateRange(props, context) {
    _classCallCheck(this, DateRange);

    _get(Object.getPrototypeOf(DateRange.prototype), 'constructor', this).call(this, props, context);

    var format = props.format;
    var linkedCalendars = props.linkedCalendars;
    var theme = props.theme;

    var startDate = (0, _utilsParseInputJs2['default'])(props.startDate, format);
    var endDate = (0, _utilsParseInputJs2['default'])(props.endDate, format);

    this.state = {
      range: { startDate: startDate, endDate: endDate },
      link: linkedCalendars && endDate
    };

    this.step = 0;
    this.styles = (0, _stylesJs2['default'])(theme);
  }

  _createClass(DateRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.range);
    }
  }, {
    key: 'orderRange',
    value: function orderRange(range) {
      var startDate = range.startDate;
      var endDate = range.endDate;

      var swap = startDate.isAfter(endDate);

      if (!swap) return range;

      return {
        startDate: endDate,
        endDate: startDate
      };
    }
  }, {
    key: 'setRange',
    value: function setRange(range, source) {
      var onChange = this.props.onChange;

      range = this.orderRange(range);

      this.setState({ range: range });

      onChange && onChange(range, source);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(date, source) {
      if (date.startDate && date.endDate) {
        this.step = 0;
        return this.setRange(date, source);
      }

      var _state$range = this.state.range;
      var startDate = _state$range.startDate;
      var endDate = _state$range.endDate;

      var range = {
        startDate: startDate,
        endDate: endDate
      };

      switch (this.step) {
        case 0:
          range['startDate'] = date;
          range['endDate'] = date;
          this.step = 1;
          break;

        case 1:
          range['endDate'] = date;
          this.step = 0;
          break;
      }

      this.setRange(range, source);
    }
  }, {
    key: 'handleLinkChange',
    value: function handleLinkChange(direction) {
      var link = this.state.link;

      this.setState({
        link: link.clone().add(direction, 'months')
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // Whenever date props changes, update state with parsed variant
      if (newProps.startDate || newProps.endDate) {
        var format = newProps.format || this.props.format;
        var startDate = newProps.startDate && (0, _utilsParseInputJs2['default'])(newProps.startDate, format);
        var endDate = newProps.endDate && (0, _utilsParseInputJs2['default'])(newProps.endDate, format);
        var oldStartDate = this.props.startDate && (0, _utilsParseInputJs2['default'])(this.props.startDate, format);
        var oldEndDate = this.props.endDate && (0, _utilsParseInputJs2['default'])(this.props.endDate, format);

        if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
          this.setRange({
            startDate: startDate || oldStartDate,
            endDate: endDate || oldEndDate
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props = this.props;
      var ranges = _props.ranges;
      var format = _props.format;
      var linkedCalendars = _props.linkedCalendars;
      var style = _props.style;
      var calendars = _props.calendars;
      var firstDayOfWeek = _props.firstDayOfWeek;
      var minDate = _props.minDate;
      var maxDate = _props.maxDate;
      var classNames = _props.classNames;
      var onlyClasses = _props.onlyClasses;
      var lang = _props.lang;
      var disableDaysBeforeToday = _props.disableDaysBeforeToday;
      var offsetPositive = _props.offsetPositive;
      var shownDate = _props.shownDate;
      var showMonthArrow = _props.showMonthArrow;
      var _state = this.state;
      var range = _state.range;
      var link = _state.link;
      var styles = this.styles;

      var classes = _extends({}, _stylesJs.defaultClasses, classNames);

      return _react2['default'].createElement(
        'div',
        { style: onlyClasses ? undefined : _extends({}, styles['DateRange'], style), className: classes.dateRange },
        ranges && _react2['default'].createElement(_PredefinedRangesJs2['default'], {
          format: format,
          ranges: ranges,
          range: range,
          theme: styles,
          onSelect: this.handleSelect.bind(this),
          onlyClasses: onlyClasses,
          classNames: classes }),
        (function () {
          var _calendars = [];
          var _method = offsetPositive ? 'unshift' : 'push';
          for (var i = Number(calendars) - 1; i >= 0; i--) {
            _calendars[_method](_react2['default'].createElement(_CalendarJs2['default'], {
              showMonthArrow: showMonthArrow,
              shownDate: shownDate,
              disableDaysBeforeToday: disableDaysBeforeToday,
              lang: lang,
              key: i,
              offset: offsetPositive ? i : -i,
              link: linkedCalendars && link,
              linkCB: _this.handleLinkChange.bind(_this),
              range: range,
              format: format,
              firstDayOfWeek: firstDayOfWeek,
              theme: styles,
              minDate: minDate,
              maxDate: maxDate,
              onlyClasses: onlyClasses,
              classNames: classes,
              onChange: _this.handleSelect.bind(_this) }));
          }
          return _calendars;
        })()
      );
    }
  }]);

  return DateRange;
})(_react.Component);

DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: 'DD/MM/YYYY',
  calendars: 2,
  onlyClasses: false,
  offsetPositive: false,
  classNames: {}
};

DateRange.propTypes = {
  format: _react.PropTypes.string,
  firstDayOfWeek: _react.PropTypes.number,
  calendars: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  startDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  endDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  dateLimit: _react.PropTypes.func,
  ranges: _react.PropTypes.object,
  linkedCalendars: _react.PropTypes.bool,
  theme: _react.PropTypes.object,
  onInit: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onlyClasses: _react.PropTypes.bool,
  offsetPositive: _react.PropTypes.bool,
  classNames: _react.PropTypes.object
};

exports['default'] = DateRange;
module.exports = exports['default'];