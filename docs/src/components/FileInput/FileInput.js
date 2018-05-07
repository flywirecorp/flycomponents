import React from 'react';
import { FileInput } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => (
  <Component readme={README}>
    <FileInput
      accepts=".png, .jpg"
      buttonText="Upload a file"
      hint="This is the hint content"
    />
    <FileInput buttonText="Upload multiple files" multiple />
    <FileInput uploading />
  </Component>
);
