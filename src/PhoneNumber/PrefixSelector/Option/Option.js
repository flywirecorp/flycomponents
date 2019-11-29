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
      id
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
      >
        <span className="PhoneNumber-option-country">{country}</span>
        <span className="PhoneNumber-option-dial">+{dialingCode}</span>
      </li>
    );
  }
}

const { bool, func, string } = PropTypes;

Option.propTypes = {
  country: string.isRequired,
  dialingCode: string,
  hasFocus: bool.isRequired,
  id: string,
  onClick: func.isRequired,
  onMouseEnter: func.isRequired,
  value: string.isRequired
};

export default Option;
