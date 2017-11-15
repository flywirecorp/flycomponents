import PropTypes from 'prop-types';
import React from 'react';

export const Button = ({ children, onClick, type, ...other }) => (
  <button className="Button" onClick={onClick} type={type} {...other}>
    {children || 'Submit'}
  </button>
);

const { array, func, object, oneOfType, string } = PropTypes;

Button.propTypes = {
  children: oneOfType([array, object, string]),
  onClick: func,
  type: string
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button'
};

export default Button;
