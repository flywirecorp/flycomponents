import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  render() {
    return (
      <ul
        id="phoneNumber-menu-options"
        role="listbox"
        className="Autocomplete-options PhoneNumber-menu-options"
      >
        {this.props.children}
      </ul>
    );
  }
}

const { node } = PropTypes;

Options.propTypes = {
  children: node.isRequired
};

export default Options;
