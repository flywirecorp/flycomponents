import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import TextInput from './TextInput'
import InputGroup from '../InputGroup'
import Textarea from '../Textarea'
import Input from '../Input'

describe('TextInput', () => {
  class TextInputComponent {
    constructor(ownProps) {
      const defaultProps = { name: 'name' }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<TextInput {...props} />)
    }

    inputGroup() {
      return this.component.find(InputGroup)
    }

    textarea() {
      return this.component.find(Textarea)
    }

    input() {
      return this.component.find(Input)
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
  }

  it('renders an input text', () => {
    const component = new TextInputComponent()

    expect(component.input()).to.have.length(1)
  })

  it('renders a textarea', () => {
    const component = new TextInputComponent({ multiline: true })

    expect(component.textarea()).to.have.length(1)
  })

  it('renders a input group with prefix', () => {
    const component = new TextInputComponent({ prefix: 'PREFIX' })
    const inputGroup = component.inputGroup()

    expect(inputGroup).to.have.length(1)
    expect(inputGroup.prop('prefix')).to.eq('PREFIX')
  })

  it('renders a input group with sufix', () => {
    const component = new TextInputComponent({ sufix: 'SUFIX' })
    const inputGroup = component.inputGroup()

    expect(inputGroup).to.have.length(1)
    expect(inputGroup.prop('sufix')).to.eq('SUFIX')
  })

  it('handles on change events in input', () => {
    const onChange = sinon.spy()
    const props = { onChange }

    const component = new TextInputComponent(props)

    component.simulateChange('name', 'Dolores')

    expect(onChange.calledWith('name', 'Dolores')).to.be.true
  })

  it('handles on blur events in input', () => {
    const onBlur = sinon.spy()
    const component = new TextInputComponent({ onBlur })

    component.simulateBlur('name')

    expect(onBlur.called).to.be.true
  })
})
