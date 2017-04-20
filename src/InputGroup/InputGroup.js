import PropTypes from 'prop-types';
import React from 'react';
import Input from '../Input'

const InputGroup = ({
  name,
  prefix,
  required,
  sufix,
  type,
  ...other
}) => (
  <div className='InputGroup'>
    { prefix ? <span className='InputGroup-context'>{prefix}</span> : null }
    <Input
      autoComplete='off'
      className='Input InputGroup-input'
      type={type}
      name={name}
      id={name}
      {...other}
    />
    { sufix ? <span className='InputGroup-context'>{sufix}</span> : null }
  </div>
)

const { bool, oneOfType, node, string } = PropTypes

InputGroup.propTypes = {
  name: string.isRequired,
  prefix: oneOfType([string, node]),
  required: bool,
  sufix: oneOfType([string, node]),
  type: string.isRequired
}

export default InputGroup
