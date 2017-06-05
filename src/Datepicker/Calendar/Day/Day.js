import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const Day = ({ current, date, dayOfMonth, disabled, onDateClick, selected }) =>
  <td
    className={classNames(
      'Calendar-day',
      { 'is-current': current },
      { 'is-disabled': disabled },
      { 'is-selected': selected }
    )}
    onClick={disabled ? null : () => onDateClick(date)}
  >
    {dayOfMonth}
  </td>

const { bool, func, number, string } = PropTypes

Day.propTypes = {
  current: bool,
  date: string,
  dayOfMonth: number,
  disabled: bool,
  onDateClick: func.isRequired,
  selected: bool
}

export default Day
