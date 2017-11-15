import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputGroup from '../InputGroup';
import { toCents, toMoney } from '../utils/money';

class MoneyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: props.value };
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
    const { target: { name, value: amount } } = e;
    const amountInCents = this.convertToCents(amount);

    onBlur(name, amountInCents);
    this.setState({ amount: amountInCents });
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { name, value: amount } = e.target;
    const amountInCents = this.convertToCents(amount);

    onChange(name, amountInCents);
  };

  handleClick = e => {
    const { target, target: { value } } = e;

    target.setSelectionRange(0, value.length);
  };

  handleKeyDown = e => {
    const COMMA = 188;
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
    const TAB = 9;
    const isNumber = /\d/.test(String.fromCharCode(e.keyCode));
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
      TAB
    ].includes(e.keyCode);

    if (!isNumber && !allowedChars) {
      e.preventDefault();
    }
  };

  render() {
    const { amount } = this.state;
    const {
      currencySymbol: symbol,
      disabled,
      maxLength,
      name,
      readOnly,
      symbolFirst
    } = this.props;

    const inputAttrs = {
      [symbolFirst ? 'prefix' : 'sufix']: symbol,
      maxLength,
      name,
      readOnly,
      disabled
    };

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
    );
  }
}

const { bool, func, number, oneOfType, string } = PropTypes;

MoneyInput.propTypes = {
  currencySymbol: string,
  decimalMark: string,
  disabled: bool,
  maxLength: oneOfType([number, string]),
  name: string.isRequired,
  onBlur: func,
  onChange: func,
  readOnly: bool,
  subunitToUnit: number,
  symbolFirst: bool,
  thousandsSeparator: string,
  value: oneOfType([number, string])
};

MoneyInput.defaultProps = {
  currencySymbol: '$',
  decimalMark: '.',
  disabled: false,
  maxLength: 10,
  onBlur: () => {},
  onChange: () => {},
  subunitToUnit: 100,
  symbolFirst: true,
  thousandsSeparator: ','
};

export default MoneyInput;
