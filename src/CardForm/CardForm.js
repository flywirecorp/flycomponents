import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import CardNumberInput from './CardNumberInput';
import Button from '../Button';
import {
  validateExpirationDate,
  validateCardNumber,
  validateCardType,
  validateCvvInput
} from '../utils/validators';
import { getCardType } from '../utils/card';
import CVVInput from './CVVInput/CVVInput';

const LETTERS_AND_SPACE_REGEX = /[a-zA-Z ]*/g;
const NUMBERS_REGEX = /[0-9]*/g;

const EXPIRY_DATE_FORMAT = {
  pattern: '../..',
  shouldAddSeparatorBeforeTyping: true,
  allowedCharacters: NUMBERS_REGEX
};
const CARD_NUMBER_FORMAT = {
  pattern: '....-....-....-....',
  shouldAddSeparatorBeforeTyping: true,
  allowedCharacters: NUMBERS_REGEX
};
const CVV_FORMAT = {
  pattern: '....',
  allowedCharacters: NUMBERS_REGEX
};
const TEXT_ONLY_FORMAT = {
  allowedCharacters: LETTERS_AND_SPACE_REGEX
};

class CardForm extends Component {
  static propTypes = {
    acceptedCards: PropTypes.array,
    children: PropTypes.node,
    errors: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      cardNumber: PropTypes.string,
      cardType: PropTypes.string,
      expiryDate: PropTypes.string,
      cvv: PropTypes.string
    }),
    labels: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      cardNumber: PropTypes.string,
      expiryDate: PropTypes.string,
      cvv: PropTypes.string,
      cvvTooltip: PropTypes.string,
      submit: PropTypes.string,
      cancel: PropTypes.string
    }),
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    acceptedCards: ['VISA', 'MC'],
    errors: {
      name: 'Invalid name',
      surname: 'Invalid surname',
      cardNumber: 'Invalid card',
      cardType: 'Only Visa and Mastercard are supported',
      expiryDate: 'Invalid expiration date',
      cvv: 'Invalid CVV number'
    },
    labels: {
      name: `Cardholder's name`,
      surname: `Cardholder's surname`,
      cardNumber: 'Card number',
      expiryDate: 'Expiry date (MM/YY)',
      cvv: 'CVV',
      cvvTooltip: '3 digits in the back of your card or 4 digits in the front',
      submit: 'Submit',
      cancel: 'Cancel'
    },
    onSubmit: () => {},
    onChange: () => {}
  };

  state = {
    errors: {},
    values: {
      name: '',
      surname: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  };

  handleChange = (name, value) => {
    const { onChange } = this.props;
    const { values: previousValues } = this.state;
    const values = { ...previousValues, [name]: value };

    this.setState({ values }, onChange(name, value));
  };

  handleFocus = name => {
    const { [name]: removedError, ...errors } = this.state.errors;
    this.setState({ errors });
  };

  handleBlur = (name, value) => {
    const error = this.validateField(name, value);
    const { errors } = this.state;

    this.setState({ errors: { ...errors, ...error } });
  };

  validateCvvField(value) {
    const { errors } = this.props;
    const {
      values: { cardNumber }
    } = this.state;
    const cardType = getCardType(cardNumber);

    if (!cardType) return;

    const isValid = validateCvvInput(value, cardType);
    if (!isValid) return { cvv: errors['cvv'] };
  }

  validateExpiryDateField(value) {
    const { errors } = this.props;

    if (!validateExpirationDate(value))
      return { expiryDate: errors.expiryDate };
  }

  validateCardNumberField(value) {
    const { acceptedCards, errors } = this.props;

    if (!validateCardNumber(value)) return { cardNumber: errors.cardNumber };

    if (!validateCardType(value, acceptedCards))
      return { cardNumber: errors.cardType };
  }

  handleSubmit = e => {
    const { onSubmit } = this.props;
    const { values } = this.state;

    e.preventDefault();

    let errors = {};

    Object.entries(values).forEach(([name, value]) => {
      errors = { ...errors, ...this.validateField(name, value) };
    });

    this.setState({ errors });

    const cardType = getCardType(values.cardNumber);
    const payload = { ...values, cardType };
    if (Object.entries(errors).length === 0) onSubmit(payload);
  };

  validateField = (name, value) => {
    const { errors } = this.props;

    if (!value) return { [name]: errors[name] };
    if (name === 'expiryDate') return this.validateExpiryDateField(value);
    if (name === 'cardNumber') return this.validateCardNumberField(value);
    if (name === 'cvv') return this.validateCvvField(value);
  };

  render() {
    const { labels, children, onCancel } = this.props;
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="CardForm">
          <TextInput
            format={TEXT_ONLY_FORMAT}
            name="name"
            label={labels.name}
            floatingLabel
            error={errors.name}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            className="CardForm-Input"
          />
          <TextInput
            format={TEXT_ONLY_FORMAT}
            name="surname"
            label={labels.surname}
            error={errors.surname}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            className="CardForm-Input"
          />
          <CardNumberInput
            format={CARD_NUMBER_FORMAT}
            name="cardNumber"
            label={labels.cardNumber}
            error={errors.cardNumber || errors.cardType}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            className="CardForm-Input"
          />
          <TextInput
            format={EXPIRY_DATE_FORMAT}
            name="expiryDate"
            label={labels.expiryDate}
            error={errors.expiryDate}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            className="CardForm-Input CardForm-Input--ExpiryDate"
          />
          <CVVInput
            format={CVV_FORMAT}
            name="cvv"
            label={labels.cvv}
            cvvTooltip={labels.cvvTooltip}
            error={errors.cvv}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            className="CardForm-Input CardForm-Input--CVV"
          />
          {children}
        </div>
        <div className="CardForm-Buttons">
          {onCancel && (
            <Button
              className="Button Button--default Button--block"
              type="button"
              value={labels.cancel}
              onClick={onCancel}
            >
              {labels.cancel}
            </Button>
          )}
          <Button
            className="Button Button--primary Button--block"
            type="submit"
            value={labels.submit}
          >
            {labels.submit}
          </Button>
        </div>
      </form>
    );
  }
}

export default CardForm;
