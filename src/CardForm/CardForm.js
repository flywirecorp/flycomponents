import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextInput from './TextInput';
import CardNumberInput from './CardNumberInput';
import Button from '../Button';
import {
  validateExpirationDate,
  validateCardNumber,
  validateCardType,
  validateCvvInput
} from '../utils/validators';
import { VISA, MASTERCARD, UNIONPAY, getCardType } from '../utils/card';
import CVVInput from './CVVInput/CVVInput';

const CARD_NUMBER_FIELD = 'cardNumber';
const NAME_FIELD = 'name';
const SURNAME_FIELD = 'surname';
const EXPIRY_DATE_FIELD = 'expiryDate';
const CVV_FIELD = 'cvv';

const LETTERS_AND_SPACE_REGEX = /[a-zA-Z ]*/g;
const NUMBERS_REGEX = /[0-9]*/g;

const DEFAULT_FORMATS = {
  [NAME_FIELD]: {
    allowedCharacters: LETTERS_AND_SPACE_REGEX
  },
  [SURNAME_FIELD]: {
    allowedCharacters: LETTERS_AND_SPACE_REGEX
  },
  [CARD_NUMBER_FIELD]: {
    pattern: '....-....-....-....',
    shouldAddSeparatorBeforeTyping: true,
    allowedCharacters: NUMBERS_REGEX
  },
  [EXPIRY_DATE_FIELD]: {
    pattern: '../..',
    shouldAddSeparatorBeforeTyping: true,
    allowedCharacters: NUMBERS_REGEX
  },
  [CVV_FIELD]: {
    pattern: '....',
    allowedCharacters: NUMBERS_REGEX
  }
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
    isCompressed: PropTypes.bool,
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
    onSubmit: PropTypes.func,
    optionalFields: PropTypes.array
  };

  static defaultProps = {
    acceptedCards: [VISA, MASTERCARD],
    errors: {
      [NAME_FIELD]: 'Invalid name',
      [SURNAME_FIELD]: 'Invalid surname',
      [CARD_NUMBER_FIELD]: 'Invalid card',
      cardType: 'Only Visa and Mastercard are supported',
      [EXPIRY_DATE_FIELD]: 'Invalid expiration date',
      [CVV_FIELD]: 'Invalid CVV number'
    },
    labels: {
      [NAME_FIELD]: `Cardholder's name`,
      [SURNAME_FIELD]: `Cardholder's surname`,
      [CARD_NUMBER_FIELD]: 'Card number',
      [EXPIRY_DATE_FIELD]: 'Expiry date (MM/YY)',
      [CVV_FIELD]: 'CVV',
      cvvTooltip: '3 digits in the back of your card or 4 digits in the front',
      submit: 'Submit',
      cancel: 'Cancel'
    },
    isCompressed: false,
    onSubmit: () => {},
    onChange: () => {}
  };

  state = {
    errors: {},
    values: {
      [NAME_FIELD]: '',
      [SURNAME_FIELD]: '',
      [CARD_NUMBER_FIELD]: '',
      [EXPIRY_DATE_FIELD]: '',
      [CVV_FIELD]: ''
    }
  };

  handleChange = (name, value) => {
    const { onChange } = this.props;
    const { values: previousValues } = this.state;
    const values = { ...previousValues, [name]: value };

    this.setState({ values });

    onChange(name, value);
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
      values: { [CARD_NUMBER_FIELD]: cardNumber }
    } = this.state;
    const cardType = getCardType(cardNumber);

    if (!cardType) return;

    const isValid = validateCvvInput(value, cardType);
    if (!isValid) return { [CVV_FIELD]: errors[CVV_FIELD] };
  }

  validateExpiryDateField(value) {
    const { errors } = this.props;

    if (!validateExpirationDate(value))
      return { [EXPIRY_DATE_FIELD]: errors[EXPIRY_DATE_FIELD] };
  }

  validateCardNumberField(value) {
    const { acceptedCards, errors } = this.props;

    if (!validateCardNumber(value))
      return { [CARD_NUMBER_FIELD]: errors[CARD_NUMBER_FIELD] };

    if (!validateCardType(value, acceptedCards))
      return { [CARD_NUMBER_FIELD]: errors.cardType };
  }

  handleSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();

    const errors = Object.entries(this.requiredFields).reduce(
      (errors, [name, value]) => {
        return { ...errors, ...this.validateField(name, value) };
      },
      {}
    );

    this.setState({ errors });

    const cardType = getCardType(this.requiredFields[CARD_NUMBER_FIELD]);
    const payload = { ...this.requiredFields, cardType };
    if (Object.entries(errors).length === 0) onSubmit(payload);
  };

  validateField = (name, value) => {
    const { errors } = this.props;

    if (!value) return { [name]: errors[name] };
    if (name === EXPIRY_DATE_FIELD) return this.validateExpiryDateField(value);
    if (name === CARD_NUMBER_FIELD) return this.validateCardNumberField(value);
    if (name === CVV_FIELD) return this.validateCvvField(value);
  };

  isRequiredField = fieldName => {
    const { optionalFields } = this.props;

    return !(optionalFields && optionalFields.includes(fieldName));
  };

  get requiredFields() {
    const { values } = this.state;

    const requiredFields = Object.entries(values).reduce(
      (requiredFields, [name, value]) => {
        if (this.isRequiredField(name))
          return { ...requiredFields, [name]: value };

        return requiredFields;
      },
      {}
    );

    return requiredFields;
  }

  getFieldClassName = field => {
    const { isCompressed } = this.props;

    let classes = classNames('CardForm-Input', {
      'CardForm-Input--Compressed': isCompressed
    });

    switch (field) {
      case CVV_FIELD:
        classes = classNames(classes, 'CardForm-Input--CVV');
        break;
      case EXPIRY_DATE_FIELD:
        classes = classNames(classes, 'CardForm-Input--ExpiryDate');
        break;
      case CARD_NUMBER_FIELD:
        classes = classNames(classes, 'CardForm-Input--Number');
        break;
      case NAME_FIELD:
        classes = classNames(classes, 'CardForm-Input--Name');
        break;
      case SURNAME_FIELD:
        classes = classNames(classes, 'CardForm-Input--Surname');
        break;
    }

    return classes;
  };

  getFieldError = field => {
    const { errors } = this.state;

    if (field === CARD_NUMBER_FIELD)
      return errors[CARD_NUMBER_FIELD] || errors.cardType;

    return errors[field];
  };

  getFieldFormat = field => {
    const { acceptedCards } = this.props;

    if (field === CARD_NUMBER_FIELD && acceptedCards.includes(UNIONPAY))
      return {
        pattern: '....-....-....-....-...',
        shouldAddSeparatorBeforeTyping: false,
        allowedCharacters: NUMBERS_REGEX
      };

    return DEFAULT_FORMATS[field];
  };

  renderField = field => {
    const { labels } = this.props;

    const props = {
      key: field,
      format: this.getFieldFormat(field),
      name: field,
      label: labels[field],
      error: this.getFieldError(field),
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onChange: this.handleChange,
      className: this.getFieldClassName(field)
    };

    if (field === CARD_NUMBER_FIELD) {
      return <CardNumberInput {...props} />;
    } else if (field === CVV_FIELD) {
      return <CVVInput {...props} cvvTooltip={labels.cvvTooltip} />;
    } else {
      return <TextInput {...props} floatingLabel />;
    }
  };

  render() {
    const { labels, children, onCancel, isCompressed } = this.props;

    const classes = classNames('CardForm', {
      'CardForm--Compressed': isCompressed
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes}>
          {Object.entries(this.requiredFields).map(([name]) => {
            return this.renderField(name);
          })}
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
