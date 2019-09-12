import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { daysOfWeek } from '../../../utils/date';

class DayNames extends Component {
  state = {
    dayNames: []
  };

  componentDidMount() {
    this.setDayNames();
  }

  async setDayNames() {
    const { locale } = this.context;
    const dayNames = await daysOfWeek(locale);

    this.setState({ dayNames });
  }

  render() {
    const { dayNames } = this.state;

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
  }
}

const { string } = PropTypes;

DayNames.contextTypes = {
  locale: string
};

export default DayNames;
