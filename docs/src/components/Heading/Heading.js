import React from 'react';
import Component from '../Component';
import README from './README.md';
import { Heading } from '../../../../src';

export default () => {
  return (
    <Component readme={README}>
      <Heading as="h1" size="large">
        Title
      </Heading>
    </Component>
  );
};
