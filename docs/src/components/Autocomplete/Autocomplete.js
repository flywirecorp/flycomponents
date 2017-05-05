import React from 'react'
import { Autocomplete, FormGroup } from '../../../../src'
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
      <FormGroup
        name="country"
        label="Search enabled"
        className="FormGroup GridColumn"
      >
        <Autocomplete name="country" options={countries} />
      </FormGroup>
      <FormGroup
        name="country"
        label="Search disabled"
        className="FormGroup GridColumn"
      >
        <Autocomplete
          name="country"
          options={countries}
          minOptionsForSearch={10}
        />
      </FormGroup>
    </Component>
  )
}
