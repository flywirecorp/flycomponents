# Autocomplete
An input field with a set of predeterminated labeled values. When it's focused it shows a list of options that are filtered by label as the user types.

## Example

```javascript
const countries = [
  { label: 'Spain', value: 'ES' },
  { label: 'United States', value: 'US' },
  { label: 'China', value: 'CN' }
]

<FormGroup
  name="country"
  label="Search enabled"
  className="FormGroup GridColumn"
>
  <Autocomplete name="country" options={countries} />
</FormGroup>

<FormGroup
  name="country"
  label="Search disabled"
  className="FormGroup GridColumn"
>
  <Autocomplete
    name="country"
    options={countries}
    minOptionsForSearch={10}
  />
</FormGroup>
```

## Properties

| Property            | Req   | Type       | Description                                                         | Default   |
| ------------------- | ----- | ---------- | ------------------------------------------------------------------- | --------- |
| label               | no    | string     | The text string to use for the floating label element               |           |
| minOptionsForSearch | no    | number     | Minimun number of option for enablig the search                     | Infinity  |
| name                | yes   | string     | The name of input element                                           |           |
| onBlur              | no    | func       | Callback function that is fired when component is blurred           |           |
| onChange            | no    | func       | Callback function that is fired when the components's value changes |           |
| onFocus             | no    | func       | Callback function that is fired when component is focused           |           |
| options             | no    | array      | Array representing all items                                        |           |
| placeholder         | no    | string     | Short hint that describes the expected value of the input field     |           |
| readOnly            | no    | bool       | Input field is read-only                                            |           |
| value               | no    | bool       | Default value                                                       |           |
