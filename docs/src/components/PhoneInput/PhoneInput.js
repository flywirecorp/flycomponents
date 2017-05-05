import React from 'react'
import { PhoneInput } from '../../../../src'
import Component from '../Component'
import README from './README.md'

export default () => {
  const countries = [
    {
      label: 'Spain (+34)',
      value: 'es',
      dialingCode: '34',
      phonePattern: '+.. ... ... ...'
    },
    {
      label: 'United States (+1)',
      value: 'us',
      dialingCode: '1',
      phonePattern: '+. (...) ...-....'
    }
  ]

  return (
    <Component readme={README}>
      <PhoneInput countries={countries} name="phone" />
    </Component>
  )
}
