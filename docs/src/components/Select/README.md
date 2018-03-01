# Select

Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
const values = [
  { label: 'Spain', value: 'ES' },
  { label: 'United States', value: 'US' },
  { label: 'China', value: 'CN' }
]

<Select
  name="country"
  onChange={() => {}}
  onClick={() => {}}
  selectedValue="US"
  values={values}
/>
```

## Properties

| Property      | Req | Type           | Description                                                         | Default |
| ------------- | --- | -------------- | ------------------------------------------------------------------- | ------- |
| className     | no  | string         | CSS class name                                                      |         |
| onChange      | no  | func           | Callback function that is fired when the components's value changes |         |
| onClick       | no  | func           | Callback function that is fired when component is clicked           |         |
| selectedValue | yes | number, string | Default selected value                                              |         |
| values        | yes | array          | Array representing all select options                               |         |
