import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { LONG_DATE_FORMAT } from '../../../utils/date';

const Day = ({ current, date, disabled, onDateClick, selected }) => {
  const formattedDate = date.format(LONG_DATE_FORMAT);

  return (
    <td
      aria-label={formattedDate}
      aria-selected={selected}
      aria-disabled={disabled}
      aria-current={current && 'date'}
      id={`${date.month()}-${date.date()}`}
      role="button"
      headers={`header-day-${date.day()}`}
      className={classNames(
        'Calendar-day',
        { 'is-current': current },
        { 'is-disabled': disabled },
        { 'is-selected': selected }
      )}
      onClick={disabled ? null : () => onDateClick(date)}
    >
      <span aria-hidden="true">{date.date()}</span>
    </td>
  );
};

Day.propTypes = {
  current: PropTypes.bool,
  date: PropTypes.object,
  disabled: PropTypes.bool,
  onDateClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default Day;
