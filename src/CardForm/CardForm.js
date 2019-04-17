import React from 'react';
import TextInput from '../TextInput';

const CardForm = () => {
  const format = {
    pattern: '../..',
    options: {
      shouldAddSeparatorBeforeTyping: true
    }
  };

  return (
    <form>
      <TextInput format={format} name="name" label="Cardholder's name" />
    </form>
  );
};

export default CardForm;
