import React from 'react';
import { FileInput } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <FileInput
      placeholder="Choose a file"
      submit="Upload file"
      hint="This is the hint content"
    />
    <FileInput placeholder="Choose multiple files" multiple />
    <FileInput uploading />
  </Component>
);
