import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Day = ({ current, date, disabled, onDateClick, selected }) => (
  <td
    id={`${date.month()}-${date.date()}`}
    role="gridcell button"
    headers={`header-day-${date.day()}`}
    aria-label={date.format('dddd, MMMM')}
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

Day.propTypes = {
  current: PropTypes.bool,
  date: PropTypes.object,
  disabled: PropTypes.bool,
  onDateClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default Day;
