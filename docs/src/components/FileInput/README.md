# FileInput

FileInput element

## Example file input

```javascript
<FileInput
  accepts=".png, .jpg"
  buttonText="Upload a file"
  hint="This is the hint content"
/>
<FileInput buttonText="Upload multiple files" multiple />
<FileInput uploading />
```

## Properties

| Property    | Req | Type     | Description                                          | Default           |
| ------------| --- | ---------| ---------------------------------------------------- | ----------------- |
| accepts     | no  | string   | File extension accepted                              | ""                |
| className   | no  | string   | CSS class                                            | ""                |
| hint        | no  | string   | Hint text                                            |                   |
| onChange    | no  | function | Function to call on file change                      |                   |
| buttonText  | no  | string   | Button text                                          | "Upload"          |
| uploading   | no  | boolean  | `true` while uploading for button animation          | `false`           |
| multiple    | no  | boolean  | `true` to accept multiple files upload               | `false`           |
