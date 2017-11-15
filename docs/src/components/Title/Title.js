import React from 'react';
import packageJson from '../../../../package.json';

const Title = () => (
  <h3 className="Docs-navTitle">
    {packageJson.name}
    <span className="Docs-navVersion">{packageJson.version}</span>
  </h3>
);

export default Title;
