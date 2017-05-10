import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Alert from './Alert'

describe.only('Alert', () => {
  class AlertComponent {
    constructor({ children, ...ownProps }) {
      const defaultProps = {}
      const props = { ...defaultProps, ...ownProps }

      this.component = shallow(
        <Alert {...props}>
          {children || 'a message'}
        </Alert>
      )
    }

    find(ele) {
      return this.component.find(ele)
    }

    container() {
      return this.component.find('.Alert')
    }
  }

  it('renders children passed in', () => {
    const children = <div className="unique" />
    const component = new AlertComponent({ children })

    expect(component.find('.unique')).to.have.length(1)
  })

  it('renders diferent warning levels', () => {
    const type = 'danger'
    const component = new AlertComponent({ type })

    expect(component.container().hasClass('Alert--danger')).to.equal(true)
  })
})
