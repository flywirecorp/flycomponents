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
    <p className="textAlign-right margin-md">With label</p>
    <Dropdown
      className="textAlign-right marginBottom-xl"
      defaultValue="spanish"
      options={options}
      label="Select your preferred locale"
      template={template}
    />
    <p className="textAlign-right margin-md">Without label</p>
    <Dropdown
      className="textAlign-right marginBottom-xl"
      defaultValue="spanish"
      options={options}
      template={template}
    />
    <p className="textAlign-right margin-md">
      Including the selected option on the list
    </p>
    <Dropdown
      includeSelectedOption
      className="textAlign-right marginBottom-xl"
      defaultValue="spanish"
      options={options}
      template={template}
    />
  </Component>
);
