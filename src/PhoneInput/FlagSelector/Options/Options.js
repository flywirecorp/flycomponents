import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Options.scss'

class Options extends Component {
  render() {
    return (
      <ul className="Autocomplete-options PhoneNumber-menu-options">
        {this.props.children}
      </ul>
    )
  }
}

const { node } = PropTypes

Options.propTypes = {
  children: node.isRequired
}

export default Options
