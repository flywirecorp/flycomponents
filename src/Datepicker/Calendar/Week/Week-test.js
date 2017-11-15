import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import moment from 'moment'
import Week from '../Week'
import Day from '../Day'

describe('Week', () => {
  class WeekComponent {
    constructor(ownProps) {
      const NOVEMBER = 10
      const defaultProps = {
        startingDate: moment('2016-11-13'),
        month: NOVEMBER,
        onDateClick: () => {},
        selected: '11/18/2016'
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<Week {...props} />)
    }

    week() {
      return this.component.find('.week')
    }

    days() {
      return this.component.find(Day)
    }

    dayOfMonth(day) {
      return this.component.find(`[dayOfMonth=${day}]`)
    }
  }

  it('has 7 days', () => {
    const startingDate = moment('2016-11-20')
    const component = new WeekComponent({ startingDate })

    expect(component.days()).to.have.length(7)

    expect(
      component
        .days()
        .first()
        .prop('dayOfMonth')
    ).to.equal(20)
  })

  it('sets current day', () => {
    const startingDate = moment('2016-11-20')
    const selected = '11/21/2016'
    const component = new WeekComponent({ startingDate, selected })

    expect(component.dayOfMonth(21).prop('selected')).to.be.true
  })

  it('sets other month days as disabled', () => {
    const startingDate = moment('2016-11-27')
    const component = new WeekComponent({ startingDate })

    expect(component.dayOfMonth(2).prop('disabled')).to.be.true
  })
})
