import PropTypes from 'prop-types';
import React from 'react';
import Day from '../Day';

const DATE_FORMAT = 'MM/DD/YYYY';

const Week = ({ startingDate, month, onDateClick, selected }) => {
  const weekDays = [0, 1, 2, 3, 4, 5, 6]
    .map(dayIndex => startingDate.clone().add(dayIndex, 'day'))
    .map(moment => {
      const stringDate = moment.format(DATE_FORMAT);

      return (
        <Day
          current={moment.isSame(new Date(), 'day')}
          date={stringDate}
          dayOfMonth={moment.date()}
          disabled={moment.month() !== month}
          key={stringDate}
          onDateClick={onDateClick}
          selected={stringDate === selected}
        />
      );
    });

  return (
    <tr className="week" role="row">
      {weekDays}
    </tr>
  );
};

const { func, number, object, string } = PropTypes;

Week.propTypes = {
  month: number,
  onDateClick: func.isRequired,
  selected: string,
  startingDate: object
};

export default Week;
