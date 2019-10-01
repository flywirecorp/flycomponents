# Modal

Modal element

## Example uncontrolled modal

```javascript
const UncontrolledModal = () => (
  <Modal defaultIsOpen={true}>
    <div>Modal dialog content</div>
  </Modal>
);
```

## Example controlled modal

```javascript
class ControlledModal extends React.Component {
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
      <React.Fragment>
        <Button className="Button Button--primary" onClick={this.handleClick}>
          Open modal
        </Button>

        <Modal
          allowClosing
          isOpen={showModal}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          size="medium"
          className="color-danger"
        >
          <div>Controlled modal dialog content</div>
        </Modal>
      </React.Fragment>
    );
  }
}
```

## Properties

| Property      | Req | Type                  | Description                                                                                       | Default |
| ------------- | --- | --------------------- | ------------------------------------------------------------------------------------------------- | ------- |
| allowClosing  | no  | boolean               | Enable or disable closing the modal. (Close button, `Esc` key and clicking ouside of the Modal).  | `true`  |
| children      | yes | array, object, string | Children node                                                                                     |         |
| className     | no  | string                | CSS class to be applied to Modal                                                                  |         |
| defaultIsOpen | no  | boolean               | Initial modal state, opened or closed                                                             | `true`  |
| isOpen        | no  | boolean               | Modal open state                                                                                  | `false` |
| onClose       | no  | function              | Callback function that is fired when modal is closed. Only works when `allowClosing` is true.     |         |
| onOpen        | no  | function              | Callback function that is fired when modal is opened                                              |         |
| size          | no  | string                | Modal dialog size: `small` or `medium`                                                            | `small` |
