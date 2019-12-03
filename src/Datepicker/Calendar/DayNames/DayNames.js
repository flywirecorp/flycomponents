import PropTypes from 'prop-types';
import React from 'react';
import { daysOfWeek } from '../../../utils/date';

const DayNames = (_props, { locale }) => {
  const dayNames = daysOfWeek(locale);

  return (
    <thead role="presentation" aria-hidden="false">
      <tr role="row">
        {dayNames.map((day, index) => (
          <th
            scope="col"
            role="columnheader"
            aria-label={day}
            className="Calendar-weekday"
            key={day}
            id={`header-day-${index}`}
          >
            <abbr title={day}>{day}</abbr>
          </th>
        ))}
      </tr>
    </thead>
  );
};

DayNames.contextTypes = {
  locale: PropTypes.string
};

export default DayNames;
