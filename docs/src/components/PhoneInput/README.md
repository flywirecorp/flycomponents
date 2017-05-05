# PhoneInput
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

<PhoneInput countries={countries} name="phone" />
```

## Properties

| Property         | Req   | Type       | Description                                                         | Default   |
| ---------------- | ----- | ---------- | ------------------------------------------------------------------- | --------- |
| countries        | yes   | array      | Array of countries                                                  |           |
| name             | yes   | string     | Name and id of the input element                                    |           |
| onBlur           | no    | func       | Callback function that is fired when component is blurred           |           |
| onChange         | no    | func       | Callback function that is fired when the components's value changes |           |
| onFocus          | no    | func       | Callback function that is fired when component is focused           |           |
| readOnly         | no    | bool       | Input field is read-only                                            |           |
| value            | no    | bool       | Default value                                                       |           |
