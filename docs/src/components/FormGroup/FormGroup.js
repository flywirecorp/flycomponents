import React from 'react';
import { FormGroup, Input } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <FormGroup
      name="amount"
      label="Payment Amount"
      className="FormGroup GridColumn"
      hint="This is a hint text"
    >
      <Input type="number" name="amount" />
    </FormGroup>
    <FormGroup
      name="error"
      label="Field with error"
      className="FormGroup GridColumn"
      error="The amount is too low"
    >
      <Input type="text" name="amount" />
    </FormGroup>
  </Component>
);
