import PropTypes from 'prop-types';

export const ariaLabelsShape = PropTypes.shape({
  dateInput: PropTypes.objectOf(
    PropTypes.shape({ startDate: PropTypes.string, endDate: PropTypes.string })
  ),
  monthPicker: PropTypes.string,
  yearPicker: PropTypes.string,
  prevButton: PropTypes.string,
  nextButton: PropTypes.string,
});
