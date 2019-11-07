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

const getA11yStatusMessage = ({ isOpen, options, selectedOption }) => {
  const optionsClosed = !isOpen;
  const { label } = selectedOption;

  if (optionsClosed) {
    return label ? `You have selected ${label}` : '';
  }

  const resultCount = options.length;

  if (resultCount === 0) {
    return 'No results are available';
  }

  return `${resultCount} ${
    resultCount === 1 ? 'result is' : 'results are'
  } available, use up and down arrow keys to navigate. Press Enter key to select.`;
};

<Autocomplete
  label="Search enabled"
  name="search"
  options={countries}
  placeholder="Select a country"
  required
  template={countryTemplate}
  getA11yStatusMessage={getA11yStatusMessage}
/>

<Autocomplete
  floatingLabel={false}
  label="Default label"
  name="default"
  options={countries}
  placeholder="Select a country"
  required
  template={countryTemplate}
/>

<Autocomplete
  hint="You can't search here, It's like a dropdown"
  label="Search disabled"
  minOptionsForSearch={25}
  name="disabled"
  options={countries}
  placeholder="Select a country"
/>

<Autocomplete
  error="This field is required"
  label="Autocomplete with error"
  name="error"
  options={countries}
  placeholder="Select a country"
/>

<Autocomplete
  label="Disabled autocomplete"
  name="country"
  options={countries}
  placeholder="Select a country"
  value="ES"
  disabled
/>

<Autocomplete
  label="Read only autocomplete"
  name="country"
  options={countries}
  placeholder="Select a country"
  value="US"
  readOnly
/>
```

## Properties

| Property            | Req | Type   | Description                                                           | Default  |
| ------------------- | --- | ------ | --------------------------------------------------------------------- | -------- |
| disabled            | no  | bool   | Input field is disabled                                               | false    |
| error               | no  | string | Error message                                                         |          |
| floatingLabel       | no  | bool   | Floating label inside the input field                                 | true     |
| fuseConfig          | no  | object | Fuse.js configuration                                                 | \(\*\)   |
| getA11yStatusMessage| no  | func   | Default messages provided in English | "No results are available."  or "`x` results are available, use up and down arrow keys to navigate. Press Enter key to select."        |
| hint                | no  | string | Help message below the autocomplete                                   |          |
| hint                | no  | string | Help message below the autocomplete                                   |          |
| label               | no  | string | The text string to use for HTML label tag                             |          |
| minOptionsForSearch | no  | number | Minimun number of option for enablig the search                       | Infinity |
| name                | yes | string | The name of input element                                             |          |
| onBlur              | no  | func   | Callback function that is fired when component is blurred             |          |
| onChange            | no  | func   | Callback function that is fired when the components's value changes   |          |
| onFocus             | no  | func   | Callback function that is fired when component is focused             |          |
| options             | yes | array  | Array representing all items                                          |          |
| placeholder         | no  | string | Short hint that describes the expected value of the input field       |          |
| readOnly            | no  | bool   | Input field is read only                                              | false    |
| required            | no  | bool   | Set the field to required                                             | false    |
| shouldShort         | no  | bool   | Sort options                                                          | false    |
| template            | no  | func   | Callback function that returns a JSX template to represent the option |          |
| value               | no  | string | Default value                                                         | null     |

### (\*) Fuse.js

The Autocomplete component uses [Fuse.js](http://fusejs.io) search library,
using this default configuration:

```
const fuseConfig = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['label']
}

<Autocomplete fuseConfig={fuseConfig} />
```
