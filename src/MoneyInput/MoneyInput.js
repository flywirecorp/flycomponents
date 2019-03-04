import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputGroup from '../InputGroup';
import { toCents, toMoney } from '../utils/money';
import FormGroup from '../FormGroup';

class MoneyInput extends Component {
  static propTypes = {
    currencySymbol: PropTypes.string,
    decimalMark: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    hint: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    subunitToUnit: PropTypes.number,
    symbolFirst: PropTypes.bool,
    thousandsSeparator: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static defaultProps = {
    currencySymbol: '$',
    decimalMark: '.',
    disabled: false,
    floatingLabel: true,
    maxLength: 10,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false,
    subunitToUnit: 100,
    symbolFirst: true,
    thousandsSeparator: ','
  };

  constructor(props) {
    super(props);
    this.state = { amount: props.value, isFocused: false };
  }

  convertToCents(amount) {
    const { decimalMark: decimal, subunitToUnit } = this.props;

    return toCents(amount, { decimal, subunitToUnit });
  }

  format(cents) {
    const {
      decimalMark: decimal,
      subunitToUnit,
      thousandsSeparator: thousand
    } = this.props;

    const settings = {
      decimal,
      subunitToUnit,
      symbol: false,
      thousand
    };

    return toMoney(cents, settings);
  }

  handleBlur = e => {
    const { onBlur } = this.props;
    const {
      target: { name, value: amount }
    } = e;
    const amountInCents = this.convertToCents(amount);

    onBlur(name, amountInCents);
    this.setState({ amount: amountInCents, isFocused: false });
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { name, value: amount } = e.target;
    const amountInCents = this.convertToCents(amount);

    onChange(name, amountInCents);
  };

  handleOut = e => {
    const {
      target: { value: amount }
    } = e;
    const amountInCents = this.convertToCents(amount);

    this.setState({ amount: amountInCents, isFocused: false });
  };

  handleClick = e => {
    const {
      target,
      target: { value }
    } = e;

    target.setSelectionRange(0, value.length);
  };

  handleFocus = () => {
    const { onFocus } = this.props;

    onFocus();
    this.setState({ isFocused: true });
  };

  handleKeyDown = e => {
    const CKEY = 67;
    const COMMA = 188;
    const CONTROL_KEY = e.ctrlKey || e.metaKey;
    const DECIMAL_POINT = 110;
    const DELETE = 8;
    const LEFT_ARROW = 39;
    const NUMPAD_0 = 96;
    const NUMPAD_1 = 97;
    const NUMPAD_2 = 98;
    const NUMPAD_3 = 99;
    const NUMPAD_4 = 100;
    const NUMPAD_5 = 101;
    const NUMPAD_6 = 102;
    const NUMPAD_7 = 103;
    const NUMPAD_8 = 104;
    const NUMPAD_9 = 105;
    const PERIOD = 190;
    const RIGHT_ARROW = 37;
    const SUPR = 46;
    const TAB = 9;
    const VKEY = 86;
    const XKEY = 88;
    const isCopy = CONTROL_KEY && e.keyCode === CKEY;
    const isCut = CONTROL_KEY && e.keyCode === XKEY;
    const isNumber = /\d/.test(String.fromCharCode(e.keyCode));
    const isPaste = CONTROL_KEY && e.keyCode === VKEY;
    const allowedChars = [
      COMMA,
      DECIMAL_POINT,
      DELETE,
      LEFT_ARROW,
      NUMPAD_0,
      NUMPAD_1,
      NUMPAD_2,
      NUMPAD_3,
      NUMPAD_4,
      NUMPAD_5,
      NUMPAD_6,
      NUMPAD_7,
      NUMPAD_8,
      NUMPAD_9,
      PERIOD,
      RIGHT_ARROW,
      SUPR,
      TAB
    ].includes(e.keyCode);

    if (!isNumber && !allowedChars && !isPaste && !isCopy && !isCut) {
      e.preventDefault();
    }
  };

  render() {
    const { amount, isFocused } = this.state;
    const {
      currencySymbol: symbol,
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      maxLength,
      name,
      readOnly,
      required,
      symbolFirst
    } = this.props;

    const inputAttrs = {
      [symbolFirst ? 'prefix' : 'suffix']: symbol,
      disabled,
      maxLength,
      name,
      readOnly
    };

    return (
      <FormGroup
        disabled={disabled}
        error={error}
        floatingLabel={floatingLabel}
        hasPrefix={symbolFirst}
        hasSuffix={!symbolFirst}
        hasValue
        hint={hint}
        isFocused={isFocused}
        label={label}
        name={name}
        readOnly={readOnly}
        required={required}
      >
        <InputGroup
          {...inputAttrs}
          defaultValue={this.format(amount)}
          key={amount}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onFocusOut={this.handleOut}
          onMouseOut={this.handleOut}
          onKeyDown={this.handleKeyDown}
          type="text"
        />
      </FormGroup>
    );
  }
}

export default MoneyInput;
