import PropTypes from 'prop-types'
import React from 'react'

const Label = ({ htmlFor, required, value, ...other }) =>
  <label className="Label" {...other} htmlFor={htmlFor}>
    {value}
    {required ? <span> (*)</span> : null}
  </label>

const { bool, string } = PropTypes

Label.propTypes = {
  htmlFor: string.isRequired,
  required: bool,
  value: string.isRequired
}

export default Label
