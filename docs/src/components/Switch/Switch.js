import React from 'react';
import { Switch } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Switch name="cd1" label="Default" />
    <Switch name="cb2" label="Checked" defaultChecked />
    <Switch name="cb3" label="Disabled" disabled />
    <Switch name="cb4" label="Checked & Disabled" defaultChecked disabled />
  </Component>
);
