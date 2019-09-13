import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const DATE_FORMAT = 'MM/DD/YYYY';

const Month = (props, { locale }) => {
  const { onDateClick, selectedDate, startDate } = props;
  const currentMonth = startDate.month();
  const [monthWeeks, setMonthWeeks] = useState([]);

  useEffect(() => {
    function getMonthWeeks(startDate) {
      const response = monthStartingWeekDates(startDate, locale);
      const monthWeeks = response.map(weekStartingDate => (
        <Week
          key={weekStartingDate.format(DATE_FORMAT)}
          startingDate={weekStartingDate.clone()}
          month={currentMonth}
          onDateClick={onDateClick}
          selected={selectedDate}
        />
      ));

      setMonthWeeks(monthWeeks);
    }

    getMonthWeeks(startDate);
  }, [startDate, locale]);

  return <tbody>{monthWeeks}</tbody>;
};

const { func, object, string } = PropTypes;

Month.propTypes = {
  onDateClick: func.isRequired,
  selectedDate: string,
  startDate: object.isRequired
};

Month.contextTypes = {
  locale: string
};

export default Month;
