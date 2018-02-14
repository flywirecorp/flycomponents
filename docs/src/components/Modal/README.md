# Modal
Modal element

## Example

```javascript
<Button className="Button Button--primary" onClick={this.handleClick}>
  Open modal
</Button>

<Modal isOpen={showModal} onClose={this.handleClose} size="medium">
  <div>Modal dialog content</div>
</Modal>
```

## Properties

| Property | Req | Type | Description | Default |
|-|-|-|-|-|
| children | yes | array, object, string | Children node | |
| defaultIsOpen | no | boolean | Initial modal state, opened or closed | `true` |
| isOpen | no | boolean | Button type f.e button, submit, reset | |
| onClose | no | function | Callback function that is fired when modal is closed | |
| onOpen | no | function | Callback function that is fired when modal is opened | |
| size | no | string | Modal dialog size: `small` or `medium` | `small` |
