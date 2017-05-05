import React from 'react'
import { Autocomplete } from '../../../../src'
import Component from '../Component'
import README from './README.md'

export default () => {
  const countries = [
    { label: 'Spain', value: 'ES' },
    { label: 'United States', value: 'US' },
    { label: 'China', value: 'CN' }
  ]

  return (
    <Component readme={README}>
      <Autocomplete name="country" options={countries} />
    </Component>
  )
}
