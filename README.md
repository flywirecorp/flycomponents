# Flycomponents

Flycomponents is a set a react UI components used to create payment forms in Flywire.

## Installation

Flycomponents is a private repository and haven't been published to npm yet, so to add the dependency to your project you have to add to your `package.json`:

```javascript
"flycomponents": "git+https://<github_token>:x-oauth-basic@github.com/peertransfer/flycomponents.git/<version>"
```

## Create a new release

To create a new release, make all the changes that you need and commit them, then execute:

```bash
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
```
For example:

```bash
npm version patch
```
This will bump the `package.json` version, build a new bundle, commit and push the changes tagging them to a new release.

## Components

- Autocomplete
- Button
- Datepicker
- [FormGroup](#formgroup)
- Input
- InputGroup
- Label
- [MoneyInput](#moneyinput)
- PhoneInput
- Select
- Textarea
- TextInput

### FormGroup
Wraps a form field. Adds a label, display errors and help texts.

**Requires**: `Label`.

| Property       | Req | Type     | Description                          | Default |
|----------------|-----|----------|--------------------------------------|---------|
| children       | yes | node     | Children node                        |         |
| className      | no  | string   | Rewrite default CSS class            |         |
| error          | no  | string   | Shows the error message              |         |
| hint           | no  | string   | Shows help message                   |         |
| label          | no  | string   | Label tag text                       |         |
| name           | yes | string   | Name and id of the children          |         |
| required       | no  | bool     | Set the field to required            | false   |

##### Example

```javascript
<FormGroup name='amount' label='* Payment Amount' className='FormGroup GridColumn'>
  <MoneyInput name='amount' />
</FormGroup>
```

### MoneyInput

`MoneyInput` is a input field to type a money amount. This amount is autoformated when the user types and follow and can be configurated to follow a currency standard.
By default the format is set to follow USD standard.

**Requires**: `InputGroup`.

| Property              | Req | Type           | Description                                         | Default value |
|-----------------------|-----|----------------|-----------------------------------------------------|---------------|
| currencySymbol        | no  | string         | Currency symbol                                     | `"$"`         |
| decimalMark           | no  | string         | How decimal are marked                              | `"."`         |
| maxLength             | no  | string, number | Input max length                                    | `9`           |
| name                  | yes | string         | Input `name` and `id`                               |               |
| onBlur(name, amount)  | no  | func           | Function executed on blur                           |               |
| onChange(name, amount)| no  | func           | Function executed when the value changes            |               |
| subunitToUnit         | no  | number         | Conversion to minimun unit                          | `100`         |
| symbolFirst           | no  | bool           | The currency symbol goes before or after the amount | `true`        |
| thousandsSeparator    | no  | string         | Thousands separator                                 | `","`         |
| value                 | no  | number, string | The input value                                     |               |

##### Example

```javascript
// European format
<MoneyInput currencySymbol='€' name='amount' decimalMark=',' symbolFirst={false} thousandsSeparator='.' />
```
