import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const { className, id, name, error, label, ...otherProps } = this.props;

    return (
      <label
        htmlFor={id || name}
        className={classNames('Checkbox', className, {
          'has-error': error
        })}
      >
        <input
          name={name}
          id={id || name}
          className="Checkbox-input"
          type="checkbox"
          {...otherProps}
        />
        <span className="Checkbox-label">{label}</span>
        {error && <div className="FormGroup-feedback">{error}</div>}
      </label>
    );
  }
}

export default Checkbox;
