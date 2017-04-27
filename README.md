# Flycomponents

Flycomponents is a set a react UI components used to create payment forms in Flywire.

## Components

- Autocomplete
- Button
- Datepicker
- [FormGroup](#formgroup)
- Input
- InputGroup
- Label
- [MoneyInput](#moneyinput)
- PhoneInput
- Select
- Textarea
- TextInput

### FormGroup
Wraps a form field. Adds a label, display errors and help texts.

**Requires**: `Label`.

| Property       | Req | Type     | Description                          | Default |
|----------------|-----|----------|--------------------------------------|---------|
| children       | yes | node     | Children node                        |         |
| className      | no  | string   | Rewrite default CSS class            |         |
| error          | no  | string   | Shows the error message              |         |
| hint           | no  | string   | Shows help message                   |         |
| label          | no  | string   | Label tag text                       |         |
| name           | yes | string   | Name and id of the children          |         |
| required       | no  | bool     | Set the field to required            | false   |

##### Example

```javascript
<FormGroup name='amount' label='* Payment Amount' className='FormGroup GridColumn'>
  <MoneyInput name='amount' />
</FormGroup>
```

### MoneyInput

`MoneyInput` is a input field to type a money amount. This amount is autoformated when the user types and follow and can be configurated to follow a currency standard.
By default the format is set to follow USD standard.

**Requires**: `InputGroup`.

| Property           | Req | Type           | Description                                         | Default value |
|--------------------|-----|----------------|-----------------------------------------------------|---------------|
| currencySymbol     | no  | string         | Currency symbol                                     | `"$"`         |
| decimalMark        | no  | string         | How decimal are marked                              | `"."`         |
| maxLength          | no  | string, number | Input max length                                    | `9`           |
| name               | yes | string         | Input `name` and `id`                               |               |
| onBlur             | no  | func           | Function executed on blur                           |               |
| onChange           | no  | func           | Function executed when the value changes            |               |
| subunitToUnit      | no  | number         | Conversion to minimun unit                          | `100`         |
| symbolFirst        | no  | bool           | The currency symbol goes before or after the amount | `true`        |
| thousandsSeparator | no  | string         | Thousands separator                                 | `","`         |
| value              | no  | number, string | The input value                                     |               |

##### Example

```javascript
// European format
<MoneyInput currencySymbol='€' name='amount' decimalMark=',' symbolFirst={false} thousandsSeparator='.' />
```
