import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Week from '../Week';
import { monthStartingWeekDates } from '../../../utils/date';

const DATE_FORMAT = 'MM/DD/YYYY';

class Month extends Component {
  state = {
    monthWeeks: []
  };

  componentDidMount() {
    this.setMonthWeeks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.startDate !== prevProps.startDate) {
      this.setMonthWeeks();
    }
  }

  async setMonthWeeks() {
    const { locale } = this.context;
    const { startDate } = this.props;
    const monthWeeks = await monthStartingWeekDates(startDate, locale);
    this.setState({ monthWeeks });
  }

  render() {
    const { onDateClick, selectedDate, startDate } = this.props;
    const { monthWeeks } = this.state;
    const currentMonth = startDate.month();
    const month = monthWeeks.map(weekStartingDate => (
      <Week
        key={weekStartingDate.format(DATE_FORMAT)}
        startingDate={weekStartingDate.clone()}
        month={currentMonth}
        onDateClick={onDateClick}
        selected={selectedDate}
      />
    ));

    return <tbody>{month}</tbody>;
  }
}

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
