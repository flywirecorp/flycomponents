import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ name, required, type, value, ...other }) => (
  <input
    autoComplete="off"
    className="Input"
    id={name}
    name={name}
    required={required}
    type={type}
    defaultValue={value}
    {...other}
  />
);

const { bool, string } = PropTypes;

Input.defaultProps = {
  required: false,
  type: 'text'
};

Input.propTypes = {
  name: string.isRequired,
  required: bool,
  type: string,
  value: string
};

export default Input;
