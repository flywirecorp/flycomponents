import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

class Portal extends React.Component {
  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    document.body.removeAttribute('style');
    this.defaultNode = null;
  }

  render() {
    if (!this.props.node && !this.defaultNode) {
      this.defaultNode = document.createElement('div');
      this.defaultNode.className = 'Modal-container';
      document.body.appendChild(this.defaultNode);
      document.body.style.position = 'fixed';
    }

    return createPortal(
      this.props.children,
      this.props.node || this.defaultNode
    );
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any
};

export default Portal;
