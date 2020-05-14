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
  required,
  forwardRef
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
    ref={forwardRef}
  >
    {label && (
      <Label
        htmlFor={name}
        id={`${name}-label`}
        required={required}
        value={label}
      />
    )}
    {children}
    {error && (
      <p className="FormGroup-feedback" id={`${name}-error-msg`} role="alert">
        {typeof error === 'string' ? error : null}
      </p>
    )}
    {hint && (
      <p className="FormGroup-hint" id={`${name}-hint-msg`}>
        {hint}
      </p>
    )}
  </div>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  floatingLabel: PropTypes.bool,
  forwardRef: PropTypes.object,
  hasPrefix: PropTypes.bool,
  hasSuffix: PropTypes.bool,
  hasValue: PropTypes.bool,
  hint: PropTypes.string,
  isFocused: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
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
