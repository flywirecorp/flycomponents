import React from 'react';
import { PhoneNumber } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const countries = [
    {
      label: 'Spain',
      value: 'es',
      dialingCode: '34'
    },
    {
      label: 'United States',
      value: 'us',
      dialingCode: '1'
    },
    {
      label: 'Afghanistan',
      value: 'af',
      dialingCode: '93'
    },
    {
      label: 'American Samoa',
      value: 'as',
      dialingCode: '1684'
    },
    {
      label: 'Albania',
      value: 'ab',
      dialingCode: '213'
    }
  ];

  return (
    <Component readme={README}>
      <PhoneNumber
        countries={countries}
        name="phone1"
        label="Telephone number"
      />
      <PhoneNumber
        countries={countries}
        name="phone2"
        label="Default label"
        floatingLabel={false}
        value="+34"
      />
      <PhoneNumber
        countries={countries}
        name="phone3"
        label="Default value"
        value="+1684 155555555"
      />
      <PhoneNumber
        countries={countries}
        name="phone4"
        label="Disabled phone input"
        value="+1 55555555"
        disabled
      />
      <PhoneNumber
        countries={countries}
        name="phone5"
        label="Read only phone input"
        value="+1 111111111"
        readOnly
      />
    </Component>
  );
};
