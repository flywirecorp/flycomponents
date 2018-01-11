import React from 'react';
import { FormGroup, Input } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <FormGroup
      className="FormGroup GridColumn"
      floatingLabel={false}
      hint="This is a hint text"
      label="Payment Amount"
      name="amount"
    >
      <Input type="number" name="amount" />
    </FormGroup>

    <FormGroup
      className="FormGroup GridColumn"
      error="The amount is too low"
      floatingLabel={false}
      label="Field with error"
      name="error"
    >
      <Input type="text" name="amount" />
    </FormGroup>

    <FormGroup
      name="amount"
      floatingLabel={false}
      label="Disabled field"
      className="FormGroup GridColumn is-disabled"
    >
      <Input type="text" name="amount" value="Disabled" disabled />
    </FormGroup>

    <FormGroup
      name="amount"
      floatingLabel={false}
      label="Read Only field"
      className="FormGroup GridColumn is-readOnly"
    >
      <Input type="text" name="amount" value="Read Only" readOnly />
    </FormGroup>
  </Component>
);
