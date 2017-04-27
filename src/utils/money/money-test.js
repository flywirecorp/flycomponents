import { expect } from 'chai'
import { toCents, toMoney } from './money'

describe('toMoney', () => {
  it('adds thousands separator', () => {
    const options = { symbol: '$', subunitToUnit: 100, cents: false }
    const formattedMoney = toMoney(100001, options)
    const expectFormattedMoney = '$1,000'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })

  it('adds decimal mark', () => {
    const options = { symbol: '$', subunitToUnit: 100, cents: true }
    const formattedMoney = toMoney(100001, options)
    const expectFormattedMoney = '$1,000.01'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })

  it('adds symbol', () => {
    const options = { symbol: '€' }
    const formattedMoney = toMoney(100000, options)
    const expectFormattedMoney = '€1,000.00'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })

  it('adds controls of symbol position', () => {
    const options = { symbol: '€', symbolFirst: false }
    const formattedMoney = toMoney(100000, options)
    const expectFormattedMoney = '1,000.00 €'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })

  it('hides symbol', () => {
    const options = { symbol: false }
    const formattedMoney = toMoney(100000, options)
    const expectFormattedMoney = '1,000.00'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })

  it('adds controls of thousand separator', () => {
    const options = { symbol: '€', thousand: '.' }
    const formattedMoney = toMoney(100000, options)
    const expectFormattedMoney = '€1.000.00'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })

  it('adds controls of decimal separator', () => {
    const options = { symbol: '€', decimal: ',', cents: true }
    const formattedMoney = toMoney(10050, options)
    const expectFormattedMoney = '€100,50'

    expect(formattedMoney).to.equal(expectFormattedMoney)
  })
})

describe('toCents', () => {
  it('converts money to cents', () => {
    const cents = toCents('10.00')
    const expectedCents = 1000

    expect(cents).to.equal(expectedCents)
  })

  it('adds controls of decimal separator', () => {
    const cents = toCents('€1.000', { decimal: ',' })
    const expectedCents = 100000

    expect(cents).to.equal(expectedCents)
  })
})
