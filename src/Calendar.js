import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import DayCell from './DayCell.js';
import getTheme from './styles.js';

function checkRange(dayMoment, range) {
  return (
    dayMoment.isBetween(range['startDate'], range['endDate']) ||
    dayMoment.isBetween(range['endDate'], range['startDate'])
  )
}

function checkStartEdge(dayMoment, range) {
  const { startDate } = range;

  return dayMoment.isSame(startDate);
}

function checkEndEdge(dayMoment, range) {
  const { endDate } = range;

  return dayMoment.isSame(endDate);
}

class Calendar extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, range, theme, offset, firstDayOfWeek } = props;

    const date = parseInput(props.date, format)
    const state = {
      date,
      shownDate : (range && range['endDate'] || date).clone().add(offset, 'months'),
      firstDayOfWeek: (firstDayOfWeek || moment.localeData().firstDayOfWeek()),
    }

    this.state  = state;
    this.styles = getTheme(theme);
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit && onInit(this.state.date);
  }

  getShownDate() {
    const { link, offset } = this.props;

    const shownDate = (link) ? link.clone().add(offset, 'months') : this.state.shownDate;

    return shownDate;
  }

  handleSelect(newDate) {
    const { link, onChange } = this.props;
    const { date } = this.state;

    onChange && onChange(newDate);

    if (!link) {
      this.setState({ date : newDate });
    }
  }

  changeMonth(direction, event) {
    event.preventDefault();
    const { link, linkCB } = this.props;

    if (link && linkCB) {
      return linkCB(direction);
    }

    const current  = this.state.shownDate.month();
    const newMonth = this.state.shownDate.clone().add(direction, 'months');

    this.setState({
      shownDate : newMonth
    });
  }

  renderMonthAndYear() {
    const shownDate  = this.getShownDate();
    const month      = moment.months(shownDate.month());
    const year       = shownDate.year();
    const { styles } = this;

    return (
      <div style={styles['MonthAndYear']} className='rdr-MonthAndYear-innerWrapper'>
        <button
          style={{ ...styles['MonthButton'], float : 'left' }}
          className='rdr-MonthAndYear-button prev'
          onClick={this.changeMonth.bind(this, -1)}>
          <i style={{ ...styles['MonthArrow'], ...styles['MonthArrowPrev'] }}></i>
        </button>
        <span>
          <span className='rdr-MonthAndYear-month'>{month}</span>
          <span className='rdr-MonthAndYear-divider'> - </span>
          <span className='rdr-MonthAndYear-year'>{year}</span>
        </span>
        <button
          style={{ ...styles['MonthButton'], float : 'right' }}
          className='rdr-MonthAndYear-button next'
          onClick={this.changeMonth.bind(this, +1)}>
          <i style={{ ...styles['MonthArrow'], ...styles['MonthArrowNext'] }}></i>
        </button>
      </div>
    )
  }

  renderWeekdays() {
    const dow        = this.state.firstDayOfWeek;
    const weekdays   = [];
    const { styles } = this;

    for (let i = dow; i < 7 + dow; i++) {
      const day = moment.weekdaysMin(i);

      weekdays.push(
        <span style={styles['Weekday']} className='rdr-WeekDay' key={day}>{day}</span>
      );
    }

    return weekdays;
  }

  isDayPassive(monthStart, monthEnd) {

    return (day) => {

      let { disableDay, minDate, maxDate, format } = this.props;

      if(disableDay && typeof disableDay === 'function') {
        return disableDay(day);
      }

      minDate = minDate && parseInput(minDate, format) || monthStart;
      maxDate = maxDate && parseInput(maxDate, format) || monthEnd;

      if(minDate && day.isBefore(minDate)) {
        return true;
      }

      if(maxDate && day.isAfter(maxDate)) {
        return true;
      }

      return false;

    }

  }

  renderDays() {
    // TODO: Split this logic into smaller chunks
    const { styles }               = this;

    const { range }                = this.props;

    const shownDate                = this.getShownDate();
    const { date, firstDayOfWeek } = this.state;
    const dateUnix                 = date.unix();

    const monthNumber              = shownDate.month();
    const dayCount                 = shownDate.daysInMonth();
    const startOfMonth             = shownDate.clone().startOf('month');

    const lastMonth                = shownDate.clone().month(monthNumber - 1);
    const lastMonthNumber          = lastMonth.month();
    const lastMonthDayCount        = lastMonth.daysInMonth();

    const nextMonth                = shownDate.clone().month(monthNumber + 1);
    const nextMonthNumber          = nextMonth.month();

    const days                     = [];

    const diff         = (Math.abs(firstDayOfWeek - (startOfMonth.isoWeekday() + 7)) % 7);
    const startDate    = startOfMonth.clone().add(-diff, 'd');
    const isDayPassive = this.isDayPassive(
      startOfMonth,
      shownDate.clone().endOf('month')
    );

    for(let i = 0; i < 42; i++) {
      const dayMoment = startDate.clone().add(i, 'd');
      days.push({ dayMoment, isPassive: isDayPassive(dayMoment)})
    }

    return days.map((data, index) => {
      const { dayMoment, isPassive } = data;
      const isSelected    = !range && (dayMoment.unix() === dateUnix);
      const isInRange     = range && checkRange(dayMoment, range);
      const isStartEdge    = range && checkStartEdge(dayMoment, range);
      const isEndEdge   = range && checkEndEdge(dayMoment, range);
      const isEdge        = isStartEdge || isEndEdge;

      return (
        <DayCell
          onSelect={ this.handleSelect.bind(this) }
          { ...data }
          theme={ styles }
          isStartEdge = { isStartEdge }
          isEndEdge = { isEndEdge }
          isSelected={ isSelected || isEdge }
          isInRange={ isInRange }
          key={ index }
        />
      );
    })
  }

  render() {
    const { styles } = this;

    return (
      <div style={{ ...styles['Calendar'], ...this.props.style }} className='rdr-Calendar'>
        <div className='rdr-MonthAndYear'>{ this.renderMonthAndYear() }</div>
        <div className='rdr-WeekDays'>{ this.renderWeekdays() }</div>
        <div className='rdr-Days'>{ this.renderDays() }</div>
      </div>
    )
  }
}

Calendar.defaultProps = {
  format    : 'DD/MM/YYYY',
  theme     : {},
}

Calendar.propTypes = {
  sets           : PropTypes.string,
  range          : PropTypes.shape({
    startDate    : PropTypes.object,
    endDate      : PropTypes.object
  }),
  date           : PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  format         : PropTypes.string.isRequired,
  firstDayOfWeek : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange       : PropTypes.func,
  onInit         : PropTypes.func,
  disableDay     : PropTypes.func,
  minDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  maxDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  link           : PropTypes.oneOfType([PropTypes.shape({
    startDate    : PropTypes.object,
    endDate      : PropTypes.object,
  }), PropTypes.bool]),
  linkCB         : PropTypes.func,
  theme          : PropTypes.object,
}

export default Calendar;
