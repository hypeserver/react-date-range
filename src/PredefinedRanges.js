import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
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
      startDate : parseInput(range['startDate'], null, 'startOf'),
      endDate   : parseInput(range['endDate'], null, 'endOf'),
    }, PredefinedRanges);
  }

  renderRangeList(classes) {
    const { ranges, range, onlyClasses, lang = ""} = this.props;
    const { styles } = this;

    return Object.keys(ranges).map(key => {
      const currentRange = ranges[key];

      const active = (
        parseInput(currentRange.startDate, null, 'startOf').isSame(range.startDate) &&
        parseInput(currentRange.endDate, null, 'endOf').isSame(range.endDate)
      );

      const style = {
        ...styles['PredefinedRangesItem'],
        ...(active ? styles['PredefinedRangesItemActive'] : {}),
      };

      const predefinedRangeClass = classnames({
        [classes.predefinedRangesItem]: true,
        [classes.predefinedRangesItemActive]: active
      });

      // check for a name property to decide how to name the ranges.
      let displayName = "";
      if (currentRange.name !== undefined) {
        displayName = currentRange.name;
      }
      // if the currentRange has a lang property, check it for the current language.
      if (lang && currentRange.lang !== undefined) {
        if (currentRange.lang[lang]) {
          displayName = currentRange.lang[lang];
        }
      }
      // if nothing was set so far, use the key in the object.
      if (displayName === "") {
        displayName = key;
      }

      return (
        <a
          href='#'
          key={'range-' + key}
          className={predefinedRangeClass}
          style={ onlyClasses ? undefined : style }
          onClick={this.handleSelect.bind(this, key)}
        >
          {displayName}
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
  classNames  : PropTypes.object,
  lang: PropTypes.string
}

export default PredefinedRanges;
