import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Label from '../Label';

const FormGroup = ({
  children,
  className,
  error,
  hint,
  label,
  name,
  required
}) => (
  <div className={classNames(className || 'FormGroup', { 'has-error': error })}>
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
  hint: string,
  label: string,
  name: string.isRequired,
  required: bool
};

FormGroup.defaultProps = {
  required: false
};

export default FormGroup;
