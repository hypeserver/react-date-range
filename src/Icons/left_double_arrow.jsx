import React from 'react';
import PropTypes from "prop-types";
class LeftDoubleArrow extends React.Component {
  render() {
      return (
        <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.props.onClick}>
          <path fillRule="evenodd" clipRule="evenodd" d="M14.9265 7.52558C15.2911 7.17656 15.2911 6.61078 14.9265 6.26176C14.5623 5.91275 13.9711 5.91275 13.6068 6.26176L8.2732 11.3681C7.90893 11.7171 7.90893 12.2829 8.2732 12.6319L13.6068 17.7382C13.9711 18.0873 14.5623 18.0873 14.9265 17.7382C15.2911 17.3892 15.2911 16.8234 14.9265 16.4744L10.2505 11.9974L14.9265 7.52558Z" fill="#777A80"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M19.9265 7.52558C20.2911 7.17656 20.2911 6.61078 19.9265 6.26176C19.5623 5.91275 18.9711 5.91275 18.6068 6.26176L13.2732 11.3681C12.9089 11.7171 12.9089 12.2829 13.2732 12.6319L18.6068 17.7382C18.9711 18.0873 19.5623 18.0873 19.9265 17.7382C20.2911 17.3892 20.2911 16.8234 19.9265 16.4744L15.2505 11.9974L19.9265 7.52558Z" fill="#777A80"/>
        </svg>
      )}
}

LeftDoubleArrow.propTypes = {
  onClick : PropTypes.func.isRequired,
}

export default LeftDoubleArrow;