import PropTypes from 'prop-types'
import React from 'react'

const Alert = ({ children, type }) =>
  <div className={`Alert Alert--${type}`} role="alert">
    {children}
  </div>

const { node } = PropTypes
Alert.propTypes = {
  children: node.isRequired
}

Alert.defaultProps = {
  type: 'info'
}

export default Alert
