import React from 'react'
import { Autocomplete, FormGroup } from '../../../../src'
import Component from '../Component'
import README from './README.md'

export default () => {
  const countries = [
    { label: 'Andorra', value: 'AN' },
    { label: 'China', value: 'CN' },
    { label: 'Cuba', value: 'CUB' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DEU' },
    { label: 'Greece', value: 'GR' },
    { label: 'Italy', value: 'IT' },
    { label: 'Japan', value: 'JP' },
    { label: 'Korea', value: 'KO' },
    { label: 'Morocco', value: 'MOR' },
    { label: 'Spain', value: 'ES' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United States', value: 'US' }
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
          minOptionsForSearch={25}
        />
      </FormGroup>
    </Component>
  )
}
