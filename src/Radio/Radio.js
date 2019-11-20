import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Radio extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    name: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
  };

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

    return (
      <label
        htmlFor={idOrName}
        id={`${idOrName}-label`}
        className={classNames('Radio', className, {
          'has-error': error
        })}
      >
        <input
          aria-describedby={`${idOrName}-error-msg`}
          aria-disabled={disabled}
          aria-invalid={!!error}
          aria-labelledby={`${idOrName}-label`}
          aria-readonly={readOnly}
          aria-required={required}
          className="Radio-input"
          disabled={disabled}
          id={idOrName}
          name={name}
          readOnly={readOnly}
          required={required}
          type="Radio"
          {...otherProps}
        />
        <span className="Radio-label" id={`${idOrName}-label`}>
          {label}
        </span>
        {error && (
          <div
            className="FormGroup-feedback"
            id={`${idOrName}-error-msg`}
            role="alert"
          >
            {error}
          </div>
        )}
      </label>
    );
  }
}

export default Radio;
