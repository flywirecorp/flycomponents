import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  name,
  required,
  type,
  ...other
}) => (
  <input
    autoComplete='off'
    className='Input'
    id={name}
    name={name}
    required={required}
    type={type}
    {...other}
  />
)

const { bool, string } = PropTypes

Input.propTypes = {
  name: string.isRequired,
  required: bool,
  type: string.isRequired
}

export default Input
