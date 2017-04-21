import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Datepicker from './Datepicker'
import Calendar from './Calendar'
import DateInput from './DateInput'

describe('Datepicker', () => {
  class DatepickerComponent {
    constructor(ownProps) {
      const defaultProps = {
        error: '',
        label: 'Your birthday',
        name: 'birthday',
        onBlur: () => {},
        onChange: () => {},
        required: false,
        value: null
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<Datepicker {...props} />)
    }

    datepicker() {
      return this.component
    }

    currentDate() {
      const state = this.datepicker().state()
      return state.startDate.format('MM/DD/YYYY')
    }

    selectedDate() {
      const state = this.datepicker().state()
      return state.selectedDate
    }

    dateInput() {
      return this.component.find(DateInput)
    }

    calendar() {
      return this.component.find(Calendar)
    }

    calendarIsVisible() {
      return this.component.state('isOpen')
    }

    simulateCalendarIconClick() {
      this.dateInput().simulate('calendarIconClick')
    }

    simulateDateInputClick() {
      this.dateInput().simulate('click')
    }

    simulateDateInputBlur() {
      this.dateInput().simulate('blur')
    }

    simulatePrevMonthClick() {
      this.calendar().simulate('prevMonthClick')
    }

    simulateNextMonthClick() {
      this.calendar().simulate('nextMonthClick')
    }

    simulateMonthChange(month) {
      this.calendar().simulate('monthChange', month)
    }

    simulateYearChange(year) {
      this.calendar().simulate('yearChange', year)
    }

    simulateDateClick(date) {
      this.calendar().simulate('dateClick', date)
    }
  }

  it('has a date input', () => {
    const component = new DatepickerComponent()

    expect(component.dateInput()).to.have.length(1)
  })

  it('has a calendar', () => {
    const component = new DatepickerComponent()

    expect(component.calendar()).to.have.length(1)
  })

  it('hiddes the calendar by default', () => {
    const component = new DatepickerComponent()

    expect(component.calendarIsVisible()).to.be.false
  })

  it('shows the calendar when clicking the calendar icon', () => {
    const component = new DatepickerComponent()
    component.simulateCalendarIconClick()

    expect(component.calendarIsVisible()).to.be.true
  })

  it('shows the calendar when clicking the date input', () => {
    const component = new DatepickerComponent()

    component.simulateDateInputClick()

    expect(component.calendarIsVisible()).to.be.true
  })

  it('hides the calendar when date input blurs', () => {
    const CLOSE_DELAY_TIME = 150
    const clock = sinon.useFakeTimers()
    const component = new DatepickerComponent()

    component.simulateDateInputClick()
    component.simulateDateInputBlur()

    setTimeout(() => {
      expect(component.calendarIsVisible()).to.be.false
    }, CLOSE_DELAY_TIME + 1)

    clock.tick(CLOSE_DELAY_TIME)
    clock.restore()
  })

  it('moves calendar one month back', () => {
    const value = '11/22/2016'
    const component = new DatepickerComponent({ value })

    component.simulatePrevMonthClick()

    expect(component.currentDate()).to.equal('10/22/2016')
  })

  it('moves calendar one month ahead', () => {
    const value = '11/22/2016'
    const component = new DatepickerComponent({ value })

    component.simulateNextMonthClick()

    expect(component.currentDate()).to.equal('12/22/2016')
  })

  it('moves calendar to selected month', () => {
    const JANUARY = 0
    const value = '11/22/2016'
    const component = new DatepickerComponent({ value })

    component.simulateMonthChange(JANUARY)

    expect(component.currentDate()).to.equal('01/22/2016')
  })

  it('moves calendar to selected year', () => {
    const value = '11/22/2016'
    const component = new DatepickerComponent({ value })

    component.simulateYearChange(2017)

    expect(component.currentDate()).to.equal('11/22/2017')
  })

  it('selects date clicking a day', () => {
    const value = '11/22/2016'
    const component = new DatepickerComponent({ value })

    component.simulateDateClick('04/21/1979')

    expect(component.selectedDate()).to.equal('04/21/1979')
  })

  it('selects date clicking a day', () => {
    const value = '11/22/2016'
    const component = new DatepickerComponent({ value })

    component.simulateDateClick('04/21/1979')

    expect(component.selectedDate()).to.equal('04/21/1979')
  })

  describe('having read-only property', () => {
    const component = new DatepickerComponent({ readOnly: true })

    it('renders a read-only input', () => {
      expect(component.dateInput().prop('readOnly')).to.be.true
    })

    it('does not open the calendar clicking the date input', () => {
      component.simulateDateInputClick()

      expect(component.calendarIsVisible()).to.be.false
    })

    it('does not open the calendar clicking the calendar icon', () => {
      component.simulateCalendarIconClick()

      expect(component.calendarIsVisible()).to.be.false
    })
  })
})
