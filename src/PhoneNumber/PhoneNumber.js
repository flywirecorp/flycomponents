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
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    prefix: '',
    readOnly: false
  };

  constructor(props) {
    super(props);
    this.numberInputRef = React.createRef();

    const { value = NO_VALUE, prefix } = this.props;

    const phoneNumber = value;

    this.state = {
      prefix: prefix,
      phoneNumber,
      isFocused: false
    };
  }

  handleBlur = () => {
    const { name, onBlur } = this.props;

    this.setState({ isFocused: false });
    onBlur(name);
  };

  handleChange = e => {
    const { value: currentNumber } = e.target;
    const { prefix } = this.state;

    const phoneNumber = currentNumber.replace(/[^\d]/gm, '');

    const formattedNumber = prefix ? `+${prefix} ${phoneNumber}` : phoneNumber;

    this.setState({ phoneNumber }, () => {
      this.sendChange(formattedNumber);
    });
  };

  handlePrefixClick = prefix => {
    const { phoneNumber } = this.state;

    if (phoneNumber === NO_VALUE) return;

    const formattedNumber = `+${prefix} ${phoneNumber}`;

    this.setState({ prefix }, () => {
      this.sendChange(formattedNumber);
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

    const { prefix, phoneNumber, isFocused } = this.state;

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
          hasValue={!!phoneNumber}
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
                value={phoneNumber}
              />
            </div>
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default PhoneNumber;
