import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import moment from 'moment'
import Calendar from './Calendar'
import Navigation from './Navigation'
import DayNames from './DayNames'
import Month from './Month'

describe('Calendar', () => {
  class CalendarComponent {
    constructor(ownProps) {
      const FAKE_CALLBACK = () => {}
      const defaultProps = {
        onDateClick: FAKE_CALLBACK,
        onMonthChange: FAKE_CALLBACK,
        onNextMonthClick: FAKE_CALLBACK,
        onPrevMonthClick: FAKE_CALLBACK,
        onYearChange: FAKE_CALLBACK,
        selectedDate: '',
        startDate: moment('2016-11-13')
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<Calendar {...props} />)
    }

    calendar() {
      return this.component.find('.Calendar')
    }

    navigation() {
      return this.calendar().find(Navigation)
    }

    dayNames() {
      return this.calendar().find(DayNames)
    }

    month() {
      return this.calendar().find(Month)
    }
  }

  it('has a navigation bar', () => {
    const component = new CalendarComponent()

    expect(component.navigation()).to.have.length(1)
  })

  it('has a day names header', () => {
    const component = new CalendarComponent()

    expect(component.dayNames()).to.have.length(1)
  })

  it('has a day month table', () => {
    const component = new CalendarComponent()

    expect(component.month()).to.have.length(1)
  })
})
