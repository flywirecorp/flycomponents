import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from '../utils/isEmpty';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    name: PropTypes.string.isRequired,
    required: PropTypes.bool
  };

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

    return (
      <label
        htmlFor={idOrName}
        className={classNames('Checkbox', className, {
          'has-error': error
        })}
      >
        <input
          aria-describedby={`${idOrName}-error-msg`}
          aria-disabled={disabled}
          aria-invalid={!isEmpty(error)}
          aria-labelledby={`${idOrName}-label`}
          aria-readonly={disabled}
          aria-required={required}
          className="Checkbox-input"
          disabled={disabled}
          id={idOrName}
          name={name}
          required={required}
          type="checkbox"
          {...otherProps}
        />
        <span className="Checkbox-label" id={`${idOrName}-label`}>
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

export default Checkbox;
