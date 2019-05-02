export const AMEX_VAULT = 'AMEX';
export const VISA_VAULT = 'VISA';
export const MASTERCARD_VAULT = 'MC';

export const getCardType = cardNumber => {
  const cardPatterns = [
    {
      vaultKey: AMEX_VAULT,
      pat: /^(34|37)[0-9]{13}$/
    },
    {
      vaultKey: MASTERCARD_VAULT,
      pat: /^5[1-5][0-9]{14}$/
    },
    {
      vaultKey: VISA_VAULT,
      pat: /^4([0-9]{15}|[0-9]{12})$/
    }
  ];

  const cardType = cardPattern =>
    cardPattern.pat.test(cardNumber.replace(/ |-/g, ''));

  const card = cardPatterns.find(cardType);

  return card && card.vaultKey;
};
