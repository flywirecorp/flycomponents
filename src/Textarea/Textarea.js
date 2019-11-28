import PropTypes from 'prop-types';
import React from 'react';

const Textarea = ({ disabled, error, name, readOnly, required, ...other }) => (
  <textarea
    aria-describedby={`${name}-error ${name}-hint-msg`}
    aria-disabled={disabled}
    aria-invalid={!!error}
    aria-readonly={readOnly}
    aria-required={required}
    autoComplete="off"
    className="Textarea"
    disabled={disabled}
    id={name}
    name={name}
    readOnly={readOnly}
    required={required}
    {...other}
  />
);

const { bool, string } = PropTypes;

Textarea.defaultProps = {
  disabled: false,
  readOnly: false,
  required: false
};

Textarea.propTypes = {
  disabled: bool,
  error: string,
  name: string.isRequired,
  readOnly: bool,
  required: bool
};

export default Textarea;
