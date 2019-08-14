import { getCardType } from '../card';

const UNIONPAY_CODE = 'UNIONPAY';
export const validateCardNumber = (creditCardNumber, acceptedCards = []) => {
  if (acceptedCards.includes(UNIONPAY_CODE)) return true;

  const cardType = getCardType(creditCardNumber);
  if (!cardType) return false;

  return validLunhCheck(creditCardNumber);
};

export const validateCardType = (creditCardNumber, acceptedCards) => {
  if (acceptedCards.includes(UNIONPAY_CODE)) return true;

  const cardType = getCardType(creditCardNumber);

  return acceptedCards.includes(cardType);
};

export const getCardError = (creditCardNumber, acceptedCards) => {
  const cardType = getCardType(creditCardNumber);
  if (!cardType) return 'invalid';

  if (!validLunhCheck(creditCardNumber)) return 'invalid';

  if (!acceptedCards.includes(cardType)) return 'unsuppported_card';
};

const validLunhCheck = value => {
  if (/[^0-9-\s]+/.test(value)) return false;

  let nCheck = 0;
  let nDigit = 0;
  let bEven = false;
  value = value.replace(/\D/g, '');

  for (let n = value.length - 1; n >= 0; n--) {
    const cDigit = value.charAt(n);

    nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};

export const validateExpirationDate = expirationDateInput => {
  const expirationDate =
    typeof expirationDateInput === 'string'
      ? expirationDateInput
      : (expirationDateInput.value || '').trim();

  return (
    isValidFormat(expirationDate) &&
    isValidMonth(expirationDate) &&
    isFutureDate(expirationDate)
  );
};

export const validateCvvInput = (cvvNumber, cardType) => {
  const cvvMaxLength = cardType === 'AMEX' ? 4 : 3;
  return cvvNumber.toString().length === cvvMaxLength;
};

const isValidFormat = expirationDate => {
  const expireDateRegexp = /^[0-9]{2}\/[0-9]{2}$/g;

  return expireDateRegexp.test(expirationDate);
};

const isValidMonth = expirationDate => {
  const parts = expirationDate.split('/');
  const month = parseInt(parts[0]);

  return month > 0 && month <= 12;
};

const isFutureDate = expirationDate => {
  const parts = expirationDate.split('/');
  const month = parseInt(parts[0]);
  const year = parseInt(parts[1]);
  const now = new Date(Date.now());
  const today = new Date(now.getFullYear(), now.getMonth());
  const expiration = new Date(`20${year}`, month);

  return expiration >= today;
};
