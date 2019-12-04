import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  ariaRequired,
  className,
  name,
  disabled,
  onChange,
  onClick,
  required,
  selectedValue,
  values
}) => {
  const options = values.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
  const classToAdd = className ? `Select ${className}` : 'Select';

  return (
    <select
      aria-required={ariaRequired || required}
      className={classToAdd}
      disabled={disabled}
      name={name}
      onChange={onChange}
      onClick={onClick}
      required={required}
      value={selectedValue}
    >
      {options}
    </select>
  );
};

Select.propTypes = {
  ariaRequired: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  required: PropTypes.bool,
  selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  values: PropTypes.array.isRequired
};

Select.defaultProps = {
  ariaRequired: false,
  onChange: () => {},
  onClick: () => {}
};

export default Select;
