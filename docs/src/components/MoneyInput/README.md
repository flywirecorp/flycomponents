# MoneyInput

An input field to type a money amount. The amount is autoformated when the input
receives the on blur event.

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
  hint="Please insert an amount"
/>

<MoneyInput name="default" floatingLabel={false} label="Default label" />

<MoneyInput name="disabled" label="Disabled field" disabled />

<MoneyInput name="readOnly" label="Read only field" readOnly />
```

## Properties

| Property           | Req | Type           | Description                                                                         | Default value |
| ------------------ | --- | -------------- | ----------------------------------------------------------------------------------- | ------------- |
| currencySymbol     | no  | string         | Currency symbol                                                                     | `"$"`         |
| decimalMark        | no  | string         | Decimal separator                                                                   | `"."`         |
| disabled           | no  | bool           | Disable input                                                                       | `false`       |
| disabled           | no  | bool           | Input is disabled                                                                   | false         |
| error              | no  | string, bool   | String: Error message. True: Error without message. False or empty string: no error |               |
| floatingLabel      | no  | bool           | Floating label inside the input field                                               | true          |
| hint               | no  | string         | Help message below the autocomplete                                                 |               |
| label              | no  | string         | The text string to use for HTML label tag                                           |               |
| maxLength          | no  | string, number | Input max length                                                                    | `9`           |
| name               | yes | string         | Input `name` and `id`                                                               |               |
| onBlur             | no  | func           | Callback function that is fired when component is blurred                           |               |
| onChange           | no  | func           | Callback function that is fired when the components's value changes                 |               |
| readOnly           | no  | bool           | Input field is read only                                                            | false         |
| required           | no  | bool           | Set the field to required                                                           | false         |
| subunitToUnit      | no  | number         | Conversion to minimun unit                                                          | `100`         |
| symbolFirst        | no  | bool           | The currency symbol goes before or after the amount                                 | `true`        |
| thousandsSeparator | no  | string         | Thousands separator                                                                 | `","`         |
| value              | no  | number, string | Default value                                                                       |               |
