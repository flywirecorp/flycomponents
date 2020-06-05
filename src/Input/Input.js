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

Input.displayName = 'Input';
Input.defaultProps = {
  ariaDescribedBy: '',
  disabled: false,
  readOnly: false,
  required: false,
  type: 'text'
};

Input.propTypes = {
  ariaDescribedBy: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  forwardRef: PropTypes.object,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string
};

export default Input;
