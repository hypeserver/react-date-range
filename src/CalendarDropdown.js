import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput';
import getTheme from './styles.js';
import Calendar from './Calendar';

class CalendarDropdown extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, theme } = props;

    const date = parseInput(props.date, format);
    const state = {
      date,
      isHidden: true
    };

    this.state  = state;
    this.styles = getTheme(theme);
  }

  onChange(newDate) {
    this.setState({date: newDate});
    this.props.onChange(newDate);
  }

  toggleHidden () {
    const { isHidden } = this.state;
    this.setState({isHidden: !isHidden});
  }

  render() {
    const { isHidden, date } = this.state;
    const { format } = this.props;
    const { styles } = this;
    return (
      <div style={{ ...styles['CalendarDropdown'], ...this.props.style }}>
        <div style={styles['DropdownContainer']}>
          <input type='text' style={styles['DropdownInput']} readOnly={true} value={date.format(format).toString()}/>
          <button style={styles['DropdownButton']} onClick={this.toggleHidden.bind(this)}>
            {this.props.children}
          </button>
          <div hidden={isHidden} style={styles['DropdownCalendar']}>
            <Calendar {...this.props} onChange={this.onChange.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default CalendarDropdown;