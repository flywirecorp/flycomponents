import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, isActive, onSelect }) => {
  if (typeof children === 'function') {
    return children({ onSelect, isActive });
  }

  return <div className="Content">{children}</div>;
};

Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isActive: PropTypes.bool,
  onSelect: PropTypes.func
};

export default Content;
