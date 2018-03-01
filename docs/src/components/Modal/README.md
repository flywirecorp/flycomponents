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
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <Button className="Button Button--primary" onClick={this.handleClick}>
          Open modal
        </Button>

        <Modal
          isOpen={showModal}
          onClose={this.handleClose}
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

| Property      | Req | Type                  | Description                                          | Default |
| ------------- | --- | --------------------- | ---------------------------------------------------- | ------- |
| children      | yes | array, object, string | Children node                                        |         |
| className     | no  | string                | CSS class to be applied to Modal                     |         |
| defaultIsOpen | no  | boolean               | Initial modal state, opened or closed                | `true`  |
| isOpen        | no  | boolean               | Modal open state                                     | `false` |
| onClose       | no  | function              | Callback function that is fired when modal is closed |         |
| onOpen        | no  | function              | Callback function that is fired when modal is opened |         |
| size          | no  | string                | Modal dialog size: `small` or `medium`               | `small` |
