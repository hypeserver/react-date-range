import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import parseInput from './utils/parseInput.js';
import { defaultStyle } from './styles.js';

class PredefinedRanges extends Component {

  constructor(props, context) {
    super(props, context);

    this.styles = this.props.theme;
  }

  handleSelect(name, event) {
    event.preventDefault();

    const range = this.props.ranges[name];

    // BECAUSE FUCK MOMENT
    this.props.onSelect({
      startDate : parseInput(range['startDate']),
      endDate   : parseInput(range['endDate']),
    });
  }

  renderRangeList(classes) {
    const { ranges } = this.props;
    const { styles } = this;

    return Object.keys(ranges).map(name => {
      return (
        <a
          href='#'
          key={'range-' + name}
          className={classes.predefinedRangeItem}
          style={styles['PredefinedRangeItem']}
          onClick={this.handleSelect.bind(this, name)}>
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
      <div style={!onlyClasses && { ...styles['PredefinedRanges'], ...style }} className={classes.predefinedRanges}>
        {this.renderRangeList(classes)}
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
