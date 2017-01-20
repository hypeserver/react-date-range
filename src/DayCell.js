import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment'

import { defaultClasses } from './styles.js';

class DayCell extends Component {

  constructor(props, context) {
    super(props, context);

    var specialColors = []
    var _this = this
    if (this.props.specialDays) {
      this.props.specialDays.forEach(function(specialDay) {
        var dayInQuestion = _this.props.dayMoment.startOf('day')
        var rangeStart = moment(new Date(specialDay.start)).startOf('day')
        var rangeEnd = moment(new Date(specialDay.end)).startOf('day')
        if (dayInQuestion.isSameOrAfter(rangeStart) && dayInQuestion.isSameOrBefore(rangeEnd)) {
          specialColors.push(specialDay.color)
        }
      })
    }

    this.state = {
      hover         : false,
      active        : false,
      specialColors : specialColors
    }

    this.styles = this.props.theme;
  }

  componentWillReceiveProps(nextProps) {
    var nextSpecialColors = []
    var _this = this
    if (this.props.specialDays) {
      this.props.specialDays.forEach(function(specialDay) {
        var dayInQuestion = _this.props.dayMoment.startOf('day')
        var rangeStart = moment(new Date(specialDay.start)).startOf('day')
        var rangeEnd = moment(new Date(specialDay.end)).startOf('day')
        if (dayInQuestion.isSameOrAfter(rangeStart) && dayInQuestion.isSameOrBefore(rangeEnd)) {
          nextSpecialColors.push(specialDay.color)
        }
      })
    }
    this.setState({specialColors: nextSpecialColors})
  }

  handleMouseEvent(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    const newState = {};

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

  handleSelect(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    this.props.onSelect(this.props.dayMoment);
  }

  getStateStyles() {
    const { hover, active } = this.state;
    const { isSelected, isInRange, isPassive, isStartEdge, isEndEdge, dayMoment, isToday, isSunday } = this.props;
    const { styles } = this;

    const hoverStyle    = hover ? styles['DayHover'] : {};
    const activeStyle   = active ? styles['DayActive'] : {};
    var passiveStyle
    if (this.state.specialColors && this.state.specialColors > 0) {
      passiveStyle  = { background: this.state.specialColors[0] };
    } else {
      passiveStyle  = isPassive ? styles['DayPassive'] : {};
    }
    const startEdgeStyle = isStartEdge ? styles['DayStartEdge'] : {};
    const endEdgeStyle   = isEndEdge ? styles['DayEndEdge'] : {};
    const selectedStyle = isSelected ? styles['DaySelected'] : {};
    const inRangeStyle  = isInRange ? styles['DayInRange'] : {};
    const todayStyle    = isToday ? styles['DayToday'] : {};
    const sundayStyle = isSunday ? styles['DaySunday'] : {};

    return {
      ...todayStyle,
      ...sundayStyle,
      ...inRangeStyle,
      ...hoverStyle,
      ...passiveStyle,
      ...activeStyle,
      ...selectedStyle,
      ...startEdgeStyle,
      ...endEdgeStyle
    };
  }

  getClassNames(classes) {
    const { isSelected, isInRange, isPassive, isStartEdge, isEndEdge, isToday, isSunday } = this.props;

    return classnames({
      [classes.day]       : true,
      [classes.dayActive] : isSelected,
      [classes.dayPassive]: isPassive,
      [classes.dayInRange]: isInRange,
      [classes.dayStartEdge] : isStartEdge,
      [classes.dayEndEdge] : isEndEdge,
      [classes.dayToday] : isToday,
      [classes.daySunday]: isSunday,
    });

  }

  render() {
    const { dayMoment, onlyClasses, classNames } = this.props;

    const { styles } = this;
    const stateStyle = this.getStateStyles();
    const classes    = this.getClassNames(classNames);
    const dayWrapperStyles = {
      width: styles['Day'].width,
      height: styles['Day'].height,
      display: styles['Day'].display
    };

    return (
      <span
        style={onlyClasses ? undefined : dayWrapperStyles}
        onClick={ this.handleSelect.bind(this) }>
        <span
          onMouseEnter={ this.handleMouseEvent.bind(this) }
          onMouseLeave={ this.handleMouseEvent.bind(this) }
          onMouseDown={ this.handleMouseEvent.bind(this) }
          onMouseUp={ this.handleMouseEvent.bind(this) }
          className={ classes }
          style={onlyClasses ? undefined : {...styles['Day'], ...stateStyle}}>
          { dayMoment.date() }
        </span>
      </span>
    );
  }
}

DayCell.defaultProps = {
  theme       : { 'Day' : {} },
  onlyClasses : false
}

DayCell.propTypes = {
  dayMoment   : PropTypes.object.isRequired,
  onSelect    : PropTypes.func,
  isSelected  : PropTypes.bool,
  isInRange   : PropTypes.bool,
  isPassive   : PropTypes.bool,
  theme       : PropTypes.shape({
    Day       : PropTypes.object.isRequired
  }).isRequired,
  onlyClasses : PropTypes.bool,
  classNames  : PropTypes.object,
  specialDays : PropTypes.array
}

export default DayCell;
