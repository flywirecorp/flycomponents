import React from 'react';
import { CardForm } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <CardForm />
  </Component>
);
