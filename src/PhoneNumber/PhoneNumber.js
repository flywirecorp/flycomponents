import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PrefixSelector from './PrefixSelector';
import classNames from 'classnames';
import isEmpty from '../utils/isEmpty';
import FormGroup from '../FormGroup';
import { getAriaDescribedBy } from '../utils/aria';

const NO_VALUE = '';
const DEFAULT_PREFIX_LABEL = 'Phone country code';

class PhoneNumber extends Component {
  static propTypes = {
    ariaDescribedBy: PropTypes.string,
    countries: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    getA11yStatusMessage: PropTypes.func,
    hint: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    prefixLabel: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    ariaDescribedBy: '',
    countries: [],
    disabled: false,
    floatingLabel: true,
    prefixLabel: DEFAULT_PREFIX_LABEL,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.numberInputRef = React.createRef();

    const { value: currentNumber = NO_VALUE } = this.props;
    const prefix = this.getCountryFrom(currentNumber);

    this.state = {
      prefix,
      formattedNumber: this.getWithoutPrefix(currentNumber, prefix),
      phoneNumber: currentNumber,
      isFocused: false
    };
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

    const compareDialingCodeCountries = (country1, country2) => {
      const { dialingCode: dialingCode1 } = country1;
      const { dialingCode: dialingCode2 } = country2;

      const length1 = (dialingCode1 && dialingCode1.length) || 0;
      const length2 = (dialingCode2 && dialingCode2.length) || 0;

      if (length1 > length2) return -1;
      if (length1 < length2) return 1;
      return 0;
    };

    const selectedCountries = countries
      .filter(country => phoneNumber.startsWith(country.dialingCode))
      .sort(compareDialingCodeCountries);

    return selectedCountries.length === 0
      ? NO_VALUE
      : selectedCountries[0].dialingCode;
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

    const phoneNumber = `+${prefix} ${formattedNumber}`;

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

  get validOptions() {
    const { countries } = this.props;

    return countries.filter(({ dialingCode }) => !isEmpty(dialingCode));
  }

  render() {
    const {
      ariaDescribedBy,
      countries,
      disabled,
      error,
      floatingLabel,
      getA11yStatusMessage,
      hint,
      label,
      name,
      onBlur,
      onChange,
      onFocus,
      prefixLabel,
      readOnly,
      required,
      value,
      ...otherProps
    } = this.props;

    const { formattedNumber, isFocused, prefix } = this.state;
    const widthClassName = `width-${prefix.length}`;

    return (
      <div className={classNames('PhoneNumber', widthClassName)}>
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
              options={this.validOptions}
              readOnly={readOnly}
              value={prefix}
              label={prefixLabel}
              getA11yStatusMessage={getA11yStatusMessage}
            />
            <div className="PhoneNumber-input">
              <input
                aria-describedby={getAriaDescribedBy(name, ariaDescribedBy)}
                aria-disabled={disabled}
                aria-invalid={!!error}
                aria-labelledby={`${name}-label`}
                aria-readonly={readOnly}
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
                required={required}
                {...otherProps}
              />
            </div>
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default PhoneNumber;
