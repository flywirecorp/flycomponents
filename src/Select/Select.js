import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  ariaRequired,
  className,
  disabled,
  forwardRef,
  name,
  onChange,
  onClick,
  required,
  selectedValue,
  values,
  ...other
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
      ref={forwardRef}
      required={required}
      value={selectedValue}
      {...other}
    >
      {options}
    </select>
  );
};

Select.propTypes = {
  ariaRequired: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  forwardRef: PropTypes.object,
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
