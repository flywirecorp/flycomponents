import PropTypes from 'prop-types';
import React from 'react';
import Day from '../Day';

const DATE_FORMAT = 'MM/DD/YYYY';

const Week = ({ startingDate, month, onDateClick, selectedDate }) => {
  const weekDays = [0, 1, 2, 3, 4, 5, 6]
    .map(dayIndex => startingDate.clone().add(dayIndex, 'day'))
    .map(day => {
      const stringDate = day.format(DATE_FORMAT);

      return (
        <Day
          current={day.isSame(new Date(), 'day')}
          date={stringDate}
          dayOfMonth={day.date()}
          disabled={day.month() !== month}
          key={stringDate}
          onDateClick={onDateClick}
          selected={day.isSame(selectedDate, 'day')}
        />
      );
    });

  return (
    <tr className="week" role="row">
      {weekDays}
    </tr>
  );
};

const { func, number, object } = PropTypes;

Week.propTypes = {
  month: number,
  onDateClick: func.isRequired,
  selectedDate: object.isRequired,
  startingDate: object
};

export default Week;
