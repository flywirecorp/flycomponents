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
  hasPrefix,
  hasSuffix,
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
      'FormGroup--hasPrefix': hasPrefix,
      'FormGroup--hasSuffix': hasSuffix
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
  hasPrefix: bool,
  hasSuffix: bool,
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
  hasPrefix: false,
  hasSuffix: false,
  hasValue: false,
  isFocused: false,
  readOnly: false,
  required: false
};

export default FormGroup;
