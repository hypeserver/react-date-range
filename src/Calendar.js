import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import DayCell from './DayCell.js';
import LangDic from './LangDic.js';
import getTheme, { defaultClasses } from './styles.js';

function checkRange(dayMoment, range) {
  return (
    dayMoment.isBetween(range['startDate'], range['endDate']) ||
    dayMoment.isBetween(range['endDate'], range['startDate'])
  )
}

function checkStartEdge(dayMoment, range) {
  const { startDate } = range;

  return dayMoment.startOf('day').isSame(startDate.startOf('day'));
}

function checkEndEdge(dayMoment, range) {
  const { endDate } = range;

  return dayMoment.endOf('day').isSame(endDate.endOf('day'));
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return (
    (minDate && dayMoment.isBefore(parseInput(minDate, format, 'startOf'))) ||
    (maxDate && dayMoment.isAfter(parseInput(maxDate, format, 'endOf')))
  )
}

class Calendar extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, range, theme, offset, firstDayOfWeek, locale, shownDate } = props;

    if(locale) {
      moment.locale(locale);
    }

    const date = props.date && parseInput(props.date, format, 'startOf');
    const state = {
      date,
      shownDate : (shownDate || range && range['endDate'] || date || moment().startOf('day')).clone().add(offset, 'months'),
      firstDayOfWeek: (firstDayOfWeek || moment.localeData().firstDayOfWeek()),
    }

    this.state  = state;
    this.styles = getTheme(theme);
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit && onInit(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    const { range, offset } = nextProps;
    const oldRange = this.props.oldRange;

    if ((range && range['endDate'] && !range['endDate'].isSame(range['startDate'], "day")) || (oldRange && !oldRange["startDate"].isSame(range["startDate"]))) {
      this.setState({ shownDate : range['endDate'].clone().add(offset, 'months') })
    }
  }

  getShownDate() {
    const { link, offset } = this.props;

    const shownDate = (link) ? link.clone().add(offset, 'months') : this.state.shownDate;

    return shownDate;
  }

  handleSelect(newDate) {
    const { link, onChange } = this.props;

    onChange && onChange(newDate, Calendar);

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

  renderMonthAndYear(classes) {
    const shownDate       = this.getShownDate();
    let month           = moment.months(shownDate.month());
    const year            = shownDate.year();
    const { styles }      = this;
    const { onlyClasses, lang, showMonthArrow} = this.props;

    let monthLower = month.toLowerCase()
    month = (lang && LangDic[lang] && LangDic[lang][monthLower]) ? LangDic[lang][monthLower] : month;

    return (
      <div style={onlyClasses ? undefined : styles['MonthAndYear']} className={classes.monthAndYearWrapper}>
        {
          showMonthArrow ?
          <button
            type="button"
            style={onlyClasses ? undefined : { ...styles['MonthButton'], float : 'left' }}
            className={classes.prevButton}
            onClick={this.changeMonth.bind(this, -1)}>
            <i style={onlyClasses ? undefined : { ...styles['MonthArrow'], ...styles['MonthArrowPrev'] }}></i>
          </button> : null
        }
        <span>
          <span className={classes.month}>{month}</span>
          <span className={classes.monthAndYearDivider}> - </span>
          <span className={classes.year}>{year}</span>
        </span>
        {
          showMonthArrow ?
          <button
            type="button"
            style={onlyClasses ? undefined : { ...styles['MonthButton'], float : 'right' }}
            className={classes.nextButton}
            onClick={this.changeMonth.bind(this, +1)}>
            <i style={onlyClasses ? undefined : { ...styles['MonthArrow'], ...styles['MonthArrowNext'] }}></i>
          </button> : null
        }
      </div>
    )
  }

  renderWeekdays(classes) {
    const dow             = this.state.firstDayOfWeek;
    const weekdays        = [];
    const { styles }      = this;
    const { onlyClasses, lang } = this.props;

    for (let i = dow; i < 7 + dow; i++) {
      let day = moment.weekdaysMin(i);
      let dayLower = day.toLowerCase();
      day = (lang && LangDic[lang] && LangDic[lang][dayLower]) ? LangDic[lang][dayLower] : day;
      weekdays.push(
        <span style={onlyClasses ? undefined : styles['Weekday']} className={classes.weekDay} key={i + day}>{day}</span>
      );
    }

    return weekdays;
  }

  renderDays(classes) {
    // TODO: Split this logic into smaller chunks
    const { styles }               = this;

    const { range, minDate, maxDate, format, onlyClasses, disableDaysBeforeToday, specialDays } = this.props;

    const shownDate                = this.getShownDate();
    const { date, firstDayOfWeek } = this.state;
    const dateUnix                 = date && date.unix();

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
    for (let i = diff-1; i >= 0; i--) {
      const dayMoment  = lastMonth.clone().date(lastMonthDayCount - i);
      days.push({ dayMoment, isPassive : true });
    }

    // Current month's days
    for (let i = 1; i <= dayCount; i++) {
      const dayMoment  = shownDate.clone().date(i);
      // set days before today to isPassive
      var _today = moment()
      if (disableDaysBeforeToday && Number(dayMoment.diff(_today,"days")) <= -1) {
        days.push({ dayMoment ,isPassive:true});
      } else {
        days.push({ dayMoment });
      }
    }

    // Next month's days
    const remainingCells = 42 - days.length; // 42cells = 7days * 6rows
    for (let i = 1; i <= remainingCells; i++ ) {
      const dayMoment  = nextMonth.clone().date(i);
      days.push({ dayMoment, isPassive : true });
    }

    const today = moment().startOf('day');
    return days.map((data, index) => {
      const { dayMoment, isPassive } = data;
      const isSelected    = !range && (dayMoment.unix() === dateUnix);
      const isInRange     = range && checkRange(dayMoment, range);
      const isStartEdge   = range && checkStartEdge(dayMoment, range);
      const isEndEdge     = range && checkEndEdge(dayMoment, range);
      const isEdge        = isStartEdge || isEndEdge;
      const isToday       = today.isSame(dayMoment);
      const isSunday      = dayMoment.day() === 0;
      const isSpecialDay  = specialDays && specialDays.some((specialDay) => {
        return dayMoment.endOf('day').isSame(specialDay.date.endOf('day'));
      });
      const isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);

      return (
        <DayCell
          onSelect={ this.handleSelect.bind(this) }
          { ...data }
          theme={ styles }
          isStartEdge = { isStartEdge }
          isEndEdge = { isEndEdge }
          isSelected={ isSelected || isEdge }
          isInRange={ isInRange }
          isSunday={ isSunday }
          isSpecialDay={ isSpecialDay }
          isToday={ isToday }
          key={ index }
          isPassive = { isPassive || isOutsideMinMax }
          onlyClasses = { onlyClasses }
          classNames = { classes }
        />
      );
    })
  }

  render() {
    const { styles } = this;
    const { onlyClasses, classNames } = this.props;

    const classes = { ...defaultClasses, ...classNames };

    return (
      <div style={onlyClasses ? undefined : { ...styles['Calendar'], ...this.props.style }} className={classes.calendar}>
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
  showMonthArrow: true,
  disableDaysBeforeToday: false,
  onlyClasses : false,
  classNames  : {},
  specialDays : [],
}

Calendar.propTypes = {
  showMonthArrow : PropTypes.bool,
  disableDaysBeforeToday : PropTypes.bool,
  lang           : PropTypes.string,
  sets           : PropTypes.string,
  range          : PropTypes.shape({
    startDate    : PropTypes.object,
    endDate      : PropTypes.object
  }),
  minDate        : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  maxDate        : PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
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
  specialDays    : PropTypes.array,
  classNames     : PropTypes.object,
  locale         : PropTypes.string
}

export default Calendar;
