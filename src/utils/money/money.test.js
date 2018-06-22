import { toCents, toMoney } from './money';

describe('toMoney', () => {
  test('adds thousands separator', () => {
    const options = { symbol: '$', subunitToUnit: 100, cents: false };
    const formattedMoney = toMoney(100001, options);
    const expectFormattedMoney = '$1,000';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });

  test('adds decimal mark', () => {
    const options = { symbol: '$', subunitToUnit: 100, cents: true };
    const formattedMoney = toMoney(100001, options);
    const expectFormattedMoney = '$1,000.01';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });

  test('adds symbol', () => {
    const options = { symbol: '€' };
    const formattedMoney = toMoney(100000, options);
    const expectFormattedMoney = '€1,000.00';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });

  test('adds controls of symbol position', () => {
    const options = { symbol: '€', symbolFirst: false };
    const formattedMoney = toMoney(100000, options);
    const expectFormattedMoney = '1,000.00 €';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });

  test('hides symbol', () => {
    const options = { symbol: false };
    const formattedMoney = toMoney(100000, options);
    const expectFormattedMoney = '1,000.00';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });

  test('adds controls of thousand separator', () => {
    const options = { symbol: '€', thousand: '.' };
    const formattedMoney = toMoney(100000, options);
    const expectFormattedMoney = '€1.000.00';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });

  test('adds controls of decimal separator', () => {
    const options = { symbol: '€', decimal: ',', cents: true };
    const formattedMoney = toMoney(10050, options);
    const expectFormattedMoney = '€100,50';

    expect(formattedMoney).toBe(expectFormattedMoney);
  });
});

describe('toCents', () => {
  test('converts money to cents', () => {
    const cents = toCents('10.00');
    const expectedCents = 1000;

    expect(cents).toBe(expectedCents);
  });

  test('adds controls of decimal separator', () => {
    const cents = toCents('€1.000', { decimal: ',' });
    const expectedCents = 100000;

    expect(cents).toBe(expectedCents);
  });

  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(i => {
    test('fixes floating point number precision in JavaScript', () => {
      const cents = toCents(`567.3${i}`);
      const expectedCents = 56730 + i;

      expect(cents).toBe(expectedCents);
    });
  });
});
