import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Options from './Options'

describe('Options', () => {
  it('renders children when passed in', () => {
    const component = shallow(
      <Options>
        <h1>An option</h1>
      </Options>
    )

    expect(
      component.contains('An option')
    ).to.be.true
  })
})
