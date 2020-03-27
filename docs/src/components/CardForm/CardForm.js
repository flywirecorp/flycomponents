import React from 'react';
import { CardForm } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const handleEvent = e => console.log(e);

  return (
    <Component readme={README}>
      <CardForm
        onSubmit={handleEvent}
        onCancel={handleEvent}
        onChange={handleEvent}
      />
    </Component>
  );
};
