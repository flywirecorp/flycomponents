# MultipleCheckbox

Component for checkbox list

## Example

```javascript
const values = [
  { label: 'Spain', value: 'ES' },
  { label: 'United States', value: 'US' },
  { label: 'China', value: 'CN' }
]

<MultipleCheckbox
  checked={['ES']}
  disabled
  label="Countries you visited"
  name="countries-1"
  options={this.countries}
/>

<MultipleCheckbox
  label="Countries you visited"
  name="countries-2"
  onChange={({ checked }) => this.setState({ checked })}
  options={this.countries}
  required
/>

<p>You visited: {this.state.checked.join('-')}</p>

<MultipleCheckbox
  error="Please select at least one!"
  label="Countries you visited"
  name="countries-3"
  options={this.countries}
/>
```

## Properties

| Property | Req | Type   | Description                                             | Default |
| -------- | --- | ------ | ------------------------------------------------------- | ------- |
| checked  | no  | array  | Default checked                                         | []      |
| disabled | no  | bool   | Disable checkboxes                                      | false   |
| error    | no  | string | Error message                                           |         |
| label    | no  | string | The text string to use for HTML label tag               |         |
| name     | yes | string | The name of the checkboxes                              |         |
| onChange | no  | func   | Callback function that is fired when a checkbox changes |         |
| options  | yes | array  | Array representing all items                            |         |
| required | no  | bool   | Set the field to required                               | false   |
