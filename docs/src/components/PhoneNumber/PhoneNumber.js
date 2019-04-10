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
      label: 'Åland Islands',
      value: 'ax',
      dialingCode: '358'
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
        name="phone"
        label="Telephone number"
      />
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Default label"
        floatingLabel={false}
        prefix="34"
      />
      <PhoneNumber
        countries={countries}
        name="phone2"
        label="Default value"
        prefix="34"
        value="155555555"
      />
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Disabled phone input"
        prefix="34"
        value="155555555"
        disabled
      />
      <PhoneNumber
        countries={countries}
        name="phone"
        label="Read only phone input"
        prefix="1"
        value="111111111"
        readOnly
      />
    </Component>
  );
};
