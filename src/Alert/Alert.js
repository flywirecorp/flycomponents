import PropTypes from 'prop-types';
import React from 'react';

const Alert = ({ children, type = 'info', role = 'alert', ...other }) => (
  <div className={`Alert Alert--${type}`} role={role} {...other}>
    {children}
  </div>
);

Alert.displayName = 'Alert';
Alert.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
  type: PropTypes.string
};

export default Alert;
