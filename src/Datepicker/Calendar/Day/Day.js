import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Day = ({ current, date, disabled, onDateClick, selected }) => (
  <td
    role="button"
    aria-label={date.format('LL')}
    aria-selected={selected}
    aria-disabled={disabled}
    aria-current={current && 'date'}
    className={classNames(
      'Calendar-day',
      { 'is-current': current },
      { 'is-disabled': disabled },
      { 'is-selected': selected }
    )}
    onClick={disabled ? null : () => onDateClick(date)}
  >
    {date.date()}
  </td>
);

const { bool, func, string } = PropTypes;

Day.propTypes = {
  current: bool,
  date: string,
  disabled: bool,
  onDateClick: func.isRequired,
  selected: bool
};

export default Day;
