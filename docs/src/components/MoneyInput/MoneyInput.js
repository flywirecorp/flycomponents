import React from 'react';
import { MoneyInput } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <MoneyInput
      currencySymbol="€"
      decimalMark=","
      name="amount"
      symbolFirst={false}
      thousandsSeparator="."
    />
    <br />
    <MoneyInput disabled name="disabled" />
  </Component>
);
