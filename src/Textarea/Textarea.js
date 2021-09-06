import PropTypes from 'prop-types';
import React from 'react';
import { useTextField } from '../hooks';

const Textarea = ({
  disabled,
  error,
  forwardRef,
  hint,
  label,
  name,
  readOnly,
  required,
  value,
  ...other
}) => {
  const { inputAreaProps } = useTextField({
    disabled,
    error,
    hint,
    label,
    name,
    readOnly,
    required
  });

  return (
    <textarea
      autoComplete="off"
      className="Textarea"
      disabled={disabled}
      id={name}
      name={name}
      readOnly={readOnly}
      ref={forwardRef}
      required={required}
      defaultValue={value}
      {...inputAreaProps}
      {...other}
    />
  );
};

Textarea.displayName = 'Textarea';
Textarea.defaultProps = {
  disabled: false,
  readOnly: false,
  required: false,
  value: ''
};

Textarea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  forwardRef: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string
};

export default Textarea;
