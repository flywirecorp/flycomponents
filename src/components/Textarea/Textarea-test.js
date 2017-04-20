import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Textarea from './Textarea'

describe('Textarea', () => {
  class TextareaComponent {
    constructor (ownProps) {
      const defaultProps = {
        name: 'name'
      }
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(<Textarea {...props} />)
    }

    textarea () {
      return this.component.find('textarea')
    }
  }

  it('renders a textarea', () => {
    const name = 'address'
    const component = new TextareaComponent({ name })

    expect(
      component.textarea()
    ).to.have.length(1)

    expect(
      component.textarea().prop('name')
    ).to.equal('address')
  })

  it('renders a read-only textarea if the property is set', () => {
    const component = new TextareaComponent({ readOnly: true })

    expect(
      component.textarea().prop('readOnly')
    ).to.be.true
  })
})
