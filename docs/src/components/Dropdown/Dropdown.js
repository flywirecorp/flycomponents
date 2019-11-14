import React from 'react';
import { Dropdown } from '../../../../src';
import Component from '../Component';
import README from './README.md';

const options = [
  { label: 'Spanish', value: 'spanish', lang: 'es' },
  { label: 'English', value: 'english', lang: 'en' },
  { label: 'French', value: 'french', lang: 'fr' },
  { label: '\ud55c\uad6d\uc5b4', value: 'ko', lang: 'ko' }
];

// eslint-disable-next-line
const template = ({ label, lang, ...restProps }) => {
  return (
    <li {...restProps} lang={lang}>
      {label}
    </li>
  );
};

export default () => (
  <Component readme={README}>
    <Dropdown
      className="textAlign-right"
      defaultValue="spanish"
      options={options}
      label="Select your preferred locale"
      template={template}
    />
  </Component>
);
