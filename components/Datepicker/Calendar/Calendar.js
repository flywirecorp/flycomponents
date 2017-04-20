import React, { PropTypes } from 'react'
import DayNames from './DayNames'
import Month from './Month'
import Navigation from './Navigation'

const Calendar = ({
  onDateClick,
  onMonthChange,
  onNextMonthClick,
  onPrevMonthClick,
  onYearChange,
  selectedDate,
  startDate
}) => (
  <div
    className='Calendar Datepicker-calendar'
  >
    <Navigation
      onMonthChange={onMonthChange}
      onNextMonthClick={onNextMonthClick}
      onPrevMonthClick={onPrevMonthClick}
      onYearChange={onYearChange}
      startDate={startDate}
    />
    <table className='Calendar-table'>
      <DayNames startDate={startDate} />
      <Month
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        startDate={startDate}
      />
    </table>
  </div>
)

const { func, object, string } = PropTypes

Calendar.propTypes = {
  onDateClick: func.isRequired,
  onMonthChange: func.isRequired,
  onNextMonthClick: func.isRequired,
  onPrevMonthClick: func.isRequired,
  onYearChange: func.isRequired,
  selectedDate: string,
  startDate: object.isRequired
}

export default Calendar
