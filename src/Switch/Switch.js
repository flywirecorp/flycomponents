import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Switch extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    name: PropTypes.string.isRequired,
    required: PropTypes.bool
  };

  render() {
    const { className, id, name, label, required, ...otherProps } = this.props;

    const idOrName = id || name;

    return (
      <label
        htmlFor={idOrName}
        className={classNames('Switch', className)}
        id={`${idOrName}-label`}
      >
        <input
          aria-labelledby={`${idOrName}-label`}
          aria-required={required}
          name={name}
          id={id || name}
          className="Switch-input"
          type="checkbox"
          required={required}
          {...otherProps}
        />
        <span className="Switch-label">{label}</span>
      </label>
    );
  }
}

export default Switch;
