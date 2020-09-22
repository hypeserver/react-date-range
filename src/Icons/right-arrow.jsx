import React from "react";
import PropTypes from "prop-types";
class RightArrow extends React.Component {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={this.props.onClick}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.27366 7.52558C7.90913 7.17656 7.90913 6.61078 8.27366 6.26176C8.63793 5.91275 9.22913 5.91275 9.5934 6.26176L14.927 11.3681C15.2913 11.7171 15.2913 12.2829 14.927 12.6319L9.5934 17.7382C9.22913 18.0873 8.63793 18.0873 8.27366 17.7382C7.90913 17.3892 7.90913 16.8234 8.27366 16.4744L12.9497 11.9974L8.27366 7.52558Z"
          fill="#777A80"
        />
      </svg>
    );
  }
}

RightArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RightArrow;
