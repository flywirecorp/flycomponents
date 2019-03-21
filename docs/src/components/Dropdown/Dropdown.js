import React from 'react';
import { Dropdown } from '../../../../src';
import Component from '../Component';
import README from './README.md';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
];

export default () => (
  <Component readme={README}>
    <Dropdown
      className="textAlign-right"
      defaultValue="option1"
      options={options}
    />
  </Component>
);
