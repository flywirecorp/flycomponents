# FileInput

FileInput element

## Example file input

```javascript
<FileInput
  placeholder="Choose a file"
  submit="Upload file"
  hint="This is the hint content"
/>

<FileInput placeholder="Choose multiple files" multiple />

<FileInput uploading />
```

## Properties

| Property    | Req | Type     | Description                                          | Default           |
| ------------| --- | ---------| ---------------------------------------------------- | ----------------- |
| accepts     | no  | string   | File extension accepted                              | ""                |
| browse      | no  | string   | Browse button text                                   | "Browse"          |
| hint        | no  | string   | Hint text                                            |                   |
| onChange    | no  | function | Function to call on file change                      |                   |
| onSubmit    | no  | function | Function to call on submit the file                  |                   |
| placeholder | no  | string   | Input placeholder text                               | "Choose document" |
| submit      | no  | string   | Submit button text                                   | "Upload"          |
| uploading   | no  | boolean  | `true` while uploading for button animation          | `false`           |
| multiple    | no  | boolean  | `true` to accept multiple files upload               | `false`           |
