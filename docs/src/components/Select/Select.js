import React from 'react';
import { Select } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const values = [
    { label: 'Spain', value: 'ES' },
    { label: 'United States', value: 'US' },
    { label: 'China', value: 'CN' }
  ];

  return (
    <Component readme={README}>
      <Select name="country_1" selectedValue="US" values={values} />
      <Select
        className="myClass"
        disabled
        name="country_2"
        selectedValue="CN"
        values={values}
      />
    </Component>
  );
};
