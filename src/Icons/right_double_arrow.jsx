import React from 'react';
import PropTypes from "prop-types";
class RightDoubleArrow extends React.Component {
  render() {
      return (
        <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.props.onClick}>
          <path fillRule="evenodd" clipRule="evenodd" d="M14.0735 7.52558C13.7089 7.17656 13.7089 6.61078 14.0735 6.26176C14.4377 5.91275 15.0289 5.91275 15.3932 6.26176L20.7268 11.3681C21.0911 11.7171 21.0911 12.2829 20.7268 12.6319L15.3932 17.7382C15.0289 18.0873 14.4377 18.0873 14.0735 17.7382C13.7089 17.3892 13.7089 16.8234 14.0735 16.4744L18.7495 11.9974L14.0735 7.52558Z" fill="#777A80"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.07347 7.52558C8.70893 7.17656 8.70893 6.61078 9.07347 6.26176C9.43773 5.91275 10.0289 5.91275 10.3932 6.26176L15.7268 11.3681C16.0911 11.7171 16.0911 12.2829 15.7268 12.6319L10.3932 17.7382C10.0289 18.0873 9.43773 18.0873 9.07347 17.7382C8.70893 17.3892 8.70893 16.8234 9.07347 16.4744L13.7495 11.9974L9.07347 7.52558Z" fill="#777A80"/>
        </svg>
      )}
}

RightDoubleArrow.propTypes = {
  onClick : PropTypes.func.isRequired,
}

export default RightDoubleArrow;
