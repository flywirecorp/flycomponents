import React from 'react';
import { Datepicker } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Datepicker
      locale="ES"
      name="birthday"
      onBlur={() => {}}
      onChange={(name, date) => alert(`Your ${name} is the ${date}`)}
      value="04/21/1979"
    />
  </Component>
);
