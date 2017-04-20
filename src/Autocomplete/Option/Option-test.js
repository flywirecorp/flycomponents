import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Highlighter from '../Highlighter'
import Option from './Option'

describe('Option', () => {
  class OptionComponent {
    constructor (ownProps) {
      const defaultProps = {
        hasFocus: false,
        label: 'Option',
        onClick: () => {},
        onMouseEnter: () => {},
        searchQuery: '',
        value: 'opt'
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<Option {...props} />)
    }

    option () {
      return this.component.find('li')
    }

    simulateClick () {
      this.component.simulate('click')
    }

    doMouseEnter () {
      this.option().simulate('mouseEnter')
    }

    highlighText () {
      return this.option().find(Highlighter)
    }
  }

  it('renders an option', () => {
    const component = new OptionComponent()

    expect(
      component.option()
    ).to.have.length(1)
  })

  it('has an active status when focus', () => {
    const hasFocus = true
    const component = new OptionComponent({ hasFocus })

    expect(
      component.option().prop('className')
    ).to.include('is-active')
  })

  it('simulates click events', () => {
    const onClick = sinon.spy()
    const value = 'optionValue'
    const component = new OptionComponent({ onClick, value })

    component.simulateClick()

    expect(
      onClick.calledWith('optionValue')
    ).to.be.true
  })

  it('simulates mouse enter events', () => {
    const onMouseEnter = sinon.spy()
    const value = 'optionValue'
    const component = new OptionComponent({ onMouseEnter, value })

    component.doMouseEnter()

    expect(
      onMouseEnter.calledWith('optionValue')
    ).to.be.true
  })

  it('highlighs texts', () => {
    const label = 'Hello World!'
    const searchQuery = 'World'
    const component = new OptionComponent({ label, searchQuery })
    const highlighText = component.highlighText()

    expect(
      highlighText
    ).to.have.length(1)

    expect(
      highlighText.prop('text')
    ).to.equal(label)

    expect(
      highlighText.prop('subString')
    ).to.equal(searchQuery)
  })

  it('disables highligh text', () => {
    const highlighText = false
    const component = new OptionComponent({ highlighText })

    expect(
      component.highlighText()
    ).to.have.length(0)
  })
})
