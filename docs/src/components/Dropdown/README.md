# Dropdown

Dropdown element

## Example file input

```javascript
const options = [
  { label: 'Spanish', value: 'spanish' },
  { label: 'English', value: 'english' },
  { label: 'French', value: 'french' }
];

const getA11yStatusMessage = ({
    isOpen,
    options = [],
    selectedOption = {}
    }) => {
  const isClosed = !isOpen;
  const { label: selectedLabel } = selectedOption;

  if (isClosed) {
    return `${selectedLabel} is selected.`;
  }

  const resultCount = options.length;

  return `${resultCount} ${
    resultCount === 1 ? 'option is' : 'options are'
  } available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.`;
};

const template = ({ label, lang, ...restProps }) => {
  return (
    <li {...restProps} lang={lang}>
      {label}
    </li>
  );
};

<Dropdown
 options={options}
 className="textAlign-right"
 defaultValue="spanish"
 getA11yStatusMessage={getA11yStatusMessage}
 template={template}
/>
```

## Properties

| Property    | Req | Type     | Description                                          | Default           |
| ------------| --- | ---------| ---------------------------------------------------- | ----------------- |
| className   | no  | string   | CSS class                                            | ""                |
| getA11yStatusMessage| no  | func   | Default messages provided in English | "`x` options are available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel." or "`x` is selected" |
| name        | no | string | The name of the element                                             | `dropdown` |
| onChange    | no  | function | Function to call on file change                      | {}                |
| options     | yes | array    | List of childs                                       | []                |
| template            | no  | func   | Callback function that returns a JSX template to represent the option |          |
| upward      | no  | boolean  | `true` if it opens from bottom                       | `false`           |
