import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Label from './Label'

describe('Label', () => {
  class LabelComponent {
    constructor(props) {
      this.component = shallow(<Label {...props} />)
    }

    label(name) {
      return this.component.find(`label[htmlFor="${name}"]`).text()
    }
  }

  it('renders a label', () => {
    const props = { htmlFor: 'amount', value: 'Amount' }
    const component = new LabelComponent(props)

    expect(component.label('amount')).to.equal('Amount')
  })

  it('renders a required label', () => {
    const props = { htmlFor: 'amount', required: true, value: 'Amount' }
    const component = new LabelComponent(props)

    expect(component.label('amount')).to.equal('Amount (*)')
  })
})
