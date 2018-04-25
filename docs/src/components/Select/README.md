# Select

Wraps a form field. Adds a label, display errors and help texts.

## Example

```javascript
const values = [
  { label: 'Spain', value: 'ES' },
  { label: 'United States', value: 'US' },
  { label: 'China', value: 'CN' }
]

<Select name="country_1" selectedValue="US" values={values} />
<Select
  className="myClass"
  disabled
  name="country_2"
  selectedValue="CN"
  values={values}
/>
```

## Properties

| Property      | Req | Type           | Description                                                         | Default |
| ------------- | --- | -------------- | ------------------------------------------------------------------- | ------- |
| className     | no  | string         | CSS class name                                                      |         |
| disabled      | no  | boolean        | HTML `disabled` property for the select node                        | false   |
| name          | no  | string         | `name` property fot the select node                                 |         |
| onChange      | no  | function       | Callback function that is fired when the components's value changes |         |
| onClick       | no  | function       | Callback function that is fired when component is clicked           |         |
| selectedValue | yes | number, string | Default selected value                                              |         |
| values        | yes | array          | Array representing all select options                               |         |
