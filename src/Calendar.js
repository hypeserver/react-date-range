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

function checkEdges(dayMoment, range) {
  const { endDate, startDate } = range;

  return (
    dayMoment.isSame(endDate) ||
    dayMoment.isSame(startDate)
  )
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

  renderDays() {
    // TODO: Split this logic into smaller chunks
    const { styles }               = this;

    const { range }                = this.props;

    const shownDate                = this.getShownDate();
    const { date, firstDayOfWeek } = this.state;
    const dateUnix                 = date.unix();

    const monthNumber              = shownDate.month();
    const dayCount                 = shownDate.daysInMonth();
    const startOfMonth             = shownDate.clone().startOf('month').isoWeekday();

    const lastMonth                = shownDate.clone().month(monthNumber - 1);
    const lastMonthNumber          = lastMonth.month();
    const lastMonthDayCount        = lastMonth.daysInMonth();

    const nextMonth                = shownDate.clone().month(monthNumber + 1);
    const nextMonthNumber          = nextMonth.month();

    const days                     = [];

    // Previous month's days
    const diff = (Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7);
    for (let i = diff; i >= 1; i--) {
      const dayMoment  = lastMonth.clone().date(lastMonthDayCount - i);
      days.push({ dayMoment, isPassive : true });
    }

    // Current month's days
    for (let i = 1; i <= dayCount; i++) {
      const dayMoment  = shownDate.clone().date(i);
      days.push({ dayMoment });
    }

    // Next month's days
    const remainingCells = 42 - days.length; // 42cells = 7days * 6rows
    for (let i = 1; i <= remainingCells; i++ ) {
      const dayMoment  = nextMonth.clone().date(i);
      days.push({ dayMoment, isPassive : true });
    }

    return days.map((data, index) => {
      const { dayMoment, isPassive } = data;
      const isSelected    = !range && (dayMoment.unix() === dateUnix);
      const isInRange     = range && checkRange(dayMoment, range);
      const isEdge        = range && checkEdges(dayMoment, range);

      return (
        <DayCell
          onSelect={ this.handleSelect.bind(this) }
          { ...data }
          theme={ styles }
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
  link           : PropTypes.oneOfType([PropTypes.shape({
    startDate    : PropTypes.object,
    endDate      : PropTypes.object,
  }), PropTypes.bool]),
  linkCB         : PropTypes.func,
  theme          : PropTypes.object,
}

export default Calendar;
