import {
  validateCvvInput,
  validateExpirationDate,
  validateCardNumber,
  validateCardType
} from './validators';

describe('validators', () => {
  describe.each`
    cardType      | cardNumber            | expectedResult
    ${'VISA'}     | ${'4888561607586807'} | ${true}
    ${'MC'}       | ${'5145320070972135'} | ${true}
    ${'AMEX'}     | ${'377890057846155'}  | ${true}
    ${'UNIONPAY'} | ${'6204112013151257'} | ${true}
    ${'invalid'}  | ${'121'}              | ${false}
    ${'empty'}    | ${''}                 | ${false}
  `('validateCardNumber', ({ cardType, cardNumber, expectedResult }) => {
    test(`returns ${expectedResult} when card is ${cardType}`, () => {
      expect(validateCardNumber(cardNumber, [])).toBe(expectedResult);
    });
  });

  describe('validateCardNumber', () => {
    test('does not validate number if accepted card is from UPOP', () => {
      const cardNumber = '4111';

      expect(validateCardNumber(cardNumber, ['UNIONPAY'])).toBe(true);
    });
  });

  describe('validateCardType', () => {
    test('returns true if card type is accepted', () => {
      const acceptedCards = ['VISA', 'MC'];
      const visaCard = '4888561607586807';

      expect(validateCardType(visaCard, acceptedCards)).toBe(true);
    });

    test('returns false if card type is not accepted', () => {
      const acceptedCards = ['VISA', 'MC'];
      const amexCard = '377890057846155';

      expect(validateCardType(amexCard, acceptedCards)).toBe(false);
    });

    test('does not validate if accepted card is UPOP', () => {
      const acceptedCards = ['UNIONPAY'];
      const card = '4111';

      expect(validateCardType(card, acceptedCards)).toBe(true);
    });
  });

  describe('validateExpirationDate', () => {
    let dateNowSpy;

    beforeAll(() => {
      dateNowSpy = jest
        .spyOn(Date, 'now')
        .mockImplementation(() => 1550153966208);
    });

    afterAll(() => {
      dateNowSpy.mockReset();
      dateNowSpy.mockRestore();
    });

    test('returns false if expiration date format is not correct', () => {
      const expirationDate = { value: '113/21' };
      expect(validateExpirationDate(expirationDate)).toBeFalsy();
    });

    test('returns false if month is incorrect', () => {
      const expirationDate = { value: '13/21' };

      expect(validateExpirationDate(expirationDate)).toBeFalsy();
    });

    test('returns false if expiration date is past', () => {
      const expirationDate = { value: '11/18' };

      expect(validateExpirationDate(expirationDate)).toBeFalsy();
    });

    test('returns true if expiration date is future', () => {
      const expirationDate = { value: '11/20' };

      expect(validateExpirationDate(expirationDate)).toBeTruthy();
    });
  });

  describe('validateCvvInput', () => {
    test('returns true if card is not AMEX and CVV length is 3', () => {
      const cardType = 'VISA';
      const cvvNumber = 123;

      expect(validateCvvInput(cvvNumber, cardType)).toBeTruthy();
    });

    test('returns true if card is AMEX and CVV lenght is 4', () => {
      const cardType = 'AMEX';
      const cvvNumber = 1234;

      expect(validateCvvInput(cvvNumber, cardType)).toBeTruthy();
    });

    test('returns false otherwise', () => {
      const cardType = 'VISA';
      const cvvNumber = 1234;

      expect(validateCvvInput(cvvNumber, cardType)).toBeFalsy();
    });
  });
});
