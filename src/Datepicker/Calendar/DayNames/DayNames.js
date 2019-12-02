import PropTypes from 'prop-types';
import React from 'react';
import { daysOfWeek } from '../../../utils/date';

const DayNames = ({ name }, { locale }) => {
  const dayNames = daysOfWeek(locale);

  return (
    <thead role="presentation" aria-hidden="false">
      <tr role="row">
        {dayNames.map((day, index) => (
          <th
            scope="col"
            role="columnheader"
            aria-label={day} // use here the long name
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

DayNames.propTypes = {
  name: PropTypes.string.isRequired
};

DayNames.contextTypes = {
  locale: PropTypes.string
};

export default DayNames;
