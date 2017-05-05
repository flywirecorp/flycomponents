# TextInput
Specifies an input field where the user can enter data.

## Example

```javascript
<TextInput name="twitter" prefix="@" />
```

## Properties

| Property         | Req   | Type       | Description                                                         | Default   |
| ---------------- | ----- | ---------- | ------------------------------------------------------------------- | --------- |
| multiline        | no    | bool       | Enable or disable multiline                                         |           |
| name             | no    | string     | Name and id of the element                                          |           |
| onBlur           | no    | func       | Callback function that is fired when component is blurred           |           |
| onChange         | no    | func       | Callback function that is fired when the components's value changes |           |
| onFocus          | no    | func       | Callback function that is fired when component is focused           |           |
| prefix           | no    | string     | Button group                                                        |           |
| sufix            | no    | string     | Button group                                                        |           |
| value            | no    | string     | Default value                                                       |           |
