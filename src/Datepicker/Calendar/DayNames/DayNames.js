import React from 'react';
import { Context } from '../../Datepicker';
import { daysOfWeek } from '../../../utils/date';

const DayNames = () => (
  <Context.Consumer>
    {({ locale, name }) => (
      <thead role="presentation">
        <tr role="row">
          {daysOfWeek(locale).map((day, index) => (
            <th
              scope="col"
              role="columnheader"
              aria-label={day}
              className="Calendar-weekday"
              key={day}
              id={`${name}-header-day-${index}`}
            >
              <abbr title={day}>{day}</abbr>
            </th>
          ))}
        </tr>
      </thead>
    )}
  </Context.Consumer>
);

DayNames.displayName = 'DayNames';
export default DayNames;
