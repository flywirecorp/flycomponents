import React from 'react';
import { Alert } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <Alert type="danger">
      <strong>Oh snap!</strong> Change a few things up and try submitting again.
    </Alert>

    <Alert type="success">
      <strong>Well done!</strong> You successfully read this important alert
      message.
    </Alert>

    <Alert type="warning">
      <strong>Warning!</strong> Better check yourself, you're not looking too
      good.
    </Alert>

    <Alert type="info">
      <strong>Heads up!</strong> This alert needs your attention, but it's not
      super important.
    </Alert>
  </Component>
);
