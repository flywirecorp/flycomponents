# PhoneNumber
Input for entering and validating international telephone numbers

## Example

```javascript
const countries = [
  {
    label: 'Spain (+34)',
    value: 'es',
    dialingCode: '34',
    phonePattern: '+.. ... ... ...'
  },
  {
    label: 'United States (+1)',
    value: 'us',
    dialingCode: '1',
    phonePattern: '+. (...) ...-....'
  }
]

<PhoneNumber
  countries={countries}
  name="phone"
  label="Telephone number"
/>
<PhoneNumber
  countries={countries}
  name="phone"
  label="Default label"
  floatingLabel={false}
  value="+34"
/>
<PhoneNumber
  countries={countries}
  name="phone2"
  label="Default value"
  value="+34 555 555 555"
/>
<PhoneNumber
  countries={countries}
  name="phone"
  label="Disabled phone input"
  value="+34 555 555 555"
  disabled
/>
<PhoneNumber
  countries={countries}
  name="phone"
  label="Read only phone input"
  value="+1 111 111 111"
  readOnly
/>
```

## Properties

| Property         | Req   | Type       | Description                                                         | Default   |
| ---------------- | ----- | ---------- | ------------------------------------------------------------------- | --------- |
| countries        | yes   | array      | Array of countries                                                  |           |
| disabled         | no    | bool       | Input is disabled                                                   | false     |
| error            | no    | string     | Error message                                                       |           |
| floatingLabel    | no    | bool       | Floating label inside the input field                               | true      |
| hint             | no    | string     | Help message below the autocomplete                                 |           |
| label            | no    | string     | The text string to use for HTML label tag                           |           |
| name             | yes   | string     | Name and id of the input element                                    |           |
| onBlur           | no    | func       | Callback function that is fired when component is blurred           |           |
| onChange         | no    | func       | Callback function that is fired when the components's value changes |           |
| onFocus          | no    | func       | Callback function that is fired when component is focused           |           |
| readOnly         | no    | bool       | Input field is read-only                                            | false     |
| required         | no    | bool       | Set the field to required                                           | false     |
| value            | no    | bool       | Default value                                                       |           |
