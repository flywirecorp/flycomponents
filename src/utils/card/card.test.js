import { getCardType } from './card';

describe('card', () => {
  describe('getCardType', () => {
    test('returns AMEX if is an AMEX card number', () => {
      const amexCardNumber = '341234567891234';

      expect(getCardType(amexCardNumber)).toEqual('AMEX');
    });

    test('returns MC if is a Mastercard card number', () => {
      const mcCardNumber = '5512345678912345';

      expect(getCardType(mcCardNumber)).toEqual('MC');
    });

    test('returns VISA if is a Visa card number', () => {
      const visaCardNumber = '4123456789123';

      expect(getCardType(visaCardNumber)).toEqual('VISA');
    });

    test('returns undefined if is not of a supported type', () => {
      const visaCardNumber = '2123456789123';

      expect(getCardType(visaCardNumber)).toBeUndefined();
    });
  });
});
