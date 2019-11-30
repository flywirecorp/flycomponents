import PropTypes from 'prop-types';
import React from 'react';
import { daysOfWeek } from '../../../utils/date';

const DayNames = (props, { locale }) => {
  const dayNames = daysOfWeek(locale);

  return (
    <thead>
      <tr>
        {dayNames.map(day => (
          <th
            aria-label={day}
            className="Calendar-weekday"
            key={day}
            scope="col"
          >
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
