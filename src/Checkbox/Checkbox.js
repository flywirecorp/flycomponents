import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from '../utils/isEmpty';
import { useInputField } from '../hooks';

class Checkbox extends Component {
  render() {
    const {
      className,
      id,
      name,
      error,
      label,
      required,
      disabled,
      ...otherProps
    } = this.props;

    const idOrName = id || name;
    const { inputAriaProps } = useInputField({
      disabled,
      error: !isEmpty(error),
      label: idOrName,
      name: idOrName,
      readOnly: disabled,
      required
    });

    return (
      <label
        htmlFor={idOrName}
        className={classNames('Checkbox', className, {
          'has-error': error
        })}
      >
        <input
          className="Checkbox-input"
          disabled={disabled}
          id={idOrName}
          name={name}
          required={required}
          type="checkbox"
          {...inputAriaProps}
          {...otherProps}
        />
        <span className="Checkbox-label" id={`${idOrName}-label`}>
          {label}
        </span>
        {error && typeof error === 'string' && (
          <div className="FormGroup-feedback" id={`${idOrName}-error-msg`}>
            {error}
          </div>
        )}
      </label>
    );
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export default Checkbox;
