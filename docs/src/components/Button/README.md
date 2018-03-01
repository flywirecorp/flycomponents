# Button

Button element

## Example

```javascript
<Button onClick={() => alert('You clicked me!')}>Click Me!</Button>;
```

## Properties

| Property | Req | Type                  | Description                                               | Default  |
| -------- | --- | --------------------- | --------------------------------------------------------- | -------- |
| children | no  | array, object, string | Children node                                             | `Submit` |
| onBlur   | no  | func                  | Callback function that is fired when component is clicked |          |
| type     | yes | string                | Button type f.e button, submit, reset                     |          |
