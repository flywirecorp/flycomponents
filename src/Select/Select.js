import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  className,
  disabled,
  forwardRef,
  name,
  onChange,
  onClick,
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
      className={classToAdd}
      disabled={disabled}
      name={name}
      onChange={onChange}
      onClick={onClick}
      ref={forwardRef}
      value={selectedValue}
      {...other}
    >
      {options}
    </select>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  forwardRef: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  values: PropTypes.array.isRequired
};

Select.defaultProps = {
  onChange: () => {},
  onClick: () => {}
};

export default Select;
