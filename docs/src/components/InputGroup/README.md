# InputGroup

Easily extend form controls by adding text on either side of textual inputs.

## Example

```javascript
<InputGroup
  placeholder="Enter amount"
  name="input"
  suffix="€"
  type="number"
/>

<InputGroup
  name="input"
  prefix="Tel"
  type="tel"
  value="+1 800 346 9252"
/>

<InputGroup
  name="input"
  prefix="http://"
  suffix=".com"
  value="flywire"
  disabled
/>
```

## Properties

| Property | Req | Type         | Description                           | Default |
| -------- | --- | ------------ | ------------------------------------- | ------- |
| name     | yes | string       | HTML input `name` attribute           | `null`  |
| prefix   | no  | string, node | Text or string shown before the input | `null`  |
| suffix   | yes | string       | Text or string shown after the input  | `null`  |

It also supports all the native HTML attributes, such as `value`, `required`,
`disabled`, `placeholder`, `readOnly`, ...
