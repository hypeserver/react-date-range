import React from 'react';
import PropTypes from "prop-types";
class TimeArrowDown extends React.Component {
  render() {
    return (
      <svg width="6" height="4" className="time-input-arrow" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.props.onClick}>
        <path fillRule="evenodd" clipRule="evenodd" d="M0.76279 0.337514C0.588281 0.155247 0.30539 0.155247 0.130882 0.337514C-0.0436272 0.519648 -0.0436272 0.815248 0.130882 0.997381L2.68405 3.66418C2.85855 3.84631 3.14145 3.84631 3.31595 3.66418L5.86912 0.997381C6.04363 0.815248 6.04363 0.519648 5.86912 0.337514C5.69461 0.155247 5.41172 0.155247 5.23721 0.337514L2.99872 2.67551L0.76279 0.337514Z" fill="#7A8699" />
      </svg>
    )
  }
}

TimeArrowDown.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default TimeArrowDown;

