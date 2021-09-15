import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Context } from '../../Datepicker';
import { LONG_DATE_FORMAT } from '../../../utils/date';

const Day = ({ current, date, disabled, onDateClick, selected }) => {
  const formattedDate = date.format(LONG_DATE_FORMAT);

  return (
    <Context.Consumer>
      {({ name }) => (
        <td headers={`${name}-header-day-${date.day()}`}>
          <button
            id={`${name}-${date.month()}-${date.date()}`}
            onClick={disabled ? null : () => onDateClick(date)}
            aria-label={formattedDate}
            aria-pressed={selected}
            aria-disabled={disabled}
            aria-current={current && 'date'}
            className={classNames(
              'Calendar-day',
              { 'is-current': current },
              { 'is-disabled': disabled },
              { 'is-selected': selected }
            )}
            style={{ border: 0, background: 'transparent' }}
          >
            <span aria-hidden="true">{date.date()}</span>
          </button>
        </td>
      )}
    </Context.Consumer>
  );
};

Day.displayName = 'Day';
Day.propTypes = {
  current: PropTypes.bool,
  date: PropTypes.object,
  disabled: PropTypes.bool,
  onDateClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default Day;
