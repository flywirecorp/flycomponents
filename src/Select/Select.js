import PropTypes from 'prop-types'
import React from 'react'

const Select = ({ className, selectedValue, onChange, onClick, values }) => {
  const options = values.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <select
      className={`Select ${className}`}
      value={selectedValue}
      onChange={onChange}
      onClick={onClick}
    >
      {options}
    </select>
  )
}

const { array, func, number, oneOfType, string } = PropTypes

Select.propTypes = {
  className: string,
  onChange: func.isRequired,
  onClick: func.isRequired,
  selectedValue: oneOfType([number, string]),
  values: array.isRequired
}

export default Select
