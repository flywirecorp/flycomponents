import PropTypes from 'prop-types';
import React from 'react';
import { ENTER, SPACE } from '../../utils/keycodes';

const LABEL = 'Show calendar';
const CalendarIcon = ({ onClick, label }) => (
  <span
    className="Icon Icon--calendar"
    onClick={onClick}
    onKeyDown={evt => [ENTER, SPACE].includes(evt.keyCode) && onClick(evt)}
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
