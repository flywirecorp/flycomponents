import React from 'react';
import { SignaturePad } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <SignaturePad />
  </Component>
);
