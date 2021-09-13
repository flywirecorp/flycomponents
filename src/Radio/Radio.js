import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useInputField } from '../hooks';

class Radio extends Component {
  render() {
    const {
      className,
      disabled,
      error,
      id,
      label,
      name,
      readOnly,
      required,
      ...otherProps
    } = this.props;

    const idOrName = id || name;
    const { inputAriaProps } = useInputField({
      disabled,
      error,
      label: idOrName,
      name: idOrName,
      readOnly,
      required
    });

    return (
      <label
        htmlFor={idOrName}
        id={`${idOrName}-label`}
        className={classNames('Radio', className, {
          'has-error': error
        })}
      >
        <input
          className="Radio-input"
          disabled={disabled}
          id={idOrName}
          name={name}
          readOnly={readOnly}
          required={required}
          type="Radio"
          {...inputAriaProps}
          {...otherProps}
        />
        <span className="Radio-label" id={`${idOrName}-label`}>
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

Radio.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
};

export default Radio;
