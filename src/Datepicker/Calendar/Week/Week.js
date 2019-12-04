import PropTypes from 'prop-types';
import React from 'react';
import Day from '../Day';

const Week = ({ startingDate, month, onDateClick, selectedDate }) => {
  const weekDays = [0, 1, 2, 3, 4, 5, 6]
    .map(dayIndex => startingDate.clone().add(dayIndex, 'day'))
    .map(day => (
      <Day
        current={day.isSame(new Date(), 'day')}
        selected={day.isSame(selectedDate, 'day')}
        disabled={day.month() !== month}
        date={day}
        key={`day-${day}`}
        onDateClick={onDateClick}
        name={name}
      />
    ));

  return (
    <tr className="week" role="row">
      {weekDays}
    </tr>
  );
};

Week.propTypes = {
  month: PropTypes.number,
  onDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired,
  startingDate: PropTypes.object
};

export default Week;
