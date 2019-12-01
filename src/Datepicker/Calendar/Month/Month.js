import PropTypes from 'prop-types';
import React from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const Month = props => {
  const { onDateClick, focussedDate } = props;
  const currentMonth = focussedDate.month();

  const monthWeeks = monthStartingWeekDates(focussedDate).map(
    weekStartingDate => (
      <Week
        key={`week-${weekStartingDate}`}
        startingDate={weekStartingDate.clone()}
        month={currentMonth}
        onDateClick={onDateClick}
        selectedDate={focussedDate}
      />
    )
  );

  return (
    <tbody role="grid" aria-readonly="true">
      {monthWeeks}
    </tbody>
  );
};

const { func, object } = PropTypes;

Month.propTypes = {
  focussedDate: object.isRequired,
  onDateClick: func.isRequired
};

export default Month;
