import { expect } from 'chai'
import { applyPattern } from './formatter'

describe('applyPattern', () => {
  it('returns same text if text is blank', () => {
    const pattern = '+.. ... ... ...'
    const text = applyPattern('', pattern)
    const expectedText = ''

    expect(
      text
    ).to.equal(expectedText)
  })

  it('returns same text if no pattern', () => {
    const text = applyPattern('text')
    const expectedText = 'text'

    expect(
      text
    ).to.equal(expectedText)
  })

  it('returns a formatted text', () => {
    const pattern = '+. (...) ...-....'
    const text = applyPattern('166666666666', pattern)
    const expectedText = '+1 (666) 666-6666'

    expect(
      text
    ).to.equal(expectedText)
  })

  it('returns a partial formatted text', () => {
    const pattern = '../../....'
    const text = applyPattern('1212', pattern)
    const expectedText = '12/12'

    expect(
      text
    ).to.equal(expectedText)
  })

  it('ignores exceding text', () => {
    const pattern = '...'
    const text = applyPattern('12345', pattern)
    const expectedText = '123'

    expect(
      text
    ).to.equal(expectedText)
  })
})
