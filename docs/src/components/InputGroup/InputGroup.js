import React from 'react';
import { InputGroup } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <div className="marginBottom-xl">
      <InputGroup
        placeholder="Enter amount"
        name="input"
        suffix="€"
        type="number"
      />
    </div>

    <div className="marginBottom-xl">
      <InputGroup
        name="input"
        prefix="Tel"
        type="tel"
        value="+1 800 346 9252"
      />
    </div>

    <div className="marginBottom-xl">
      <InputGroup
        name="input"
        prefix="http://"
        suffix=".com"
        value="flywire"
        disabled
      />
    </div>
  </Component>
);
