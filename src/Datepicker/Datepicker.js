import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import { parseDateOrToday } from '../utils/date'
import Calendar from './Calendar'
import DateInput from './DateInput'

class Datepicker extends Component {
  constructor(props) {
    super(props)

    const { locale, value } = this.props
    const startDate = parseDateOrToday(value)
    startDate.locale(locale)

    this.state = {
      isOpen: false,
      selectedDate: value,
      startDate
    }
  }

  getChildContext() {
    const { locale } = this.props
    return { locale }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideOnDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideOnDocumentClick)
  }

  hideOnDocumentClick = e => {
    const { isOpen: wasOpen } = this.state
    const { target } = e
    const parentElement = findDOMNode(this)

    if (parentElement.contains(target)) {
      return
    }

    const { selectedDate } = this.state
    const startDate = parseDateOrToday(selectedDate)

    this.setState(() => {
      return { isOpen: false, startDate }
    }, wasOpen ? this.sendBlur : null)
  }

  handleCalendarIconClick = () => {
    const { readOnly } = this.props

    if (readOnly) {
      return
    }

    this.setState(prevState => {
      return { isOpen: !prevState.isOpen }
    })
  }

  sendBlur() {
    const { name, onBlur } = this.props
    onBlur(name)
  }

  handleDateInputClick = () => {
    const { isOpen } = this.state
    const { readOnly } = this.props

    if (isOpen || readOnly) {
      return
    }
    this.setState({ isOpen: true })
  }

  handleMonthChange = month => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.set('month', month) }
    })
  }

  handleNextMonthClick = () => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.add(1, 'month') }
    })
  }

  handlePrevMonthClick = () => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.subtract(1, 'month') }
    })
  }

  handleYearChange = year => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.set('year', year) }
    })
  }

  setSelectedDate = date => {
    const { name, onChange } = this.props

    this.setState({ selectedDate: date })
    onChange(name, date)
  }

  setSelectedDateAndCloseCalendar = date => {
    this.setSelectedDate(date)

    this.setState(() => {
      return { isOpen: false }
    }, this.sendBlur)
  }

  render() {
    const { name, onFocus, readOnly, value } = this.props
    const { isOpen, selectedDate, startDate } = this.state

    return (
      <div className={classNames('Datepicker', { 'is-open': isOpen })}>
        <DateInput
          name={name}
          onChange={() => {}}
          onCalendarIconClick={this.handleCalendarIconClick}
          onClick={this.handleDateInputClick}
          onFocus={onFocus}
          selectedDate={selectedDate}
          setSelectedDate={this.setSelectedDate}
          readOnly={readOnly}
          ref="dateInput"
          value={value}
        />
        <Calendar
          onDateClick={this.setSelectedDateAndCloseCalendar}
          onMonthChange={this.handleMonthChange}
          onNextMonthClick={this.handleNextMonthClick}
          onPrevMonthClick={this.handlePrevMonthClick}
          onYearChange={this.handleYearChange}
          selectedDate={selectedDate}
          startDate={startDate}
        />
      </div>
    )
  }
}

const { bool, func, number, oneOfType, string } = PropTypes

Datepicker.propTypes = {
  locale: string,
  name: string,
  onBlur: func,
  onChange: func,
  onFocus: func,
  readOnly: bool,
  value: oneOfType([number, string])
}

Datepicker.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {}
}

Datepicker.childContextTypes = {
  locale: string
}

export default Datepicker
