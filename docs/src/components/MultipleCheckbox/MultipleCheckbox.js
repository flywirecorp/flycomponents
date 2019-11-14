import React from 'react';
import { MultipleCheckbox } from '../../../../src';
import Component from '../Component';
import README from './README.md';

const IS_REQUIRED = 'Please select at least one!';
const NO_ERROR = null;

export default class MultipleCheckboxExample extends React.Component {
  state = {
    checked: [],
    error: IS_REQUIRED
  };

  get countries() {
    return [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
  }

  render() {
    return (
      <Component readme={README}>
        <MultipleCheckbox
          checked={['ES']}
          disabled
          label="Countries you visited"
          name="countries-1"
          options={this.countries}
        />

        <MultipleCheckbox
          label="Countries you visited"
          name="countries-2"
          onChange={({ checked }) => this.setState({ checked })}
          options={this.countries}
          required
        />

        <p>You visited: {this.state.checked.join('-')}</p>

        <MultipleCheckbox
          error={this.state.error}
          label="Countries you visited"
          name="countries-3"
          onChange={({ checked }) =>
            this.setState({
              error: checked.length === 0 ? IS_REQUIRED : NO_ERROR
            })
          }
          options={this.countries}
          required
        />
      </Component>
    );
  }
}
