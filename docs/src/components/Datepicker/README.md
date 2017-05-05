# Datepicker
Datepickers are used to select a single date for an input.

## Example

```javascript
<Datepicker
  locale='ES'
  name='birthday'
  onBlur={() => {})
  onChange={(name, date) => alert(`Your ${name} is the ${date}`)}
  value='04/21/1979'
/>
```

## Properties

| Property         | Req   | Type           | Description                                                         | Default   |
| ---------------- | ----- | -------------- | ------------------------------------------------------------------- | --------- |
| locale           | no    | string         | Locale                                                              | EN        |
| name             | yes   | string         | Name and id of the input element                                    |           |
| onBlur           | no    | func           | Callback function that is fired when component is blurred           |           |
| onChange         | no    | func           | Callback function that is fired when the components's value changes |           |
| onFocus          | no    | func           | Callback function that is fired when component is focused           |           |
| readOnly         | no    | bool           | Input field is read-only                                            |           |
| value            | no    | number, string | Default value                                                       |           |
