import React from 'react';
import { Datepicker } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Datepicker
      label="Date of Birth"
      locale="ES"
      name="birthday"
      onChange={(name, date) => alert(`Your ${name} is the ${date}`)}
      required
      value="04/21/1979"
    />
  </Component>
);
