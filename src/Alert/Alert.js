import PropTypes from 'prop-types';
import React from 'react';

const Alert = ({ children, type, ...other }) => (
  <div className={`Alert Alert--${type}`} role="alert" {...other}>
    {children}
  </div>
);

Alert.displayName = 'Alert';
Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
