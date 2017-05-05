import React from 'react'
import { TextInput } from '../../../../src'
import Component from '../Component'
import README from './README.md'

export default () => (
  <Component readme={README}>
    <TextInput name="twitter" prefix="@" />
  </Component>
)
