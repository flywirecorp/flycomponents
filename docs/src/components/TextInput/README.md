# TextInput

Specifies an input field where the user can enter data.

## Example

```javascript
<TextInput name="floating" label="Default" hint="Help text" />

<TextInput
  name="default"
  label="Default"
  hint="Help text"
  floatingLabel={false}
/>

<TextInput name="default" label="Default" hint="Help text" />

<TextInput name="password" type="password" label="Password" hint="password" />

<TextInput name="withprefix" prefix="@" label="With prefix" />

<TextInput name="withsuffix" suffix=".com" label="With suffix" />

<TextInput name="withvalue" value="Default value" label="With value" />

<TextInput name="multiline" multiline label="Multiline" />

<TextInput
  name="error"
  label="With error and required"
  error="Please, fill this field"
  placeholder="Placeholder"
  required
/>

<TextInput
  name="disabled"
  label="Disabled"
  value="this is a disabled input"
  disabled
/>

<TextInput
  name="readOnly"
  label="Read Only"
  value="this is a read only input"
  readOnly
/>

<TextInput
  name="disabledWithPrefix"
  prefix="@"
  label="With prefix disabled input"
  disabled
/>

<TextInput
  name="readonlyWithSuffix"
  suffix=".com"
  label="With suffix read only input"
  readOnly
/>
```

## Properties

| Property      | Req | Type   | Description                                                         | Default |
| ------------- | --- | ------ | ------------------------------------------------------------------- | ------- |
| disabled      | no  | bool   | Input is disabled                                                   | false   |
| error         | no  | string | Error message                                                       |         |
| hint          | no  | string | Help message below the autocomplete                                 |         |
| floatingLabel | no  | bool   | Floating label inside the input field                               | true    |
| label         | no  | string | The text string to use for HTML label tag                           |         |
| multiline     | no  | bool   | Enable or disable multiline                                         |         |
| name          | no  | string | Name and id of the element                                          |         |
| onBlur        | no  | func   | Callback function that is fired when component is blurred           |         |
| onChange      | no  | func   | Callback function that is fired when the components's value changes |         |
| onFocus       | no  | func   | Callback function that is fired when component is focused           |         |
| placeholder   | no  | string | Short hint that describes the expected value of the input field     |         |
| prefix        | no  | string | Button group                                                        |         |
| readOnly      | no  | bool   | Input is read-only                                                  | false   |
| required      | no  | bool   | Set the field to required                                           | false   |
| suffix        | no  | string | Button group                                                        |         |
| value         | no  | string | Default value                                                       |         |

It also supports all the native HTML attributes, such as `placeholder`,
`readOnly`, ...
