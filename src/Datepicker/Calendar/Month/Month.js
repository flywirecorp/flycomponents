import PropTypes from 'prop-types';
import React from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const Month = ({ onDateClick, selectedDate }) => {
  const currentMonth = selectedDate.month();

  const monthWeeks = monthStartingWeekDates(
    selectedDate
  ).map(weekStartingDate => (
    <Week
      key={`week-${weekStartingDate}`}
      startingDate={weekStartingDate.clone()}
      month={currentMonth}
      onDateClick={onDateClick}
      selectedDate={selectedDate}
    />
  ));

  return <tbody role="presentation">{monthWeeks}</tbody>;
};

Month.displayName = 'Month';
Month.propTypes = {
  onDateClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.object.isRequired
};

export default Month;
