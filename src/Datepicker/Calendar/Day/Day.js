import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { SPACE, ENTER } from '../../../utils/keycodes';

const ENABLED = 0;
const DISABLED = -1;
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
    tabIndex={disabled ? DISABLED : ENABLED}
    onKeyDown={evt => {
      evt.preventDefault;
      if (disabled) return;

      const pressedKey = evt.keyCode;
      if (pressedKey === ENTER || pressedKey === SPACE) {
        onDateClick(date);
      }
    }}
  >
    {date.date()}
  </td>
);

const { bool, func, object } = PropTypes;

Day.propTypes = {
  current: bool,
  date: object,
  disabled: bool,
  onDateClick: func.isRequired,
  selected: bool
};

export default Day;
