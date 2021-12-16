import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  render() {
    const { forwardRef, children, name } = this.props;
    return (
      <ul
        id={`${name}-menu-options`}
        role="listbox"
        className="Autocomplete-options PhoneNumber-menu-options"
        ref={forwardRef}
      >
        {children}
      </ul>
    );
  }
}

Options.displayName = 'Options';
Options.propTypes = {
  children: PropTypes.node.isRequired,
  forwardRef: PropTypes.object,
  name: PropTypes.string.isRequired
};

export default Options;
