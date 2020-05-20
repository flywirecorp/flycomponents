import PropTypes from 'prop-types';
import React from 'react';
import { ENTER, SPACE } from '../../utils/keycodes';

const LABEL = 'Show calendar';
const CalendarIcon = ({ onClick, label, hasError = false }) => {
  const iconClass = hasError ? 'Icon--calendarError' : 'Icon--calendar';

  return (
    <span
      className={`Icon ${iconClass}`}
      onClick={onClick}
      onKeyDown={evt => [ENTER, SPACE].includes(evt.keyCode) && onClick(evt)}
      aria-label={label}
      role="button"
      tabIndex={0}
    />
  );
};

CalendarIcon.propTypes = {
  hasError: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func
};

CalendarIcon.defaultProps = {
  label: LABEL
};

export default CalendarIcon;
