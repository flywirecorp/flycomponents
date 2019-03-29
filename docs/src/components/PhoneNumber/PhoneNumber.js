import React from 'react';
import { PhoneNumber } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const countries = [
    {
      label: 'Spain',
      value: 'es',
      dialingCode: '34',
      phonePattern: '+.. ... ... ...'
    },
    {
      label: 'United States',
      value: 'us',
      dialingCode: '1',
      phonePattern: '+. (...) ...-....'
    },
    {
      label: 'Afghanistan',
      value: 'af',
      dialingCode: '93',
      phonePattern: '+.. (...) ...-....'
    },
    {
      label: 'Åland Islands',
      value: 'ax',
      dialingCode: '358',
      phonePattern: '+... ...-....'
    },
    {
      label: 'Albania',
      value: 'ab',
      dialingCode: '213',
      phonePattern: '+... ...-....'
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
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Disabled phone input"
        value="+34 555 555 555"
        disabled
      />
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Read only phone input"
        value="+1 111 111 111"
        readOnly
      />
    </Component>
  );
};
