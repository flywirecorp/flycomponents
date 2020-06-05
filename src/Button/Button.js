import PropTypes from 'prop-types';
import React from 'react';

const NOOP = () => {};
export const Button = ({
  children,
  onClick = NOOP,
  type = 'button',
  ...other
}) => (
  <button className="Button" onClick={onClick} type={type} {...other}>
    {children || 'Submit'}
  </button>
);

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
