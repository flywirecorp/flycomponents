import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  render() {
    const { id, children, forwardRef } = this.props;

    return (
      <ul
        className="Autocomplete-options"
        id={id}
        tabIndex={-1}
        ref={forwardRef}
      >
        {children}
      </ul>
    );
  }
}

const { node, string, object } = PropTypes;

Options.propTypes = {
  children: node.isRequired,
  forwardRef: object,
  id: string
};

export default Options;
