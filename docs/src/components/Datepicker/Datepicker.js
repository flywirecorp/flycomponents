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
    <Datepicker label="Pick a Date" locale="ES" name="floatingLabel" />
    <Datepicker
      floatingLabel={false}
      label="Pick a Date"
      locale="ES"
      name="other"
      value="04/21/1979"
    />
    <Datepicker
      label="Disabled Date Picker"
      locale="ES"
      name="disabled"
      required
      value="04/21/1979"
      disabled
    />
    <Datepicker
      label="Read Only Date Picker"
      locale="ES"
      name="readOnly"
      required
      value="04/21/1979"
      readOnly
    />
  </Component>
);
