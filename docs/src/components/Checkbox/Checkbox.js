import React from 'react';
import { Checkbox } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Checkbox name="cd1" label="Default" />
    <Checkbox name="cb2" label="Checked" defaultChecked />
    <Checkbox name="cb3" label="Disabled" disabled />
    <Checkbox name="cb4" label="Checked & Disabled" defaultChecked disabled />
    <Checkbox name="cb5" label="With error" error="We have an error" />
    <Checkbox name="cb6" label="Required" required />
  </Component>
);
