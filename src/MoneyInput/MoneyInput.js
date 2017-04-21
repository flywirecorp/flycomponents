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
    const { name } = e.target

    if (typeof onBlur === 'function') {
      onBlur(name)
    }
  }

  handleChange = e => {
    const { decimalMark: decimal, onChange, subunitToUnit } = this.props
    let { name, value } = e.target
    value = toCents(value, { decimal, subunitToUnit })

    if (typeof onChange === 'function') {
      onChange(name, value)
    }
    this.setState({ [name]: value })
  }

  handleClick = e => {
    const { target, target: { value } } = e

    target.setSelectionRange(0, value.length)
  }

  render() {
    const { amount } = this.state
    const {
      currencySymbol: symbol,
      decimalMark: decimal,
      subunitToUnit,
      symbolFirst,
      thousandsSeparator: thousand,
      ...other
    } = this.props

    const settings = {
      cents: false,
      decimal,
      subunitToUnit,
      symbol: false,
      symbolFirst,
      thousand
    }

    const inputAttrs = { ...other, [symbolFirst ? 'prefix' : 'sufix']: symbol }

    return (
      <InputGroup
        {...inputAttrs}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onChange={this.handleChange}
        type="text"
        value={toMoney(amount, settings)}
      />
    )
  }
}

const { bool, func, number, oneOfType, string } = PropTypes

MoneyInput.propTypes = {
  currencySymbol: string,
  decimalMark: string,
  name: string,
  onBlur: func,
  onChange: func,
  subunitToUnit: number,
  symbolFirst: bool,
  thousandsSeparator: string,
  value: oneOfType([number, string])
}

export default MoneyInput
