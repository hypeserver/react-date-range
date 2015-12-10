import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { calendarImage } from './images';
import parseInput from './utils/parseInput';
import getTheme from './styles.js';
import Calendar from './Calendar';

class CalendarDropdown extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, theme, buttonImage } = props;

    const date = parseInput(props.date, format);
    const state = {
      date,
      isHidden: true
    };

    this.state  = state;
    this.styles = getTheme(theme);
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit && onInit(this.state.date);
  }

  onChange(newDate) {
    this.setState({date: newDate});
    this.props.onChange(newDate);
  }

  toggleHidden (event) {
    event.preventDefault();
    const { isHidden } = this.state;
    this.setState({isHidden: !isHidden});
  }

  render() {
    const { isHidden, date } = this.state;
    const { format, buttonImage } = this.props;
    const { styles } = this;
    return (
      <div style={{ ...styles['CalendarDropdown'], ...this.props.style }} className='rdr-CalendarDropdown'>
        <div style={styles['DropdownContainer']} className='rdr-DropdownContainer'>
          <input type='text' style={styles['DropdownInput']} className='rdr-DropdownInput' readOnly={true} value={date.format(format).toString()}/>
          <button style={styles['DropdownButton']} className='rdr-DropdownButton' onClick={this.toggleHidden.bind(this)}>
            <img src={buttonImage} style={styles['DropdownButtonImage']} className='rdr-DropdownButtonImage'/>
          </button>
          <div hidden={isHidden} style={styles['DropdownCalendar']} className='rdr-DropdownCalendar'>
            <Calendar {...this.props} onChange={this.onChange.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

CalendarDropdown.defaultProps = {
  format        : 'DD/MM/YYYY',
  theme         : {},
  buttonImage   : calendarImage
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
  buttonImage    : PropTypes.string,
}

export default CalendarDropdown;