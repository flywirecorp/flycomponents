import React from 'react';
import { Dropdown } from '../../../../src';
import Component from '../Component';
import README from './README.md';

const options = [
  { label: 'Spanish', value: 'spanish' },
  { label: 'English', value: 'english' },
  { label: 'French', value: 'french' }
];

export default () => (
  <Component readme={README}>
    <Dropdown
      className="textAlign-right"
      defaultValue="spanish"
      options={options}
      label="Select your preferred locale"
    />
  </Component>
);
