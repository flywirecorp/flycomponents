# Autocomplete
An input field with a set of predeterminated labeled values. When it's focused
it shows a list of options that are filtered by label as the user types.

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

<Autocomplete
  label="Search enabled"
  name="country"
  options={countries}
  placeholder="Select a country"
  required
  template={countryTemplate}
/>
<Autocomplete
  hint="You can't search here, It's like a dropdown"
  label="Search disabled"
  minOptionsForSearch={25}
  name="country"
  options={countries}
  placeholder="Select a country"
/>
<Autocomplete
  error="This field is required"
  label="Autocomplete with error"
  name="country"
  options={countries}
  placeholder="Select a country"
/>
```

## Properties

| Property            | Req   | Type       | Description                                                            | Default   |
| ------------------- | ----- | ---------- | ---------------------------------------------------------------------- | --------- |
| error               | no    | string     | Error message                                                          |           |
| hint                | no    | string     | Help message below the autocomplete                                    |           |
| label               | no    | string     | The text string to use for HTML label tag                              |           |
| minOptionsForSearch | no    | number     | Minimun number of option for enablig the search                        | Infinity  |
| name                | yes   | string     | The name of input element                                              |           |
| onBlur              | no    | func       | Callback function that is fired when component is blurred              |           |
| onChange            | no    | func       | Callback function that is fired when the components's value changes    |           |
| onFocus             | no    | func       | Callback function that is fired when component is focused              |           |
| options             | yes   | array      | Array representing all items                                           |           |
| placeholder         | no    | string     | Short hint that describes the expected value of the input field        |           |
| readOnly            | no    | bool       | Input field is read-only                                               |           |
| template            | no    | func       | Callback function that returns a JSX template to represent the option  |           |
| value               | no    | string     | Default value                                                          | null      |
