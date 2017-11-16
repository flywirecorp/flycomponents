import React from 'react';
import { MoneyInput } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <MoneyInput
      currencySymbol="€"
      decimalMark=","
      label="Insert amount"
      name="amount"
      required
      symbolFirst={false}
      thousandsSeparator="."
    />
    <MoneyInput disabled name="disabled" label="Disabled field" />
  </Component>
);
