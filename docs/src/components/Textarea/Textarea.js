import React from 'react';
import { Textarea } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Textarea name="about" />
  </Component>
);
