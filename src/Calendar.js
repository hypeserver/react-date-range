import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import DayCell from './DayCell.js';
import getTheme, { defaultClasses } from './styles.js';

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

  changeMonth(direction) {
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

  renderMonthAndYear(classes) {
    const shownDate       = this.getShownDate();
    const month           = moment.months(shownDate.month());
    const year            = shownDate.year();
    const { styles }      = this;
    const { onlyClasses } = this.props;

    return (
      <div style={!onlyClasses && styles['MonthAndYear']} className={classes.monthAndYearWrapper}>
        <button
          style={!onlyClasses && { ...styles['MonthButton'], float : 'left' }}
          className={classes.prevButton}
          onClick={this.changeMonth.bind(this, -1, false)}>
          <i style={{ ...styles['MonthArrow'], ...styles['MonthArrowPrev'] }}></i>
        </button>
        <span>
          <span className={classes.month}>{month}</span>
          <span className={classes.monthAndYearDivider}> - </span>
          <span className={classes.year}>{year}</span>
        </span>
        <button
          style={!onlyClasses && { ...styles['MonthButton'], float : 'right' }}
          className={classes.nextButton}
          onClick={this.changeMonth.bind(this, +1, false)}>
          <i style={{ ...styles['MonthArrow'], ...styles['MonthArrowNext'] }}></i>
        </button>
      </div>
    )
  }

  renderWeekdays(classes) {
    const dow             = this.state.firstDayOfWeek;
    const weekdays        = [];
    const { styles }      = this;
    const { onlyClasses } = this.props;

    for (let i = dow; i < 7 + dow; i++) {
      const day = moment.weekdaysMin(i);

      weekdays.push(
        <span style={!onlyClasses && styles['Weekday']} className={classes.weekDay} key={day}>{day}</span>
      );
    }

    return weekdays;
  }

  renderDays(classes) {
    // TODO: Split this logic into smaller chunks
    const { styles }               = this;

    const { range, onlyClasses }   = this.props;

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
          onlyClasses = { onlyClasses }
          classNames = { classes }
        />
      );
    })
  }

  render() {
    const { styles, classNames } = this;
    const { onlyClasses }        = this.props;

    const classes = { ...defaultClasses, ...classNames };

    return (
      <div style={ !onlyClasses && { ...styles['Calendar'], ...this.props.style }} className={classes.calendar}>
        <div className={classes.monthAndYear}>{ this.renderMonthAndYear(classes) }</div>
        <div className={classes.weekDays}>{ this.renderWeekdays(classes) }</div>
        <div className={classes.days}>{ this.renderDays(classes) }</div>
      </div>
    )
  }
}

Calendar.defaultProps = {
  format      : 'DD/MM/YYYY',
  theme       : {},
  onlyClasses : false,
  classNames  : {}
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
  onlyClasses    : PropTypes.bool,
  classNames     : PropTypes.object
}

export default Calendar;
