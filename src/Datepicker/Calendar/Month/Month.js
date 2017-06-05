import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Week from '../Week'
import { monthStartingWeekDates } from '../../../utils/date'

const DATE_FORMAT = 'MM/DD/YYYY'

class Month extends Component {
  render() {
    const { onDateClick, selectedDate, startDate } = this.props
    const currentMonth = startDate.month()

    const monthWeeks = monthStartingWeekDates(startDate).map(weekStartingDate =>
      <Week
        key={weekStartingDate.format(DATE_FORMAT)}
        startingDate={weekStartingDate.clone()}
        month={currentMonth}
        onDateClick={onDateClick}
        selected={selectedDate}
      />
    )

    return (
      <tbody>
        {monthWeeks}
      </tbody>
    )
  }
}

const { func, object, string } = PropTypes

Month.propTypes = {
  onDateClick: func.isRequired,
  selectedDate: string.isRequired,
  startDate: object.isRequired
}

export default Month
