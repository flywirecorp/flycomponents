# FormGroup

Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
<FormGroup
  className="FormGroup GridColumn"
  floatingLabel={false}
  hint="This is a hint text"
  label="Payment Amount"
  name="amount"
>
  <Input type="number" name="amount" />
</FormGroup>

<FormGroup
  className="FormGroup GridColumn"
  error="The amount is too low"
  floatingLabel={false}
  label="Field with error"
  name="error"
>
  <Input type="text" name="amount" />
</FormGroup>

<FormGroup
  name="amount"
  floatingLabel={false}
  label="Disabled field"
  className="FormGroup GridColumn is-disabled"
>
  <Input type="text" name="amount" value="Disabled" disabled />
</FormGroup>

<FormGroup
  name="amount"
  floatingLabel={false}
  label="Read Only field"
  className="FormGroup GridColumn is-readOnly"
>
  <Input type="text" name="amount" value="Read Only" readOnly />
</FormGroup>
```

## Properties

| Property      | Req | Type   | Description                              | Default |
| ------------- | --- | ------ | ---------------------------------------- | ------- |
| children      | yes | node   | Children node                            |         |
| className     | no  | string | Rewrite default CSS class                |         |
| disabled      | no  | bool   | Input is disabled                        | false   |
| error         | no  | string | Error message                            |         |
| floatingLabel | no  | bool   | Floating label inside the input field    | true    |
| floatingLabel | no  | bool   | Floating label inside the input field    | true    |
| hasPrefix     | no  | bool   | Whether or not has a symbol on the left  | false   |
| hasSuffix     | no  | bool   | Whether or not has a symbol on the right | false   |
| hasValue      | no  | bool   | Whether or not has the value set         | false   |
| hint          | no  | string | Shows help message                       |         |
| isFocused     | no  | bool   | Whether or not the field is focused      | false   |
| label         | no  | string | Label tag text                           |         |
| name          | yes | string | Name and id of the children              |         |
| readOnly      | no  | bool   | Input field is read only                 | false   |
| required      | no  | bool   | Set the field to required                | false   |
