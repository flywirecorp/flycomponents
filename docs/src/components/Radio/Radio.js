import React from 'react';
import { Radio } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Radio name="rb1" id="rb01" label="Default" />
    <Radio name="rb1" id="rb02" label="Default" />
    <Radio name="rb2" label="Checked" defaultChecked />
    <Radio name="rb3" label="Disabled" disabled />
    <Radio name="rb5" label="With error" error="We have an error" />
  </Component>
);
