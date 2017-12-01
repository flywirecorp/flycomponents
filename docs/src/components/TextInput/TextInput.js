import React from 'react';
import { TextInput } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <TextInput name="floating" label="Default" hint="Help text" />
    <TextInput
      name="default"
      label="Default"
      hint="Help text"
      floatingLabel={false}
    />
    <TextInput name="withprefix" prefix="@" label="With prefix" />
    <TextInput name="withsufix" sufix=".com" label="With sufix" />
    <TextInput name="withvalue" value="Default value" label="With value" />
    <TextInput name="multiline" multiline label="Multiline" />
    <TextInput
      name="error"
      label="With error and required"
      error="Please, fill this field"
      placeholder="Placeholder"
      required
    />
  </Component>
);
