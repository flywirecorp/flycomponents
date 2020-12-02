import React from 'react';
import { CardForm } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  return (
    <Component readme={README}>
      <CardForm
        onValidate={e => console.log('onValidate')}
        onSubmit={e => console.log('onSubmit')}
        onCancel={e => console.log('onCancel')}
        onChange={e => console.log('onChange')}
      />
    </Component>
  );
};
