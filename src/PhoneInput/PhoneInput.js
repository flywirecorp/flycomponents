import PropTypes from 'prop-types'
import React, { Component } from 'react'
import FlagSelector from './FlagSelector'
import { applyPattern } from '../utils/formatter'

const NO_COUNTRY = {}
const NO_VALUE = ''

class PhoneInput extends Component {
  constructor(props) {
    super(props)

    const { value = NO_VALUE } = this.props
    const { value: isoCode, phonePattern } = this.getCountryFrom(value)
    const formattedNumber = applyPattern(value, phonePattern)

    this.state = {
      formattedNumber,
      preferredCountryIsoCode: null,
      selectedCountry: isoCode
    }
  }

  handleBlur = () => {
    const { name, onBlur } = this.props
    onBlur(name)
  }

  handleChange = e => {
    let { value: phoneNumber } = e.target
    const { phonePattern, value: selectedCountry } = this.getCountryFrom(
      phoneNumber
    )

    phoneNumber = phoneNumber.replace(/(?!^\+)\D/gm, '')

    if (phonePattern) {
      phoneNumber = applyPattern(phoneNumber, phonePattern)
    }

    this.setState(() => {
      return { selectedCountry, formattedNumber: phoneNumber }
    }, this.sendChange(phoneNumber))
  }

  handleCountryClick = isoCode => {
    const {
      selectedCountry: currentSelectedCountry,
      formattedNumber: currentFormattedNumber
    } = this.state

    const { dialingCode: currentDialingCode } = this.getCountry(
      currentSelectedCountry
    )
    const { dialingCode, phonePattern } = this.getCountry(isoCode)

    let phoneNumber = (currentFormattedNumber || dialingCode)
      .replace(/\D/g, '')
      .replace(currentDialingCode, dialingCode)

    this.setState({
      preferredCountryIsoCode: isoCode,
      selectedCountry: isoCode,
      formattedNumber: applyPattern(phoneNumber, phonePattern)
    })
  }

  getCountry(isoCode) {
    const { countries } = this.props

    return countries.find(country => country.value === isoCode) || NO_COUNTRY
  }

  getCountryFrom(phoneNumber) {
    const { countries } = this.props
    const { preferredCountryIsoCode } = this.state || {}
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
    const possibleCountries = countries.filter(country => {
      return cleanPhoneNumber.startsWith(country.dialingCode)
    })

    if (possibleCountries.length === 0) return NO_COUNTRY
    return (
      possibleCountries.find(
        country => country.value === preferredCountryIsoCode
      ) || possibleCountries[0]
    )
  }

  sendChange(value) {
    const { name, onChange } = this.props

    onChange(name, value)
  }

  render() {
    const { countries, name, onFocus, readOnly } = this.props
    const { formattedNumber, selectedCountry } = this.state

    return (
      <div className="PhoneNumber">
        <FlagSelector
          name={name}
          onChange={(name, value) => this.handleCountryClick(value)}
          onFocus={onFocus}
          options={countries}
          readOnly={readOnly}
          value={selectedCountry}
        />
        <div className="PhoneNumber-input">
          <input
            autoComplete="off"
            className="Input PhoneNumber-input-inner"
            id={name}
            name={name}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={onFocus}
            readOnly={readOnly}
            ref="input"
            type="text"
            value={formattedNumber}
          />
        </div>
      </div>
    )
  }
}

const { array, bool, func, string } = PropTypes

PhoneInput.propTypes = {
  countries: array.isRequired,
  name: string.isRequired,
  onBlur: func,
  onChange: func,
  onFocus: func,
  readOnly: bool,
  value: string
}

PhoneInput.defaultProps = {
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {}
}

export default PhoneInput
