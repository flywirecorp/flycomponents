import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ className, forwardRef, selectedValue, values, ...other }) => {
  const options = values.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  const classToAdd = className ? `Select ${className}` : 'Select';

  return (
    <select
      className={classToAdd}
      ref={forwardRef}
      value={selectedValue}
      {...other}
    >
      {options}
    </select>
  );
};

Select.displayName = 'Select';
Select.propTypes = {
  className: PropTypes.string,
  forwardRef: PropTypes.object,
  selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  values: PropTypes.array.isRequired
};

export default Select;
