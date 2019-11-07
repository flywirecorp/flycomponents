import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  render() {
    const { id, children } = this.props;

    return (
      <ul className="Autocomplete-options" role="listbox" id={id} tabIndex={-1}>
        {children}
      </ul>
    );
  }
}

const { node, string } = PropTypes;

Options.propTypes = {
  children: node.isRequired,
  id: string
};

export default Options;
