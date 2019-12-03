import PropTypes from 'prop-types';
import React from 'react';

const LABEL = 'Show calendar';
const CalendarIcon = ({ onClick, label }) => (
  <span
    className="Icon Icon--calendar"
    onClick={onClick}
    onKeyDown={onClick}
    aria-label={label}
    role="button"
    tabIndex={0}
  />
);

CalendarIcon.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

CalendarIcon.defaultProps = {
  label: LABEL
};

export default CalendarIcon;
