import PropTypes from 'prop-types'
import React from 'react'
import Select from '../../../Select'
import { monthNames } from '../../../utils/date'

const Navigation = (
  {
    onMonthChange,
    onNextMonthClick,
    onPrevMonthClick,
    onYearChange,
    startDate
  },
  { locale }
) => {
  const currentMonth = startDate.month()
  const currentYear = startDate.year()
  const months = monthNames(locale).map((month, i) => ({
    value: i,
    label: month
  }))

  const years = [...Array(100).keys()].map(i => {
    const year = currentYear - 50 + i
    return { value: year, label: year }
  })

  const handleClick = e => {
    e.stopPropagation()
  }

  const handleMonthChange = e => {
    const month = e.target.value
    onMonthChange(month)
  }

  const handleYearChange = e => {
    const year = e.target.value
    onYearChange(year)
  }

  return (
    <nav className="Calendar-header">
      <div className="Calendar-header-nav Calendar-header-nav--prev">
        <button
          className="Button Button--default Button--sm"
          onClick={onPrevMonthClick}
        >
          <span className="Icon Icon--arrowLeft Icon--xs" />
        </button>
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--month">
        <Select
          className={'Select--sm'}
          selectedValue={currentMonth}
          onChange={handleMonthChange}
          onClick={handleClick}
          values={months}
        />
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--year">
        <Select
          className={'Select--sm'}
          selectedValue={currentYear}
          onChange={handleYearChange}
          onClick={handleClick}
          values={years}
        />
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--next">
        <button
          className="Button Button--default Button--sm"
          onClick={onNextMonthClick}
        >
          <span className="Icon Icon--arrowRight Icon--xs" />
        </button>
      </div>
    </nav>
  )
}

const { func, object, string } = PropTypes

Navigation.propTypes = {
  onMonthChange: func.isRequired,
  onNextMonthClick: func.isRequired,
  onPrevMonthClick: func.isRequired,
  onYearChange: func.isRequired,
  startDate: object.isRequired
}

Navigation.contextTypes = {
  locale: string
}

export default Navigation
