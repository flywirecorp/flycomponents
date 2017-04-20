import React, { PropTypes } from 'react'
import { daysOfWeek } from '../../../utils/date'
import './DayNames.scss'

const DayNames = (props, { locale }) => {
  const dayNames = daysOfWeek(locale)

  return (
    <thead>
      <tr>
        {dayNames.map(day =>
          <th key={day} className='Calendar-weekday'>{day}</th>
        )}
      </tr>
    </thead>
  )
}

const { string } = PropTypes

DayNames.contextTypes = {
  locale: string
}

export default DayNames
