import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Input from '../Input'
import InputGroup from '../InputGroup'

describe('InputGroup', () => {
  class InputComponent {
    constructor (ownProps) {
      const defaultProps = {
        name: 'name',
        type: 'text'
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<InputGroup {...props} />)
    }

    input () {
      return this.component.find(Input)
    }

    prefixText () {
      return this.component.find('span').text()
    }

    sufixText () {
      return this.component.find('span').text()
    }
  }

  it('renders an input', () => {
    const name = 'amount'
    const type = 'number'
    const component = new InputComponent({ name, type })

    expect(
      component.input()
    ).to.have.length(1)

    expect(
      component.input().prop('name')
    ).to.equal('amount')

    expect(
      component.input().prop('type')
    ).to.equal('number')
  })

  it('renders a prefix', () => {
    const component = new InputComponent({ prefix: '$' })

    expect(
      component.prefixText()
    ).to.equal('$')
  })

  it('renders a sufix', () => {
    const component = new InputComponent({ sufix: '.00' })

    expect(
      component.sufixText()
    ).to.equal('.00')
  })
})
