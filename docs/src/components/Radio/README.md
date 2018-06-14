# Radio

Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
<Radio name="rb1" id="rb01" label="Default" />

<Radio name="rb1" id="rb02" label="Default" />

<Radio name="rb2" label="Checked" defaultChecked />

<Radio name="rb3" label="Disabled" disabled />

<Radio name="rb5" label="With error" error="We have an error" />
```

## Properties

| Property  | Req | Type   | Description                               | Default |
| --------- | --- | ------ | ----------------------------------------- | ------- |
| className | no  | string | CSS class name                            |         |
| error     | no  | string | Error message                             |         |
| label     | no  | string or node | The element to be used as label   |         |
| name      | yes | string | The name string to use for the name attr  |         |
