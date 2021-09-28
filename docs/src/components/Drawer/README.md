# Drawer

Drawer element

## Example uncontrolled modal

```javascript
function App() (
  const [isOpen, setIsOpen] = React.useState(false);

  <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <h1>Drawer dialog content</h1>
    <form
      onSubmit={evt => {
        evt.preventDefault();
        setIsOpen(false);
      }}
    >
      First name: <input type="text" name="fname" />
      <br />
      Last name: <input type="text" name="lname" />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  </Drawer>
);
```

## Example controlled modal

```javascript
```

## Properties

| Property        | Req | Type                  | Description                                                                                       | Default |
| --------------- | --- | --------------------- | ------------------------------------------------------------------------------------------------- | ------- |
| children        | yes | node                  | Children node                                                                                     |         |
| className       | no  | string                | CSS class to be applied to Modal                                                                  |         |
| closeButtonText | no  | string                | Close button text                                                                                 |         |
| closeLabel      | no  | string                | Close button label text                                                                           | Close   |
| isOpen          | yes | bool                  | Drawer visibility                                                                                 | false   |
| onClose         | no  | function              | Callback function that is fired when modal is closed. Only works when `allowClosing` is true.     |         |
