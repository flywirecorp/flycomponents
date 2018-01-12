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
      hint="Please insert an amount"
    />
    <MoneyInput name="default" floatingLabel={false} label="Default label" />
    <MoneyInput name="disabled" label="Disabled field" disabled />
    <MoneyInput name="readOnly" label="Read only field" readOnly />
  </Component>
);
