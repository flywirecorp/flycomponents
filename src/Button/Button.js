import PropTypes from 'prop-types';
import React from 'react';

const NOOP = () => {};
export const Button = ({
  children,
  onClick = NOOP,
  type = 'button',
  forwardRef,
  ...other
}) => (
  <button
    className="Button"
    onClick={onClick}
    type={type}
    ref={forwardRef}
    {...other}
  >
    {children || 'Submit'}
  </button>
);

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  forwardRef: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
