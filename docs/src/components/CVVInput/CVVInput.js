/* eslint-disable */
import React from 'react';
import Component from '../Component';
import CVVInput from '../../../../src/CardForm/CVVInput';
import README from './README.md';

export default () => {
  const props = {
    name: 'cvv',
    label: 'CVV',
    onBlur: (name) => { console.log(`Received onBlur for field ${name}`)},
    onFocus: (name) => { console.log(`Received onFocus for field ${name}`)},
    onChange: (name, value) => { console.log(`Received onChange for field ${name} with value ${value}`)},
    className: 'cardForm-cvv',
    ariaRequired: true,
    cvvTooltip: '3 digit in the back of the card or 4 digits in the front part'
  };

  return (
    <Component readme={README}>
      <CVVInput {...props}/>
      <CVVInput {...props} error="Invalid CVV"/>
    </Component>
  );
};
