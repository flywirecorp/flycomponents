import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SIZE = 'huge';
const DEFAULT_TAG = 'h1';
const SUPPORTED_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const Heading = ({ text, as, size }) => {
  const Element = as;
  if (!SUPPORTED_TAGS.includes(Element)) {
    throw new Error('Unsupported type');
  }

  const headingClasses = `Heading Heading--${size}`;
  return <Element className={headingClasses}>{text}</Element>;
};

Heading.defaultProps = {
  as: DEFAULT_TAG,
  size: DEFAULT_SIZE
};

Heading.propTypes = {
  as: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string
};

export default Heading;
