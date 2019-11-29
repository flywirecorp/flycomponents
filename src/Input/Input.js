import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  disabled,
  error,
  name,
  readOnly,
  required,
  type,
  value,
  ...other
}) => (
  <input
    aria-describedby={`${name}-error-msg ${name}-hint-msg`}
    aria-disabled={disabled}
    aria-invalid={!!error}
    aria-labelledby={`${name}-label`}
    aria-readonly={readOnly}
    aria-required={required}
    autoComplete="off"
    className="Input"
    defaultValue={value}
    disabled={disabled}
    id={name}
    name={name}
    readOnly={readOnly}
    required={required}
    type={type}
    {...other}
  />
);

const { bool, string } = PropTypes;

Input.defaultProps = {
  disabled: false,
  readOnly: false,
  required: false,
  type: 'text'
};

Input.propTypes = {
  disabled: bool,
  error: string,
  name: string.isRequired,
  readOnly: bool,
  required: bool,
  type: string,
  value: string
};

export default Input;
