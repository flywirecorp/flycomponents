import PropTypes from 'prop-types'
import React, { Component } from 'react'
import InputGroup from '../InputGroup'
import { toCents, toMoney } from '../utils/money'

class MoneyInput extends Component {
  constructor(props) {
    super(props)
    this.state = { amount: props.value }
  }

  handleBlur = e => {
    const { onBlur } = this.props
    const { target: { name, value: amount } } = e
    const amountInCents = this.convertToCents(amount)

    if (typeof onBlur === 'function') {
      onBlur(name, amountInCents)
    }
    this.setState({ amount: amountInCents })
  }

  handleChange = e => {
    const { onChange } = this.props
    const { name, value: amount } = e.target
    const amountInCents = this.convertToCents(amount)

    onChange(name, amountInCents)
  }

  handleClick = e => {
    const { target, target: { value } } = e

    target.setSelectionRange(0, value.length)
  }

  handleKeyDown = e => {
    const COMMA = 188
    const DELETE = 8
    const LEFT_ARROW = 39
    const PERIOD = 190
    const RIGHT_ARROW = 37
    const TAB = 9
    const isNumber = /\d/.test(String.fromCharCode(e.keyCode))
    const allowedChars = [
      COMMA,
      DELETE,
      LEFT_ARROW,
      PERIOD,
      RIGHT_ARROW,
      TAB
    ].includes(e.keyCode)

    if (!isNumber && !allowedChars) {
      e.preventDefault()
    }
  }

  convertToCents(amount) {
    const { decimalMark: decimal, subunitToUnit } = this.props

    return toCents(amount, { decimal, subunitToUnit })
  }

  format(cents) {
    const {
      decimalMark: decimal,
      subunitToUnit,
      thousandsSeparator: thousand
    } = this.props

    const settings = {
      decimal,
      subunitToUnit,
      symbol: false,
      thousand
    }

    return toMoney(cents, settings)
  }

  render() {
    const { amount } = this.state
    const {
      currencySymbol: symbol,
      maxLength,
      name,
      readOnly,
      symbolFirst
    } = this.props

    const inputAttrs = {
      [symbolFirst ? 'prefix' : 'sufix']: symbol,
      maxLength,
      name,
      readOnly
    }

    return (
      <InputGroup
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        type="text"
        defaultValue={this.format(amount)}
        key={amount}
      />
    )
  }
}

const { bool, func, number, oneOfType, string } = PropTypes

MoneyInput.propTypes = {
  currencySymbol: string,
  decimalMark: string,
  maxLength: oneOfType([number, string]),
  name: string.isRequired,
  onBlur: func,
  onChange: func,
  prefix: string,
  readOnly: bool,
  subunitToUnit: number,
  symbolFirst: bool,
  thousandsSeparator: string,
  value: oneOfType([number, string])
}

MoneyInput.defaultProps = {
  currencySymbol: '$',
  decimalMark: '.',
  maxLength: 10,
  onBlur: () => {},
  onChange: () => {},
  subunitToUnit: 100,
  symbolFirst: true,
  thousandsSeparator: ','
}

export default MoneyInput
