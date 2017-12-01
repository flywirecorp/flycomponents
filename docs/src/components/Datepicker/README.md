# Datepicker
Datepickers are used to select a single date for an input.

## Example

```javascript
<Datepicker
  label="Date of Birth"
  locale="ES"
  name="birthday"
  onChange={(name, date) => alert(`Your ${name} is the ${date}`)}
  required
  value="04/21/1979"
/>

<Datepicker label="Pick a Date" locale="ES" name="other" />

<Datepicker
  floatingLabel={false}
  label="Pick a Date"
  locale="ES"
  name="other"
  value="04/21/1979"
/>

<Datepicker
  floatingLabel={false}
  label="Pick a Date"
  locale="ES"
  name="other"
/>
```

## Properties

| Property         | Req   | Type           | Description                                                         | Default   |
| ---------------- | ----- | -------------- | ------------------------------------------------------------------- | --------- |
| error            | no    | string         | Error message                                                       |           |
| floatingLabel    | no    | bool           | Floating label inside the input field                               | true      |
| hint             | no    | string         | Help message below the autocomplete                                 |           |
| label            | no    | string         | The text string to use for HTML label tag                           |           |
| locale           | no    | string         | Locale                                                              | EN        |
| name             | yes   | string         | Name and id of the input element                                    |           |
| onBlur           | no    | func           | Callback function that is fired when component is blurred           |           |
| onChange         | no    | func           | Callback function that is fired when the components's value changes |           |
| onFocus          | no    | func           | Callback function that is fired when component is focused           |           |
| readOnly         | no    | bool           | Input field is read-only                                            |           |
| required         | no    | bool           | Set the field to required                                           | false     |
| value            | no    | number, string | Default value                                                       |           |
