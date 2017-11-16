# TextInput
Specifies an input field where the user can enter data.

## Example

```javascript
<TextInput name="default" label="Default" hint="Help text" />

<TextInput name="withprefix" prefix="@" label="With prefix" />

<TextInput name="withsufix" sufix=".com" label="With sufix" />

<TextInput name="withvalue" value="Default value" label="With value" />

<TextInput name="multiline" multiline label="Multiline" />

<TextInput
  name="multiline"
  label="With error and required"
  error="Please, fill this field"
  placeholder="Placeholder"
  required
/>
```

## Properties

| Property         | Req   | Type       | Description                                                         | Default   |
| ---------------- | ----- | ---------- | ------------------------------------------------------------------- | --------- |
| error            | no    | string     | Error message                                                       |           |
| hint             | no    | string     | Help message below the autocomplete                                 |           |
| label            | no    | string     | The text string to use for HTML label tag                           |           |
| multiline        | no    | bool       | Enable or disable multiline                                         |           |
| name             | no    | string     | Name and id of the element                                          |           |
| onBlur           | no    | func       | Callback function that is fired when component is blurred           |           |
| onChange         | no    | func       | Callback function that is fired when the components's value changes |           |
| onFocus          | no    | func       | Callback function that is fired when component is focused           |           |
| placeholder      | no    | string     | Short hint that describes the expected value of the input field     |           |
| prefix           | no    | string     | Button group                                                        |           |
| required         | no    | bool       | Set the field to required                                           | false     |
| sufix            | no    | string     | Button group                                                        |           |
| value            | no    | string     | Default value                                                       |           |

It also supports all the native HTML attributes, such as `placeholder`, `readOnly`, ...
