# Switch

Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
<Switch name="cd1" label="Default" />

<Switch name="cb2" label="Checked" defaultChecked />

<Switch name="cb3" label="Disabled" disabled />

<Switch name="cb4" label="Checked & Disabled" defaultChecked disabled />
```

## Properties

| Property  | Req | Type   | Description                               | Default |
| --------- | --- | ------ | ----------------------------------------- | ------- |
| className | no  | string | CSS class name                            |         |
| label     | no  | string or node | The element to be used as label   |         |
| name      | yes | string | The name string to use for the name attr  |         |
