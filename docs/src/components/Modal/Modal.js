import React from 'react';
import Component from '../Component';
import { Modal, Button } from '../../../../src';
import README from './README.md';

class ModalExample extends React.Component {
  state = {
    showModal: false
  };

  handleClick = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    console.log('modal has closed!');

    this.setState({ showModal: false });
  };

  handleOpen = () => {
    console.log('modal has opened!');
  };

  render() {
    const { showModal } = this.state;

    return (
      <Component readme={README}>
        <Button className="Button Button--primary" onClick={this.handleClick}>
          Open modal
        </Button>
        <Modal
          isOpen={showModal}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          size="medium"
        >
          <h1>Modal dialog content</h1>
          <form
            onSubmit={evt => {
              evt.preventDefault();
              this.handleClose();
            }}
          >
            First name: <input type="text" name="fname" />
            <br />
            Last name: <input type="text" name="lname" />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </Component>
    );
  }
}

export default ModalExample;
