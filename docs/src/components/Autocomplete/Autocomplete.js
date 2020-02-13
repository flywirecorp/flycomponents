import React from 'react';
import { Autocomplete } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const countries = {
    1: [
      { label: 'Andorra', value: 'AN' },
      { label: 'China', value: 'CN' },
      { label: 'Cuba', value: 'CUB' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DEU' },
      { label: 'Greece', value: 'GR' }
    ],

    2: [
      { label: 'Italy', value: 'IT' },
      { label: 'Japan', value: 'JP' },
      { label: 'Korea', value: 'KO' },
      { label: 'Morocco', value: 'MOR' },
      { label: 'Spain', value: 'ES' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'United States', value: 'US' }
    ]
  };

  const [index, setIndex] = React.useState(1);
  const [defaultValue, setDefaultValue] = React.useState('GR');

  return (
    <Component readme={README}>
      <Autocomplete
        label="Disabled autocomplete"
        name="country"
        options={countries[index]}
        placeholder="Select a country"
        value={defaultValue}
      />

      <button onClick={() => setIndex(index === 1 ? 2 : 1)}>
        Change countries
      </button>
      <button onClick={() => setIndex(index)}>Same countries</button>
      <button
        onClick={() => {
          const arr = countries[index].map(c => c.value);
          const newDefault = arr[Math.floor(Math.random() * arr.length)];
          console.log('newDefault', newDefault);
          setDefaultValue(newDefault);
        }}
      >
        Chande default
      </button>
      <button onClick={() => setDefaultValue(defaultValue)}>Same value</button>
    </Component>
  );
};
