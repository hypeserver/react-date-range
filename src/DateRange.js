import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import Calendar from './Calendar.js';
import PredefinedRanges from './PredefinedRanges.js';
import getTheme from './styles.js';

class DateRange extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, linkedCalendars, theme } = props;

    const startDate = parseInput(props.startDate, format);
    const endDate   = parseInput(props.endDate, format);

    this.state = {
      range     : { startDate, endDate },
      link      : linkedCalendars && endDate,
    }

    this.step = 0;
    this.styles = getTheme(theme);
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit && onInit(this.state.range);
  }

  orderRange(range) {
    const { startDate, endDate } = range;
    const swap = startDate.isAfter(endDate);

    if (!swap) return range;

    return {
      startDate : endDate,
      endDate   : startDate
    }
  }

  setRange(range) {
    const { onChange } = this.props
    range = this.orderRange(range);

    this.setState({ range });

    onChange && onChange(range);
  }

  handleSelect(date) {
    //TODO: Improve this logic.

    if (date.startDate && date.endDate) {
      this.step = 0;
      return this.setRange(date);
    }

    const { startDate, endDate } = this.state.range;

    const range = {
      startDate : startDate,
      endDate   : endDate
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

    this.setRange(range);
  }

  handleLinkChange(direction) {
    const { link } = this.state;

    this.setState({
      link : link.clone().add(direction, 'months')
    });
  }

  componentWillReceiveProps(newProps) {
    // Whenever date props changes, update state with parsed variant
    if (newProps.startDate || newProps.endDate) {
      const format       = newProps.format || this.props.format;
      const startDate    = newProps.startDate   && parseInput(newProps.startDate, format);
      const endDate      = newProps.endDate     && parseInput(newProps.endDate, format);
      const oldStartDate = this.props.startDate && parseInput(this.props.startDate, format);
      const oldEndDate   = this.props.endDate   && parseInput(this.props.endDate, format);

      if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
        this.setRange({
          startDate: startDate || oldStartDate,
          endDate: endDate || oldEndDate
        }, {silent: true});
      }
    }
  }

  render() {
    const { ranges, format, linkedCalendars, style, calendars, firstDayOfWeek } = this.props;
    const { range, link } = this.state;
    const { styles } = this;

    return (
      <div style={{ ...styles['DateRange'], ...style }} className='rdr-DateRange'>
        { ranges && (
          <PredefinedRanges
            format={ format }
            ranges={ ranges }
            theme={ styles }
            onSelect={this.handleSelect.bind(this)} />
        )}

        {()=>{
          const _calendars = [];
          for (var i = Number(calendars) - 1; i >= 0; i--) {
            _calendars.push(
              <Calendar
                key={i}
                offset={ -i }
                link={ linkedCalendars && link }
                linkCB={ this.handleLinkChange.bind(this) }
                range={ range }
                format={ format }
                firstDayOfWeek={ firstDayOfWeek }
                theme={ styles }
                onChange={ this.handleSelect.bind(this) }  />
            );
          }
          return _calendars;
        }()}
      </div>
    );
  }
}

DateRange.defaultProps = {
  linkedCalendars : false,
  theme           : {},
  format          : 'DD/MM/YYYY',
  calendars       : 2
}

DateRange.propTypes = {
  format          : PropTypes.string,
  firstDayOfWeek  : PropTypes.number,
  calendars       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate       : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  endDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  minDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  maxDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  dateLimit       : PropTypes.func,
  ranges          : PropTypes.object,
  linkedCalendars : PropTypes.bool,
  theme           : PropTypes.object,
  onInit          : PropTypes.func,
  onChange        : PropTypes.func,
}

export default DateRange;
