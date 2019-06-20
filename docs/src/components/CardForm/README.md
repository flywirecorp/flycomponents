# CardForm

Formulary to allow users to provide cards

## Example

```javascript
<CardForm />
```

## Properties

| Property      | Req | Type   | Description                                                                                                            | Default          |
| ------------- | --- | ------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------- |
| acceptedCards | no  | array  | List of accepted credit cards. Valid values: `VISA` (Visa), `MC` (Mastercard), `AMEX` (America Express), `UNIONPAY` (UnionPay) | `['VISA', 'MC']` |
| children      | no  | node   | Children node                                                                                                          |                  |
| errors        | no  | object | List of error messages (see `errors` table below)                                                                      |                  |
| labels        | no  | object | List of label messages (see `labels` table below)                                                                      |                  |
| onCancel      | no  | string | Callback to execute when clicking cancel button                                                                        |                  |
| onChange      | no  | string | Callback to execute when changing any form's value                                                                     |                  |
| onSubmit      | no  | string | Callback to execute when clicking submit button with the field values                                                  |                  |
| optionalFields      | no  | array | List of optional fields that will not be used in the form. Valid values: `name`, `surname`, `expiryDate`, `cvv`                                                  |                  |

### Label texts

| Property          | Req | Type   | Description                           | Default                                                      |
| ----------------- | --- | ------ | ------------------------------------- | ------------------------------------------------------------ |
| labels.name       | no  | string | Label for the name field              | `Cardholder's name`                                          |
| labels.surname    | no  | string | Label for the surname field           | `Cardholder's surname`                                       |
| labels.cardNumber | no  | string | Label for the card number field       | `Card number`                                                |
| labels.expiryDate | no  | string | Label for the expiration date field   | `Expiry date (MM/YY)`                                        |
| labels.cvv        | no  | string | Label for the cvv field               | `CVV`                                                        |
| labels.cvvTooltip | no  | string | Label for the cvv explanation tooltip | `3 digits in the back of your card or 4 digits in the front` |
| labels.submit     | no  | string | Label for the submit button           | `Submit`                                                     |
| labels.cancel     | no  | string | Label for the cancel button           | `Cancel`                                                     |

### Error texts

| Property          | Req | Type   | Description                                     | Default                                  |
| ----------------- | --- | ------ | ----------------------------------------------- | ---------------------------------------- |
| errors.name       | no  | string | Error message when the name is invalid          | `Invalid name`                           |
| errors.surname    | no  | string | Error message when the surname is invalid       | `Invalid surname`                        |
| errors.cardNumber | no  | string | Error message when the card number is invalid   | `Invalid card`                           |
| errors.cardType   | no  | string | Error message when the card type is not allowed | `Only Visa and Mastercard are supported` |
| errors.expiryDate | no  | string | Error message when the expiry date is invalid   | `Invalid expiration date`                |
| errors.cvv        | no  | string | Error message when the cvv is invalid           | `Invalid CVV number`                     |
