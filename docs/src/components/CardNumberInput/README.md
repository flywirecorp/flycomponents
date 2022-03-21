# Card Number Input 

Card input that draws the type of card and restricts the format.

## Example of Tabs

```javascript
import { CardNumberInput } from 'flycomponents';

const CardInput = () => {
  const props = {
    name: 'cardNumber',
    label: 'Card Number',
    onBlur: (name) => { console.log(`Received onBlur for field ${name}`)},
    onFocus: (name) => { console.log(`Received onFocus for field ${name}`)},
    onChange: (name, value) => { console.log(`Received onChange for field ${name} with value ${value}`)},
    className: 'cardForm-cardNumber',
    ariaRequired: true,
  };

  return (
    <Component readme={README}>
      <CardNumberInput {...props}/>
      <CardNumberInput {...props} error="Invalid Credit Card"/>
    </Component>
  );
};
```

## Properties

| Property      | Req | Type     | Description                                                                                     | Default                                                           |
|---------------|-----|----------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| name          | yes | string   | The name of the control                                                                         |                                                                   |
| format        | no  | object   | The format applied to the input                                                                 | {       pattern: '....-....-....-....', shouldAddSeparatorBeforeTyping: true, allowedCharacters: /[0-9]*/g } |
| onBlur        | no  | function | The callback called when the field loses control. The name of the field is passed as a param.   | (name) => {}                                                      |
| onChange      | no  | function | The callback called when the value of the field changes.                                        | (name, value) => {}                                               |
| onFocus       | no  | function | The callback called when the field gets keyboard focus.The name of the field is passed as param | (name) => {}                                                      |
| className     | no  | string   | className to be applied                                                                         |                                                                   |
| disabled      | no  | bool     | Input is disabled                                                                               | false                                                             |
| error         | no  | string   | Error message                                                                                   |                                                                   |
| hint          | no  | string   | Help message below the autocomplete                                                             |                                                                   |
| floatingLabel | no  | bool     | Floating label inside the input field                                                           | true                                                              |
| label         | no  | string   | The text string to use for HTML label tag                                                       |                                                                   |
| multiline     | no  | bool     | Enable or disable multiline                                                                     |                                                                   |
| placeholder   | no  | string   | Short hint that describes the expected value of the input field                                 |                                                                   |
| prefix        | no  | string   | Button group                                                                                    |                                                                   |
| readOnly      | no  | bool     | Input is read-only                                                                              | false                                                             |
| required      | no  | bool     | Set the field to required                                                                       | false                                                             |
| suffix        | no  | string   | Button group                                                                                    |                                                                   |
| value         | no  | string   | Default value                                                                                   |                                                                   |
