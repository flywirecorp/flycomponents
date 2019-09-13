import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { daysOfWeek } from '../../../utils/date';

const DayNames = (props, { locale }) => {
  const [dayNames, setDayNames] = useState([]);

  useEffect(() => {
    function getDaysOfWeek() {
      const response = daysOfWeek(locale);
      setDayNames(response);
    }

    getDaysOfWeek();
  }, [locale]);

  return (
    <thead>
      <tr>
        {dayNames.map(day => (
          <th key={day} className="Calendar-weekday">
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const { string } = PropTypes;

DayNames.contextTypes = {
  locale: string
};

export default DayNames;
