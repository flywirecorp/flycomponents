import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PrefixSelector from './PrefixSelector';

import FormGroup from '../FormGroup';

const NO_VALUE = '';

class PhoneNumber extends Component {
  static propTypes = {
    countries: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    formattedNumber: PropTypes.string,
    hint: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    prefix: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    countries: [],
    disabled: false,
    floatingLabel: true,
    formattedNumber: NO_VALUE,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    prefix: NO_VALUE,
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.numberInputRef = React.createRef();

    const { formattedNumber, prefix, value = NO_VALUE } = this.props;
    const phoneNumber = value;

    this.state = {
      formattedNumber,
      phoneNumber,
      prefix,
      isFocused: false
    };
  }
  componentWillMount() {
    const { phoneNumber: currentNumber } = this.state;

    const prefix = this.getCountryFrom(currentNumber);
    const formattedNumber = this.getWithoutPrefix(currentNumber, prefix);

    this.setState({ formattedNumber, prefix });
  }

  getFormatNumber(value) {
    return value.replace(/[^\d]/g, NO_VALUE);
  }

  getWithoutPrefix(value, prefix = NO_VALUE) {
    const withoutPrefix = value.replace(prefix, NO_VALUE);

    return this.getFormatNumber(withoutPrefix);
  }

  getCountryFrom(value) {
    if (value === NO_VALUE) return NO_VALUE;
    const { countries } = this.props;
    const phoneNumber = this.getFormatNumber(value);

    let countrySelected = [];

    const possibleCountries = countries.filter(country => {
      if (phoneNumber.startsWith(country.dialingCode)) {
        countrySelected.push(Number(country.dialingCode));
        return country.dialingCode;
      }
    });

    if (possibleCountries.length === 0) return NO_VALUE;

    countrySelected.sort().reverse();
    return `${countrySelected[0]}`;
  }

  handleBlur = () => {
    const { name, onBlur } = this.props;

    this.setState({ isFocused: false });
    onBlur(name);
  };

  handleChange = e => {
    const { value: currentNumber } = e.target;
    const { prefix } = this.state;

    const formattedNumber = this.getFormatNumber(currentNumber);
    const phoneNumber = prefix
      ? `+${prefix} ${formattedNumber}`
      : formattedNumber;

    this.setState({ formattedNumber, phoneNumber, prefix }, () => {
      this.sendChange(phoneNumber);
    });
  };

  handlePrefixClick = prefix => {
    const { formattedNumber } = this.state;
    const currentPrefix = this.getCountryFrom(formattedNumber);
    const withoutPrefix = this.getWithoutPrefix(formattedNumber, currentPrefix);

    if (formattedNumber === NO_VALUE) return;

    const phoneNumber = `+${prefix} ${withoutPrefix}`;

    this.setState({ prefix }, () => {
      this.sendChange(phoneNumber);
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

    const { formattedNumber, isFocused, prefix } = this.state;

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
          hasValue={!!value}
        >
          <div className="PhoneNumber-field">
            <PrefixSelector
              disabled={disabled}
              name={name}
              onChange={(name, value) => this.handlePrefixClick(value)}
              onFocus={onFocus}
              options={countries}
              readOnly={readOnly}
              value={prefix}
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
