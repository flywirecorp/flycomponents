import PropTypes from 'prop-types';
import React from 'react';

const CalendarIcon = ({ onClick }) => (
  <span className='Icon Icon--calendar' onClick={onClick} />
)

const { func } = PropTypes

CalendarIcon.propTypes = {
  onClick: func
}

export default CalendarIcon
