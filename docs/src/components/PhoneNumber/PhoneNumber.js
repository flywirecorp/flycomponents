import React from 'react';
import { PhoneNumber } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const countries = [
    {
      label: 'Spain (+34)',
      value: 'es',
      dialingCode: '34',
      phonePattern: '+.. ... ... ...'
    },
    {
      label: 'United States (+1)',
      value: 'us',
      dialingCode: '1',
      phonePattern: '+. (...) ...-....'
    }
  ];

  return (
    <Component readme={README}>
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Telephone number"
      />
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Default label"
        floatingLabel={false}
        value="+34"
      />
      <PhoneNumber
        countries={countries}
        name="phone2"
        label="Default value"
        value="+34 555 555 555"
      />
    </Component>
  );
};
