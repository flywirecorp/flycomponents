import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ children, isActive, isDisabled, onSelect, onClick }) => {
  const handleClick = e => {
    if (isDisabled) e.preventDefault();

    onSelect(e);
    onClick(e);
  };

  return (
    <a
      href="#"
      className={
        isDisabled
          ? 'Tab-link is-disabled'
          : isActive
          ? 'Tab-link is-active'
          : 'Tab-link'
      }
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

Tab.defaultProps = {
  children: null,
  isActive: false,
  isDisabled: false,
  onSelect: () => {},
  onClick: () => {}
};

Tab.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func
};

export default Tab;
