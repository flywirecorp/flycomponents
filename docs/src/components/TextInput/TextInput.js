import React from 'react'
import { TextInput, FormGroup } from '../../../../src'
import Component from '../Component'
import README from './README.md'

export default () => (
  <Component readme={README}>
    <FormGroup name="default" label="Default" className="FormGroup GridColumn">
      <TextInput name="default" />
    </FormGroup>
    <FormGroup
      name="withprefix"
      label="With prefix"
      className="FormGroup GridColumn"
    >
      <TextInput name="withprefix" prefix="@" />
    </FormGroup>
    <FormGroup
      name="withsufix"
      label="With sufix"
      className="FormGroup GridColumn"
    >
      <TextInput name="withsufix" sufix=".com" />
    </FormGroup>
    <FormGroup
      name="withvalue"
      label="With value"
      className="FormGroup GridColumn"
    >
      <TextInput name="withvalue" value="Preset value" />
    </FormGroup>
    <FormGroup
      name="multiline"
      label="Multiline"
      className="FormGroup GridColumn"
    >
      <TextInput name="multiline" multiline />
    </FormGroup>
  </Component>
)
