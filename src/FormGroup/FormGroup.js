import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Label from '../Label';

const FormGroup = ({
  children,
  className,
  error,
  floatingLabel,
  hasSymbol,
  hasValue,
  hint,
  isFocused,
  label,
  name,
  required
}) => (
  <div
    className={classNames('FormGroup', className, {
      'has-error': error,
      'FormGroup--floatingLabel': floatingLabel,
      'has-value': hasValue,
      'is-focused': isFocused,
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
  error: string,
  floatingLabel: bool,
  hasSymbol: bool,
  hasValue: bool,
  hint: string,
  isFocused: bool,
  label: string,
  name: string.isRequired,
  required: bool
};

FormGroup.defaultProps = {
  floatingLabel: true,
  hasSymbol: false,
  hasValue: false,
  isFocused: false,
  required: false
};

export default FormGroup;
