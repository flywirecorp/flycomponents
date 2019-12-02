import PropTypes from 'prop-types';
import React from 'react';
import { getAriaDescribedBy } from '../utils/aria';

const Input = ({
  disabled,
  error,
  name,
  readOnly,
  required,
  type,
  value,
  ariaDescribedBy,
  forwardRef,
  ...other
}) => (
  <input
    aria-describedby={getAriaDescribedBy(name, ariaDescribedBy)}
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
    ref={forwardRef}
    required={required}
    type={type}
    {...other}
  />
);

const { bool, string, object, oneOfType } = PropTypes;

Input.defaultProps = {
  ariaDescribedBy: '',
  disabled: false,
  readOnly: false,
  required: false,
  type: 'text'
};

Input.propTypes = {
  ariaDescribedBy: string,
  disabled: bool,
  error: oneOfType([string, bool]),
  forwardRef: object,
  name: string.isRequired,
  readOnly: bool,
  required: bool,
  type: string,
  value: string
};

export default Input;
