import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

class Option extends Component {
  render() {
    const {
      country,
      dialingCode,
      hasFocus,
      onClick,
      onMouseEnter,
      value: isoCode,
      id,
      forwardRef
    } = this.props;

    return (
      <li
        className={classNames('Autocomplete-option', 'PhoneNumber-option', {
          'is-active': hasFocus
        })}
        onClick={() => onClick(isoCode)}
        onMouseEnter={() => onMouseEnter(isoCode)}
        value={isoCode}
        aria-label={`${country} +${dialingCode}`}
        aria-selected={hasFocus}
        role="option"
        id={id}
        ref={forwardRef}
      >
        <span className="PhoneNumber-option-country">{country}</span>
        <span className="PhoneNumber-option-dial">+{dialingCode}</span>
      </li>
    );
  }
}

Option.propTypes = {
  country: PropTypes.string.isRequired,
  dialingCode: PropTypes.string,
  forwardRef: PropTypes.object,
  hasFocus: PropTypes.bool.isRequired,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Option;
