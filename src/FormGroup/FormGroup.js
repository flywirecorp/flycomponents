import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Label from '../Label';

const FormGroup = ({
  children,
  className,
  disabled,
  error,
  floatingLabel,
  hasSymbol,
  hasValue,
  hint,
  isFocused,
  label,
  name,
  readOnly,
  required
}) => (
  <div
    className={classNames('FormGroup', className, {
      'has-error': error,
      'FormGroup--floatingLabel': floatingLabel,
      'has-value': hasValue,
      'is-disabled': disabled,
      'is-focused': isFocused,
      'is-readOnly': readOnly,
      'FormGroup--symbolFirst': hasSymbol
    })}
  >
    {label && <Label htmlFor={name} required={required} value={label} />}
    {children}
    {error && <p className="FormGroup-feedback">{error}</p>}
    {hint && <p className="FormGroup-hint">{hint}</p>}
  </div>
);

const { bool, node, string } = PropTypes;

FormGroup.propTypes = {
  children: node.isRequired,
  className: string,
  disabled: bool,
  error: string,
  floatingLabel: bool,
  hasSymbol: bool,
  hasValue: bool,
  hint: string,
  isFocused: bool,
  label: string,
  name: string.isRequired,
  readOnly: bool,
  required: bool
};

FormGroup.defaultProps = {
  disabled: false,
  floatingLabel: true,
  hasSymbol: false,
  hasValue: false,
  isFocused: false,
  readOnly: false,
  required: false
};

export default FormGroup;
