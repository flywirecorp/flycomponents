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
```

## Properties

| Property         | Req   | Type       | Description                            | Default   |
| ---------------- | ----- | ---------- | -------------------------------------- | --------- |
| children         | yes   | node       | Children node                          |           |
| className        | no    | string     | Rewrite default CSS class              |           |
| error            | no    | string     | Error message                          |           |
| floatingLabel    | no    | bool       | Floating label inside the input field  | true      |
| floatingLabel    | no    | bool       | Floating label inside the input field  | true      |
| hasSymbol        | no    | bool       | Whether or not has a symbol on the left| false     |
| hasValue         | no    | bool       | Whether or not has the value set       | false     |
| hint             | no    | string     | Shows help message                     |           |
| isFocused        | no    | bool       | Whether or not the field is focused    | false     |
| label            | no    | string     | Label tag text                         |           |
| name             | yes   | string     | Name and id of the children            |           |
| required         | no    | bool       | Set the field to required              | false     |
