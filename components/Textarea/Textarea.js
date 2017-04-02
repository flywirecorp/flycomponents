import React, { PropTypes } from 'react'
import './Textarea.scss'

const Textarea = ({
  name,
  required,
  ...other
}) => (
  <textarea
    autoComplete='off'
    className='Textarea'
    id={name}
    name={name}
    required={required}
    {...other}
  />
)

const { bool, string } = PropTypes

Textarea.propTypes = {
  name: string.isRequired,
  required: bool
}

export default Textarea
