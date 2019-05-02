import React from 'react';
import { Button } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Button
      className="Button Button--primary"
      onClick={() => alert('You clicked me!')}
      children="Click Me!"
    />

    <Button onClick={() => alert('You clicked me!')} children="Click Me!" />
  </Component>
);
