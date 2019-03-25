# Dropdown

Dropdown element

## Example file input

```javascript
<Dropdown
 options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
 ]
 className="textAlign-right" 
 defaultValue="option1"
/>
```

## Properties

| Property    | Req | Type     | Description                                          | Default           |
| ------------| --- | ---------| ---------------------------------------------------- | ----------------- |
| className   | no  | string   | CSS class                                            | ""                |
| onChange    | no  | function | Function to call on file change                      | {}                |
| options     | yes | array    | List of childs                                       | []                |
| upward      | no  | boolean  | `true` if it opens from bottom                       | `false`           |
