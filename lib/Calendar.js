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

var _DayCellJs = require('./DayCell.js');

var _DayCellJs2 = _interopRequireDefault(_DayCellJs);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkEdges(dayMoment, range) {
  var endDate = range.endDate;
  var startDate = range.startDate;

  return dayMoment.isSame(endDate) || dayMoment.isSame(startDate);
}

function isOusideMinMax(dayMoment, minDate, maxDate) {
  return minDate && dayMoment.isBefore(minDate) || maxDate && dayMoment.isAfter(maxDate);
}

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props, context);

    var format = props.format;
    var range = props.range;
    var theme = props.theme;
    var offset = props.offset;
    var firstDayOfWeek = props.firstDayOfWeek;

    var date = (0, _utilsParseInputJs2['default'])(props.date, format);
    var state = {
      date: date,
      shownDate: (range && range['endDate'] || date).clone().add(offset, 'months'),
      firstDayOfWeek: firstDayOfWeek || _moment2['default'].localeData().firstDayOfWeek()
    };

    this.state = state;
    this.styles = (0, _stylesJs2['default'])(theme);
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.date);
    }
  }, {
    key: 'getShownDate',
    value: function getShownDate() {
      var _props = this.props;
      var link = _props.link;
      var offset = _props.offset;

      var shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

      return shownDate;
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(newDate) {
      var _props2 = this.props;
      var link = _props2.link;
      var onChange = _props2.onChange;
      var date = this.state.date;

      onChange && onChange(newDate);

      if (!link) {
        this.setState({ date: newDate });
      }
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var _props3 = this.props;
      var link = _props3.link;
      var linkCB = _props3.linkCB;

      if (link && linkCB) {
        return linkCB(direction);
      }

      var current = this.state.shownDate.month();
      var newMonth = this.state.shownDate.clone().add(direction, 'months');

      this.setState({
        shownDate: newMonth
      });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear() {
      var shownDate = this.getShownDate();
      var month = _moment2['default'].months(shownDate.month());
      var year = shownDate.year();
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: styles['MonthAndYear'], className: 'rdr-MonthAndYear-innerWrapper' },
        _react2['default'].createElement(
          'button',
          {
            style: _extends({}, styles['MonthButton'], { float: 'left' }),
            className: 'rdr-MonthAndYear-button prev',
            onClick: this.changeMonth.bind(this, -1) },
          _react2['default'].createElement('i', { style: _extends({}, styles['MonthArrow'], styles['MonthArrowPrev']) })
        ),
        _react2['default'].createElement(
          'span',
          null,
          _react2['default'].createElement(
            'span',
            { className: 'rdr-MonthAndYear-month' },
            month
          ),
          _react2['default'].createElement(
            'span',
            { className: 'rdr-MonthAndYear-divider' },
            ' - '
          ),
          _react2['default'].createElement(
            'span',
            { className: 'rdr-MonthAndYear-year' },
            year
          )
        ),
        _react2['default'].createElement(
          'button',
          {
            style: _extends({}, styles['MonthButton'], { float: 'right' }),
            className: 'rdr-MonthAndYear-button next',
            onClick: this.changeMonth.bind(this, +1) },
          _react2['default'].createElement('i', { style: _extends({}, styles['MonthArrow'], styles['MonthArrowNext']) })
        )
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      var styles = this.styles;

      for (var i = dow; i < 7 + dow; i++) {
        var day = _moment2['default'].weekdaysMin(i);

        weekdays.push(_react2['default'].createElement(
          'span',
          { style: styles['Weekday'], className: 'rdr-WeekDay', key: day },
          day
        ));
      }

      return weekdays;
    }
  }, {
    key: 'renderDays',
    value: function renderDays() {
      var _this = this;

      // TODO: Split this logic into smaller chunks
      var styles = this.styles;
      var _props4 = this.props;
      var range = _props4.range;
      var minDate = _props4.minDate;
      var maxDate = _props4.maxDate;

      var shownDate = this.getShownDate();
      var _state = this.state;
      var date = _state.date;
      var firstDayOfWeek = _state.firstDayOfWeek;

      var dateUnix = date.unix();

      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();

      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthNumber = lastMonth.month();
      var lastMonthDayCount = lastMonth.daysInMonth();

      var nextMonth = shownDate.clone().month(monthNumber + 1);
      var nextMonthNumber = nextMonth.month();

      var days = [];

      // Previous month's days
      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
      for (var i = diff - 1; i >= 0; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      // Current month's days
      for (var i = 1; i <= dayCount; i++) {
        var dayMoment = shownDate.clone().date(i);
        days.push({ dayMoment: dayMoment });
      }

      // Next month's days
      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows
      for (var i = 1; i <= remainingCells; i++) {
        var dayMoment = nextMonth.clone().date(i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      return days.map(function (data, index) {
        var dayMoment = data.dayMoment;
        var isPassive = data.isPassive;

        var isSelected = !range && dayMoment.unix() === dateUnix;
        var isInRange = range && checkRange(dayMoment, range);
        var isEdge = range && checkEdges(dayMoment, range);
        var isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate);

        return _react2['default'].createElement(_DayCellJs2['default'], _extends({
          onSelect: _this.handleSelect.bind(_this)
        }, data, {
          theme: styles,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,
          key: index,
          isPassive: isPassive || isOutsideMinMax
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['Calendar'], this.props.style), className: 'rdr-Calendar' },
        _react2['default'].createElement(
          'div',
          { className: 'rdr-MonthAndYear' },
          this.renderMonthAndYear()
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rdr-WeekDays' },
          this.renderWeekdays()
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rdr-Days' },
          this.renderDays()
        )
      );
    }
  }]);

  return Calendar;
})(_react.Component);

Calendar.defaultProps = {
  format: 'DD/MM/YYYY',
  theme: {}
};

Calendar.propTypes = {
  sets: _react.PropTypes.string,
  range: _react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  date: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.func]),
  format: _react.PropTypes.string.isRequired,
  firstDayOfWeek: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  onChange: _react.PropTypes.func,
  onInit: _react.PropTypes.func,
  link: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }), _react.PropTypes.bool]),
  linkCB: _react.PropTypes.func,
  theme: _react.PropTypes.object
};

exports['default'] = Calendar;
module.exports = exports['default'];