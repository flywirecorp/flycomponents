import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import moment from 'moment'
import Navigation from './Navigation'

describe('Navigation', () => {
  class NavigationComponent {
    constructor (ownProps) {
      const FAKE_CALLBACK = () => {}
      const defaultProps = {
        onMonthChange: FAKE_CALLBACK,
        onNextMonthClick: FAKE_CALLBACK,
        onPrevMonthClick: FAKE_CALLBACK,
        onYearChange: FAKE_CALLBACK,
        startDate: moment('2016-11-13')
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(
        <Navigation {...props} />,
        { context: { locale: 'en' } }
      )
    }

    navigation () {
      return this.component.find('.Calendar-header')
    }

    prevMonthButton () {
      return this.navigation().find('.Calendar-header-nav--prev button')
    }

    nextMonthButton () {
      return this.navigation().find('.Calendar-header-nav--next button')
    }

    monthSelector () {
      return this.navigation().find('.Calendar-header-nav--month Select')
    }

    monthSelectorLabels () {
      return this.monthSelector().prop('values').map(value => value.label)
    }

    yearSelector () {
      return this.navigation().find('.Calendar-header-nav--year Select')
    }

    yearSelectorLabels () {
      return this.yearSelector().prop('values').map(value => value.label)
    }

    simulatePrevMonthClick () {
      this.prevMonthButton().simulate('click')
    }

    simulateNextMonthClick () {
      this.nextMonthButton().simulate('click')
    }

    simulateSelectMonth (value) {
      this.monthSelector().simulate('change', { target: { value } })
    }
  }

  it('handles a previous month button click', () => {
    const onPrevMonthClick = sinon.spy()
    const component = new NavigationComponent({ onPrevMonthClick })

    component.simulatePrevMonthClick()

    expect(
      onPrevMonthClick.called
    ).to.be.true
  })

  it('handles a next month button click', () => {
    const onNextMonthClick = sinon.spy()
    const component = new NavigationComponent({ onNextMonthClick })

    component.simulateNextMonthClick()

    expect(
      onNextMonthClick.called
    ).to.be.true
  })

  it('handles the onChange event', () => {
    const onMonthChange = sinon.spy()
    const component = new NavigationComponent({ onMonthChange })

    component.simulateSelectMonth(3)
    expect(onMonthChange.calledWith(3)).to.be.true
  })

  describe('month selector', () => {
    it('exists', () => {
      const component = new NavigationComponent()
      const monthSelector = component.monthSelector()

      expect(
        monthSelector
      ).to.have.length(1)

      expect(
        monthSelector.prop('values')
      ).to.have.length(12)
    })
  })

  describe('year selector', () => {
    it('exists', () => {
      const component = new NavigationComponent()

      expect(
        component.yearSelector()
      ).to.have.length(1)
    })

    it('has a hundred of years', () => {
      const startDate = moment('2000-01-01')
      const component = new NavigationComponent({ startDate })
      const years = component.yearSelectorLabels()
      const firstYear = years[0]
      const lastYear = years[99]

      expect(years.length).to.equal(100)
      expect(firstYear).to.equal(1950)
      expect(lastYear).to.equal(2049)
    })
  })
})
