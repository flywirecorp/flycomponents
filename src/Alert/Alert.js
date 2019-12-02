import PropTypes from 'prop-types';
import React from 'react';

const Alert = ({ children, type, ...other }) => (
  <div className={`Alert Alert--${type}`} role="alert" {...other}>
    {children}
  </div>
);

const { node, string } = PropTypes;
Alert.propTypes = {
  children: node.isRequired,
  type: string
};

Alert.defaultProps = {
  type: 'info'
};

export default Alert;
