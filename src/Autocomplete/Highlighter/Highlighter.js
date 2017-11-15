import PropTypes from 'prop-types';
import React from 'react';
import { createMarkup, escape } from '../utils';

const Highlighter = ({ text, subString }) => {
  if (!subString) {
    return <span>{text}</span>;
  }
  const escapedSubString = escape(subString);
  const highlightedText = text.replace(
    new RegExp(escapedSubString, 'gi'),
    match => `<span class='is-highlighted'>${match}</span>`
  );

  return <span dangerouslySetInnerHTML={createMarkup(highlightedText)} />;
};

const { string } = PropTypes;

Highlighter.propTypes = {
  subString: string,
  text: string
};

export default Highlighter;
