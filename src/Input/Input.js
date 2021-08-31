import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useTextField } from '../hooks';

const Input = ({
  ariaDescribedBy,
  className,
  disabled,
  error,
  forwardRef,
  hint,
  label,
  name,
  readOnly,
  required,
  type,
  value,
  ...other
}) => {
  const { inputAreaProps } = useTextField({
    'aria-describedby': ariaDescribedBy,
    disabled,
    error,
    hint,
    label,
    name,
    readOnly,
    required
  });

  return (
    <input
      autoComplete="off"
      className={classNames('Input', className)}
      defaultValue={value}
      disabled={disabled}
      id={name}
      name={name}
      readOnly={readOnly}
      ref={forwardRef}
      required={required}
      type={type}
      {...inputAreaProps}
      {...other}
    />
  );
};

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
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  forwardRef: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Input;
