import React from 'react';
import { Autocomplete } from '../../../../src';
import Component from '../Component';
import README from './README.md';

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
  ];

  const countryTemplate = country => (
    <div>
      <img src="http://via.placeholder.com/30x30" /> {country.label}
    </div>
  );

  const getA11yStatusMessage = ({ isOpen, options, selectedOption }) => {
    const optionsClosed = !isOpen;
    const { label } = selectedOption;

    if (optionsClosed) {
      return label ? `You have selected ${label}` : '';
    }

    const resultCount = options.length;

    if (resultCount === 0) {
      return 'No results are available';
    }

    return `${resultCount} ${
      resultCount === 1 ? 'result is' : 'results are'
    } available, use up and down arrow keys to navigate. Press Enter key to select.`;
  };

  return (
    <Component readme={README}>
      <Autocomplete
        label="Search enabled"
        name="search"
        options={countries}
        placeholder="Select a country"
        required
        template={countryTemplate}
        getA11yStatusMessage={getA11yStatusMessage}
      />
      <Autocomplete
        floatingLabel={false}
        label="Default label"
        name="default"
        options={countries}
        placeholder="Select a country"
        required
        template={countryTemplate}
      />
      <Autocomplete
        hint="You can't search here, It's like a dropdown"
        label="Search disabled"
        minOptionsForSearch={25}
        name="disabled"
        options={countries}
        placeholder="Select a country"
      />
      <Autocomplete
        error="This field is required"
        label="Autocomplete with error"
        name="error"
        options={countries}
        placeholder="Select a country"
      />
      <Autocomplete
        label="Disabled autocomplete"
        name="country"
        options={countries}
        placeholder="Select a country"
        value="ES"
        disabled
      />
      <Autocomplete
        label="Read only autocomplete"
        name="country"
        options={countries}
        placeholder="Select a country"
        value="US"
        readOnly
      />
    </Component>
  );
};
