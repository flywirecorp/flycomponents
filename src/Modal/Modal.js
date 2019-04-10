import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';

const ESCAPE_KEY = 27;

class Modal extends Component {
  static propTypes = {
    allowClosing: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    defaultIsOpen: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    size: PropTypes.string
  };

  static defaultProps = {
    allowClosing: true,
    className: '',
    defaultIsOpen: true,
    onClose: () => {},
    onOpen: () => {},
    size: 'small'
  };

  state = {
    isOpen: this.props.defaultIsOpen
  };

  componentDidMount() {
    const { onOpen } = this.props;
    if (this.isOpen) {
      onOpen();
    }

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  close = () => {
    const { allowClosing, onClose } = this.props;
    if (!allowClosing) return;

    this.setState({ ...this.state, isOpen: false }, onClose);
  };

  handleClick = event => {
    if (event.target.getAttribute('data-modal')) {
      this.close();
    }
  };

  handleKeyDown = event => {
    const keyCode = event.keyCode;

    if (keyCode === ESCAPE_KEY) {
      this.close();
    }
  };

  get isClosed() {
    return !this.isOpen;
  }

  get isOpen() {
    return this.isUncontrolled ? this.state.isOpen : this.props.isOpen;
  }

  get isUncontrolled() {
    const { isOpen } = this.props;

    return typeof isOpen === 'undefined';
  }

  open = () => {
    const { onOpen } = this.props;
    this.setState({ ...this.state, isOpen: true }, onOpen);
  };

  render() {
    const { allowClosing, children, className, size } = this.props;
    const modalClassName = `Modal Modal--${size} ${className}`;
    const closeButton = (
      <button
        className="Modal-closeButton"
        type="button"
        onClick={this.close}
        aria-label="Close"
      >
        <span className="Icon Icon--close Icon--xs margin-0" />
      </button>
    );

    if (this.isClosed) {
      return null;
    }

    return (
      <Portal>
        <div
          className={modalClassName}
          tabIndex="-1"
          role="dialog"
          onMouseDown={this.handleClick}
          data-modal
          data-qa="Modal"
        >
          <div className="Modal-dialog">
            {allowClosing && closeButton}
            <div className="Modal-content" role="document">
              {children}
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default Modal;
