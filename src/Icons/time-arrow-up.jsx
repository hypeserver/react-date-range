


import React from 'react';
import PropTypes from "prop-types";
class TimeArrowUp extends React.Component {
  render() {
    return (

      <svg width="6" height="4" className="time-input-arrow" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.props.onClick}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.23721 3.66249C5.41172 3.84475 5.69461 3.84475 5.86912 3.66249C6.04363 3.48035 6.04363 3.18475 5.86912 3.00262L3.31595 0.335819C3.14145 0.153685 2.85855 0.153685 2.68405 0.335819L0.130881 3.00262C-0.0436273 3.18475 -0.0436273 3.48035 0.130881 3.66249C0.30539 3.84475 0.588281 3.84475 0.76279 3.66249L3.00128 1.32449L5.23721 3.66249Z" fill="#7A8699" />
      </svg>
    )
  }
}

TimeArrowUp.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default TimeArrowUp;