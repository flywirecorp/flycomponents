# MoneyInput
An input field to type a money amount. The amount is autoformated when the input receives the on blur event.

## Example

```javascript
<MoneyInput
  currencySymbol='€'
  decimalMark=','
  name='amount'
  symbolFirst={false}
  thousandsSeparator='.'
/>
```

## Properties

| Property             | Req   | Type             | Description                                                         | Default value   |
| -------------------- | ----- | ---------------- | ------------------------------------------------------------------- | --------------- |
| currencySymbol       | no    | string           | Currency symbol                                                     | `"$"`           |
| decimalMark          | no    | string           | Decimal separator                                                   | `"."`           |
| maxLength            | no    | string, number   | Input max length                                                    | `9`             |
| name                 | yes   | string           | Input `name` and `id`                                               |                 |
| onBlur               | no    | func             | Callback function that is fired when component is blurred           |                 |
| onChange             | no    | func             | Callback function that is fired when the components's value changes |                 |
| subunitToUnit        | no    | number           | Conversion to minimun unit                                          | `100`           |
| symbolFirst          | no    | bool             | The currency symbol goes before or after the amount                 | `true`          |
| thousandsSeparator   | no    | string           | Thousands separator                                                 | `","`           |
| value                | no    | number, string   | Default value                                                       |                 |
