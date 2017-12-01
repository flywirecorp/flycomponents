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
    <Datepicker label="Pick a Date" locale="ES" name="other" />
    <Datepicker
      floatingLabel={false}
      label="Pick a Date"
      locale="ES"
      name="other"
      value="04/21/1979"
    />
    <Datepicker
      floatingLabel={false}
      hint="Please select a date"
      label="Pick a Date"
      locale="ES"
      name="other"
    />
  </Component>
);
