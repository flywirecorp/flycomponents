import PropTypes from 'prop-types';
import React from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const DATE_FORMAT = 'MM/DD/YYYY';

const Month = props => {
  const { onDateClick, startDate } = props;
  const currentMonth = startDate.month();

  const monthWeeks = monthStartingWeekDates(startDate).map(weekStartingDate => (
    <Week
      key={weekStartingDate.format(DATE_FORMAT)}
      startingDate={weekStartingDate.clone()}
      month={currentMonth}
      onDateClick={onDateClick}
      selectedDate={startDate}
    />
  ));

  return (
    <tbody role="grid" aria-readonly="true">
      {monthWeeks}
    </tbody>
  );
};

const { func, object } = PropTypes;

Month.propTypes = {
  onDateClick: func.isRequired,
  startDate: object.isRequired
};

export default Month;
