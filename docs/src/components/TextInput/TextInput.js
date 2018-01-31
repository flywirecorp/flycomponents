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
    <TextInput
      name="password"
      label="Password"
      hint="Password"
      type="password"
      floatingLabel={false}
    />
    <TextInput name="withprefix" prefix="@" label="With prefix" />
    <TextInput name="withsuffix" suffix=".com" label="With suffix" />
    <TextInput name="withvalue" value="Default value" label="With value" />
    <TextInput name="multiline" multiline label="Multiline" />
    <TextInput
      name="error"
      label="With error and required"
      error="Please, fill this field"
      placeholder="Placeholder"
      required
    />
    <TextInput
      name="disabled"
      label="Disabled"
      value="this is a disabled input"
      disabled
    />
    <TextInput
      name="readOnly"
      label="Read Only"
      value="this is a read only input"
      readOnly
    />
    <TextInput
      name="disabledWithPrefix"
      prefix="@"
      label="With prefix disabled input"
      disabled
    />
    <TextInput
      name="readonlyWithSuffix"
      suffix=".com"
      label="With suffix read only input"
      readOnly
    />
  </Component>
);
