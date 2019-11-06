import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Option = ({
  id,
  isActive,
  label,
  onClick,
  template,
  value,
  ...otherProps
}) => {
  const optionProps = {
    'aria-label': label,
    'aria-selected': isActive,
    'data-label': label,
    className: classNames('Dropdown-option', { 'is-active': isActive }),
    label,
    onClick,
    role: 'option',
    tabIndex: -1,
    value,
    id: id,
    ...otherProps
  };

  return typeof template === 'function' ? (
    template({ ...optionProps })
  ) : (
    <li {...optionProps}>{label}</li>
  );
};

Option.displayName = 'Option';
Option.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  template: PropTypes.func,
  value: PropTypes.string.isRequired
};

Option.defaultProps = {
  isActive: false,
  onClick: () => {}
};

export default Option;
