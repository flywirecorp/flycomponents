import PropTypes from 'prop-types';
import React from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const Month = props => {
  const { onDateClick, focussedDate } = props;
  const currentMonth = focussedDate.month();

  const monthWeeks = monthStartingWeekDates(
    focussedDate
  ).map(weekStartingDate => (
    <Week
      key={`week-${weekStartingDate}`}
      startingDate={weekStartingDate.clone()}
      month={currentMonth}
      onDateClick={onDateClick}
      selectedDate={focussedDate}
    />
  ));

  return <tbody role="presentation">{monthWeeks}</tbody>;
};

Month.propTypes = {
  focussedDate: PropTypes.object.isRequired,
  onDateClick: PropTypes.func.isRequired
};

export default Month;
