import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Day from '../Day'

describe('Day', () => {
  class DayComponent {
    constructor(ownProps) {
      const defaultProps = {
        current: false,
        date: '',
        dayOfMonth: 1,
        disabled: false,
        onDateClick: () => {},
        selected: false
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<Day {...props} />)
    }

    day() {
      return this.component.find('.Calendar-day')
    }

    dayOfMonth() {
      return this.day().text()
    }

    isDisabled() {
      return this.day().hasClass('is-disabled')
    }

    isSelected() {
      return this.day().hasClass('is-selected')
    }

    isCurrent() {
      return this.day().hasClass('is-current')
    }
  }

  it('renders a day', () => {
    const component = new DayComponent({ dayOfMonth: 2 })

    expect(component.dayOfMonth()).to.equal('2')
  })

  it('sets day as current', () => {
    const component = new DayComponent({ current: true })

    expect(component.isCurrent()).to.true
  })

  it('sets day as disabled', () => {
    const component = new DayComponent({ disabled: true })

    expect(component.isDisabled()).to.true
  })

  it('sets day as selected', () => {
    const component = new DayComponent({ selected: true })

    expect(component.isSelected()).to.true
  })
})
