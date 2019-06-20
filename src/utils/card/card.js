export const AMEX = 'AMEX';
export const VISA = 'VISA';
export const MASTERCARD = 'MC';
export const UNIONPAY = 'UNIONPAY';

export const getCardType = cardNumber => {
  const cardPatterns = [
    {
      vaultKey: AMEX,
      pat: /^(34|37)[0-9]{13}$/
    },
    {
      vaultKey: MASTERCARD,
      pat: /^5[1-5][0-9]{14}$/
    },
    {
      vaultKey: VISA,
      pat: /^4([0-9]{15}|[0-9]{12})$/
    },
    {
      vaultKey: UNIONPAY,
      pat: /^62([0-9]{14,17})$/
    }
  ];

  const cardType = cardPattern =>
    cardPattern.pat.test(cardNumber.replace(/ |-/g, ''));

  const card = cardPatterns.find(cardType);

  return card && card.vaultKey;
};
