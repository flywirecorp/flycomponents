# MoneyInput
An input field to type a money amount. The amount is autoformated when the input receives the on blur event.

## Example

```javascript
<MoneyInput
  currencySymbol="€"
  decimalMark=","
  label="Insert amount"
  name="amount"
  required
  symbolFirst={false}
  thousandsSeparator="."
/>

<MoneyInput disabled name="disabled" label="Disabled field" />
```

## Properties

| Property             | Req   | Type             | Description                                                         | Default value   |
| -------------------- | ----- | ---------------- | ------------------------------------------------------------------- | --------------- |
| error                | no    | string           | Error message                                                       |                 |
| hint                 | no    | string           | Help message below the autocomplete                                 |                 |
| label                | no    | string           | The text string to use for HTML label tag                           |                 |
| currencySymbol       | no    | string           | Currency symbol                                                     | `"$"`           |
| decimalMark          | no    | string           | Decimal separator                                                   | `"."`           |
| disabled             | no    | bool             | Disable input                                                       | `false`         |
| maxLength            | no    | string, number   | Input max length                                                    | `9`             |
| name                 | yes   | string           | Input `name` and `id`                                               |                 |
| onBlur               | no    | func             | Callback function that is fired when component is blurred           |                 |
| onChange             | no    | func             | Callback function that is fired when the components's value changes |                 |
| required             | no    | bool             | Set the field to required                                           | false
| subunitToUnit        | no    | number           | Conversion to minimun unit                                          | `100`           |
| symbolFirst          | no    | bool             | The currency symbol goes before or after the amount                 | `true`          |
| thousandsSeparator   | no    | string           | Thousands separator                                                 | `","`           |
| value                | no    | number, string   | Default value                                                       |                 |
