import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SIZE = 'huge';
const DEFAULT_TAG = 'h1';
const SUPPORTED_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const Heading = ({ children, as, size, className, ...props }) => {
  const Element = as;
  if (!SUPPORTED_TAGS.includes(Element)) {
    throw new Error('Unsupported type');
  }

  const joinedClassNames = joinClassNames(size, className);

  return (
    <Element className={joinedClassNames} {...props}>
      {children}
    </Element>
  );
};

const joinClassNames = (size, className) => {
  let headingClasses = `Heading Heading--${size}`;

  if (className) {
    headingClasses += ` ${className}`;
  }

  return headingClasses;
};

Heading.defaultProps = {
  as: DEFAULT_TAG,
  size: DEFAULT_SIZE
};

Heading.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string
};

export default Heading;
