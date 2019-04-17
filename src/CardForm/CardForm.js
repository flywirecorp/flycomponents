import React from 'react';
import TextInput from '../TextInput';

const CardForm = () => {
  const shouldAddSeparatorBeforeTyping = true;
  const expiryDateFormat = {
    pattern: '../..',
    options: { shouldAddSeparatorBeforeTyping }
  };
  const cardNumberFormat = {
    pattern: '....-....-....-....',
    options: { shouldAddSeparatorBeforeTyping }
  };
  const cvvFormat = { pattern: '....' };

  return (
    <form>
      <TextInput name="name" label="Cardholder's name" />
      <TextInput name="surname" label="Cardholder's surname" />
      <TextInput
        format={cardNumberFormat}
        name="card-number"
        label="Card number"
      />
      <TextInput
        format={expiryDateFormat}
        name="name"
        label="Expiry date (MM/YY)"
      />
      <TextInput format={cvvFormat} name="name" label="CVV" />
    </form>
  );
};

export default CardForm;
