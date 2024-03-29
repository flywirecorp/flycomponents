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

    test('returns UNIONPAY if is a UnionPay card number', () => {
      const unionpayCardNumber = '6204112013151257';

      expect(getCardType(unionpayCardNumber)).toEqual('UNIONPAY');
    });

    test('returns undefined if is not of a supported type', () => {
      const visaCardNumber = '2123456789123';

      expect(getCardType(visaCardNumber)).toBeUndefined();
    });

    test('returns jcb if is a JCB card number', () => {
      const jcbCardNumber = '3530111333300000';

      expect(getCardType(jcbCardNumber)).toEqual('JCB');
    });

    test('returns DISC if is a Discover card number', () => {
      const discoverCardNumbers = [
        '6011601160116611',
        '6444111122223333',
        '6570123412341234'
      ];
      discoverCardNumbers.forEach(discoverCardNumber => {
        expect(getCardType(discoverCardNumber)).toEqual('DISC');
      });
    });
  });
});
