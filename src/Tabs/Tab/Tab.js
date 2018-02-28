import React from 'react';
import PropTypes from 'prop-types';

const preventDefault = event => event.preventDefault();

const Tab = ({ children, isActive, isDisabled, onSelect }) => (
  <a
    href="#"
    className={
      isDisabled
        ? 'Tab-link is-disabled'
        : isActive ? 'Tab-link is-active' : 'Tab-link'
    }
    onClick={isDisabled ? preventDefault : onSelect}
  >
    {children}
  </a>
);

Tab.defaultProps = {
  children: null,
  isActive: false,
  isDisabled: false,
  onSelect: () => {}
};

Tab.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onSelect: PropTypes.func
};

export default Tab;
