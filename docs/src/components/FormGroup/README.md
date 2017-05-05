# FormGroup
Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
<FormGroup
  name="amount"
  label="Payment Amount"
  className="FormGroup GridColumn"
  hint="This is a hint text"
>
  <MoneyInput name="amount" />
</FormGroup>

<FormGroup
  name="error"
  label="Field with error"
  className="FormGroup GridColumn"
  error="The amount is too low"
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
| hint             | no    | string     | Shows help message                     |           |
| label            | no    | string     | Label tag text                         |           |
| name             | yes   | string     | Name and id of the children            |           |
| required         | no    | bool       | Set the field to required              | false     |
