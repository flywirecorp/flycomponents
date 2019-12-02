import React from 'react';
import { Datepicker } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Datepicker
      label="Pick a Date"
      name="floatingLabel"
      onChange={(name, date) => console.log(`Your ${name} is the ${date}`)}
    />
  </Component>
);
