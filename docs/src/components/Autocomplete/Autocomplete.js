import React from 'react'
import { Autocomplete, FormGroup } from '../../../../src'
import Component from '../Component'
import README from './README.md'

export default () => {
  const countries = [
    { label: 'Spain', value: 'ES' },
    { label: 'United States', value: 'US' },
    { label: 'China', value: 'CN' },
    { label: 'France', value: 'FR' },
    { label: 'Italy', value: 'IT' },
    { label: 'Germany', value: 'DEU' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Andorra', value: 'AN' },
    { label: 'Greece', value: 'GR' },
    { label: 'Morocco', value: 'MOR' },
    { label: 'Cuba', value: 'CUB' },
    { label: 'Korea', value: 'KO' },
    { label: 'Japan', value: 'JP' }
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
