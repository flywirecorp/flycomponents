import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Options extends Component {
  render() {
    const { forwardRef, children } = this.props;
    return (
      <ul
        id="phoneNumber-menu-options"
        role="menu"
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
  forwardRef: PropTypes.object
};

export default Options;
