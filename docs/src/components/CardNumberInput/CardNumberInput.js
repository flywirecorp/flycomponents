/* eslint-disable */
import React from 'react';
import Component from '../Component';
import CardNumberInput from '../../../../src/CardForm/CardNumberInput';
import README from './README.md';

export default () => {
  const props = {
    name: 'cardNumber',
    label: 'Card Number',
    onBlur: (name) => { console.log(`Received onBlur for field ${name}`)},
    onFocus: (name) => { console.log(`Received onFocus for field ${name}`)},
    onChange: (name, value) => { console.log(`Received onChange for field ${name} with value ${value}`)},
    className: 'cardForm-cardNumber',
    ariaRequired: true,
  };

  return (
    <Component readme={README}>
      <CardNumberInput {...props}/>
      <CardNumberInput {...props} error="Invalid Credit Card"/>
    </Component>
  );
};
