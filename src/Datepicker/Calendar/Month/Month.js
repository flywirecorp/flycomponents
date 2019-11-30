import PropTypes from 'prop-types';
import React from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const DATE_FORMAT = 'MM/DD/YYYY';

const Month = props => {
  const { onDateClick, selectedDate, startDate } = props;
  const currentMonth = startDate.month();

  const monthWeeks = monthStartingWeekDates(startDate).map(weekStartingDate => (
    <Week
      key={weekStartingDate.format(DATE_FORMAT)}
      startingDate={weekStartingDate.clone()}
      month={currentMonth}
      onDateClick={onDateClick}
      selected={selectedDate}
    />
  ));

  return (
    <tbody role="grid" aria-readonly="true">
      {monthWeeks}
    </tbody>
  );
};

const { func, object, string } = PropTypes;

Month.propTypes = {
  onDateClick: func.isRequired,
  selectedDate: string,
  startDate: object.isRequired
};

export default Month;
