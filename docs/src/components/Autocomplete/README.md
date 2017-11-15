# Autocomplete
An input field with a set of predeterminated labeled values. When it's focused it shows a list of options that are filtered by label as the user types.

## Example

```javascript
const countries = [
  { label: 'Andorra', value: 'AN' },
  { label: 'China', value: 'CN' },
  { label: 'Cuba', value: 'CUB' },
  { label: 'France', value: 'FR' },
  { label: 'Germany', value: 'DEU' },
  { label: 'Greece', value: 'GR' },
  { label: 'Italy', value: 'IT' },
  { label: 'Japan', value: 'JP' },
  { label: 'Korea', value: 'KO' },
  { label: 'Morocco', value: 'MOR' },
  { label: 'Spain', value: 'ES' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'United States', value: 'US' }
];

const countryTemplate = country => (
  <div>
    <img src="http://via.placeholder.com/30x30" /> {country.label}
  </div>
);

<FormGroup
  name="country"
  label="Search enabled"
  className="FormGroup GridColumn"
>
  <Autocomplete
    name="country"
    options={countries}
    template={countryTemplate}
  />
</FormGroup>

<FormGroup
  name="country"
  label="Search disabled"
  className="FormGroup GridColumn"
>
  <Autocomplete
    name="country"
    options={countries}
    minOptionsForSearch={25}
  />
</FormGroup>
```

## Properties

| Property            | Req   | Type       | Description                                                            | Default   |
| ------------------- | ----- | ---------- | ---------------------------------------------------------------------- | --------- |
| label               | no    | string     | The text string to use for the floating label element                  |           |
| minOptionsForSearch | no    | number     | Minimun number of option for enablig the search                        | Infinity  |
| name                | yes   | string     | The name of input element                                              |           |
| onBlur              | no    | func       | Callback function that is fired when component is blurred              |           |
| onChange            | no    | func       | Callback function that is fired when the components's value changes    |           |
| onFocus             | no    | func       | Callback function that is fired when component is focused              |           |
| options             | yes   | array      | Array representing all items                                           |           |
| placeholder         | no    | string     | Short hint that describes the expected value of the input field        |           |
| readOnly            | no    | bool       | Input field is read-only                                               |           |
| template            | no    | func       | Callback function that returns a JSX template to represent the option  |           |
| value               | no    | bool       | Default value                                                          |           |
