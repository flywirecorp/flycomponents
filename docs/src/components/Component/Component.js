import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import './component.css';

const Component = ({ children, readme }) => (
  <section className="Component">
    <div className="Component-readme">
      {readme && <Markdown source={readme} />}
    </div>
    <div className="Component-example">
      <h4 className="Component-exampleTitle">Example</h4>
      {children}
    </div>
  </section>
);

const { node, string } = PropTypes;

Component.propTypes = {
  children: node.isRequired,
  readme: string
};

export default Component;
