import React, { Component, PropTypes } from 'react';
import parseInput from './utils/parseInput.js';
import moment from 'moment';

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

  renderRangeList() {
    const { ranges } = this.props;
    const { styles } = this;

    return Object.keys(ranges).map(name => {
      return (
        <a
          href='#'
          key={'range-' + name}
          style={styles['PredefinedRangeItem']}
          onClick={this.handleSelect.bind(this, name)}>
          {name}
        </a>
      );
    }.bind(this));
  }

  render() {
    const { style } = this.props;
    const { styles } = this;

    return (
      <div style={{ ...styles['PredefinedRanges'], ...style }}>
        {this.renderRangeList()}
      </div>
    );
  }
}

PredefinedRanges.propTypes = {
  ranges : PropTypes.object.isRequired
}

export default PredefinedRanges;
