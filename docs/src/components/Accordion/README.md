# Accordion
Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Example

```javascript
<Alert type="danger">
  <strong>Oh snap!</strong> Change a few things up and try submitting again.
</Alert>

<Alert type="success">
  <strong>Well done!</strong>
  {' '}
  You successfully read this important alert message.
</Alert>
```

## Properties

| Property         | Req   | Type                  | Description                                               | Default   |
| ---------------- | ----- | --------------------- | --------------------------------------------------------- | --------- |
| children         | yes   | node 		             | Children node                                             |           |
| type             | no    | string                | the alert type, can be `danger`, `success`, `warning` or `info` | `info` |
