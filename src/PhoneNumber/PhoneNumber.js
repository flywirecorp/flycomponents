import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PrefixSelector from './PrefixSelector';
import { applyPattern } from '../utils/formatter';
import FormGroup from '../FormGroup';

const NO_COUNTRY = {};
const NO_VALUE = '';

class PhoneNumber extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    hint: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    countries: [],
    disabled: false,
    floatingLabel: true,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.numberInputRef = React.createRef();

    const { value = NO_VALUE } = this.props;
    const { value: isoCode, phonePattern } = this.getCountryFrom(value);
    const formattedNumber = this.formatNumber(value, phonePattern);

    this.state = {
      formattedNumber,
      isFocused: false,
      preferredCountryIsoCode: null,
      selectedCountry: isoCode
    };
  }

  getCountry(isoCode) {
    const { countries } = this.props;

    return countries.find(country => country.value === isoCode) || NO_COUNTRY;
  }

  getCountryFrom(phoneNumber) {
    const { countries } = this.props;
    const { preferredCountryIsoCode } = this.state || {};
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    const possibleCountries = countries.filter(country => {
      return cleanPhoneNumber.startsWith(country.dialingCode);
    });

    if (possibleCountries.length === 0) return NO_COUNTRY;
    return (
      possibleCountries.find(
        country => country.value === preferredCountryIsoCode
      ) || possibleCountries[0]
    );
  }

  formatNumber(value, phonePattern) {
    return applyPattern(value, phonePattern, { ignoreExcedingText: false });
  }

  handleBlur = () => {
    const { name, onBlur } = this.props;

    this.setState({ isFocused: false });
    onBlur(name);
  };

  handleChange = e => {
    const { value: currentNumber, selectionStart: caretPosition } = e.target;
    const { phonePattern, value: selectedCountry } = this.getCountryFrom(
      currentNumber
    );

    let formattedNumber = currentNumber.replace(/(?!^\+)\D/gm, '');

    if (phonePattern) {
      formattedNumber = this.formatNumber(formattedNumber, phonePattern);
    }

    this.setState({ selectedCountry, formattedNumber }, () => {
      this.sendChange(formattedNumber);
      this.setCaretPosition(caretPosition, currentNumber, formattedNumber);
    });
  };

  setCaretPosition = (currentPosition, currentNumber, newPhoneNumber) => {
    const currentSeparators = this.getSeparatorsToPosition(
      currentNumber,
      currentPosition
    );

    const newSeparators = this.getSeparatorsToPosition(
      newPhoneNumber,
      currentPosition
    );

    let lengthDiff = newPhoneNumber.length - currentNumber.length;
    let separatorsDiff = newSeparators.length - currentSeparators.length;

    const position = this.hasFormatChange(lengthDiff, separatorsDiff)
      ? currentPosition + (lengthDiff || 1)
      : currentPosition;

    this.numberInputRef.current.setSelectionRange(position, position);
  };

  getSeparatorsToPosition = (phoneNumber, toPosition) => {
    return (
      (phoneNumber && phoneNumber.substring(0, toPosition).match(/[^0-9]/g)) ||
      []
    );
  };

  hasFormatChange = (lengthDiff, separatorsDiff) =>
    lengthDiff >= 0 && separatorsDiff !== 0;

  handleCountryClick = isoCode => {
    const {
      selectedCountry: currentSelectedCountry,
      formattedNumber: currentFormattedNumber
    } = this.state;

    const { dialingCode: currentDialingCode } = this.getCountry(
      currentSelectedCountry
    );
    const { dialingCode, phonePattern } = this.getCountry(isoCode);

    let phoneNumber = (currentFormattedNumber || dialingCode)
      .replace(/\D/g, '')
      .replace(currentDialingCode, dialingCode);

    this.setState({
      preferredCountryIsoCode: isoCode,
      selectedCountry: isoCode,
      formattedNumber: this.formatNumber(phoneNumber, phonePattern)
    });
  };

  handleFocus = () => {
    const { name, onFocus } = this.props;

    this.setState({ isFocused: true });
    onFocus(name);
  };

  sendChange(value) {
    const { name, onChange } = this.props;

    onChange(name, value);
  }

  render() {
    const {
      countries,
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      required,
      value,
      ...otherProps
    } = this.props;

    const { formattedNumber, isFocused, selectedCountry } = this.state;

    return (
      <div className="PhoneNumber" {...otherProps}>
        <FormGroup
          className="PhoneNumber"
          disabled={disabled}
          error={error}
          floatingLabel={floatingLabel}
          hint={hint}
          isFocused={isFocused}
          label={label}
          name={name}
          readOnly={readOnly}
          required={required}
          hasValue={!!formattedNumber}
        >
          <div className="PhoneNumber-field">
            <PrefixSelector
              disabled={disabled}
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
                disabled={disabled}
                id={name}
                name={name}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                ref={this.numberInputRef}
                readOnly={readOnly}
                type="text"
                value={formattedNumber}
              />
            </div>
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default PhoneNumber;
