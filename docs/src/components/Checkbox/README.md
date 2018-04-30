# Checkbox

Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
<Checkbox name="cd1" label="Default" />

<Checkbox name="cb2" label="Checked" defaultChecked />

<Checkbox name="cb3" label="Disabled" disabled />

<Checkbox name="cb4" label="Checked & Disabled" defaultChecked disabled />

<Checkbox name="cb5" label="With error" error="We have an error" />
```

## Properties

| Property  | Req | Type   | Description                               | Default |
| --------- | --- | ------ | ----------------------------------------- | ------- |
| className | no  | string | CSS class name                            |         |
| error     | no  | string | Error message                             |         |
| label     | no  | string or node | The element to be used as label   |         |
| name      | yes | string | The name string to use for the name attr  |         |
