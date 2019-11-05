import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  render() {
    const { id, children } = this.props;

    return (
      <ul className="Autocomplete-options" id={id} role="listbox">
        {children}
      </ul>
    );
  }
}

const { node, string } = PropTypes;

Options.propTypes = {
  children: node.isRequired,
  id: string.isRequired
};

export default Options;
