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

Options.propTypes = {
  children: PropTypes.node.isRequired,
  forwardRef: PropTypes.object,
  id: PropTypes.string
};

export default Options;
