import PropTypes from 'prop-types';
import React from 'react';
import { useButton } from '../hooks';

export const Button = ({ children = 'Submit', forwardRef, ...rest }) => {
  const { buttonProps } = useButton(rest);

  return (
    <button ref={forwardRef} {...buttonProps}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]),
  forwardRef: PropTypes.object
};

export default Button;
