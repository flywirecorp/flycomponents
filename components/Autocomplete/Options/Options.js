import React, { Component, PropTypes } from 'react'

class Options extends Component {
  render () {
    return (
      <ul className='Autocomplete-options'>
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
