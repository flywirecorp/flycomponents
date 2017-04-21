import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MoneyInput from './MoneyInput'
import InputGroup from '../InputGroup'

describe('MoneyInput', () => {
  class MoneyInputComponent {
    constructor(ownProps) {
      const defaultProps = {
        currencySymbol: '$',
        decimalMark: '.',
        name: 'name',
        onChange: () => {},
        thousandsSeparator: ','
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<MoneyInput {...props} />)
    }

    input() {
      return this.component.find(InputGroup)
    }

    simulateBlur(name) {
      this.input().simulate('blur', {
        target: { name }
      })
    }

    simulateChange(name, value) {
      this.input().simulate('change', {
        target: { name, value }
      })
    }

    simulateClick(callback = () => {}) {
      this.input().simulate('click', {
        target: { value: '', setSelectionRange: callback }
      })
    }
  }

  it('handles on change events in input', () => {
    const onChange = sinon.spy()
    const props = {
      decimalMark: ',',
      onChange,
      subunitToUnit: 100,
      currencySymbol: '€',
      symbolFirst: true,
      thousandsSeparator: '.'
    }

    const component = new MoneyInputComponent(props)

    component.simulateChange('amount', '€1.000')

    expect(onChange.calledWith('amount', 100000)).to.be.true
  })

  it('handles on blur events in input', () => {
    const onBlur = sinon.spy()
    const component = new MoneyInputComponent({ onBlur })

    component.simulateBlur('amount')

    expect(onBlur.called).to.be.true
  })

  it('selects the input value when click', () => {
    const component = new MoneyInputComponent()
    const onClickCallback = sinon.spy()

    component.simulateClick(onClickCallback)

    expect(onClickCallback.called).to.be.true
  })

  it('renders a read-only money input if the property is set', () => {
    const component = new MoneyInputComponent({ readOnly: true })

    expect(component.input().prop('readOnly')).to.be.true
  })
})
