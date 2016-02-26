import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import { defaultClasses } from './styles.js';

class PredefinedRanges extends Component {

  constructor(props, context) {
    super(props, context);

    this.styles = this.props.theme;
  }

  handleSelect(name, event) {
    event.preventDefault();

    const range = this.props.ranges[name];

    this.props.onSelect({
      startDate : parseInput(range['startDate']),
      endDate   : parseInput(range['endDate']),
    }, PredefinedRanges);
  }

  renderRangeList(classes) {
    const { ranges, range, onlyClasses } = this.props;
    const { styles } = this;

    return Object.keys(ranges).map(name => {
      const active = (
        parseInput(ranges[name].startDate).isSame(range.startDate) &&
        parseInput(ranges[name].endDate).isSame(range.endDate)
      );

      const style = {
        ...styles['PredefinedRangesItem'],
        ...(active ? styles['PredefinedRangesItemActive'] : {}),
      };

      return (
        <a
          href='#'
          key={'range-' + name}
          className={classes.predefinedRangesItem + (active ? ' active' : '')}
          style={ onlyClasses ? undefined : style }
          onClick={this.handleSelect.bind(this, name)}
        >
          {name}
        </a>
      );
    }.bind(this));
  }

  render() {
    const { style, onlyClasses, classNames } = this.props;
    const { styles } = this;

    const classes = { ...defaultClasses, ...classNames };

    return (
      <div
        style={onlyClasses ? undefined : { ...styles['PredefinedRanges'], ...style }}
        className={ classes.predefinedRanges }
      >
        { this.renderRangeList(classes) }
      </div>
    );
  }
}

PredefinedRanges.defaultProps = {
  onlyClasses : false,
  classNames  : {}
};

PredefinedRanges.propTypes = {
  ranges      : PropTypes.object.isRequired,
  onlyClasses : PropTypes.bool,
  classNames  : PropTypes.object
}

export default PredefinedRanges;
