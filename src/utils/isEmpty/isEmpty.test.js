import isEmpty from './isEmpty';

describe('isEmpty', () => {
  test('return true when null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('return true when undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('return false when not empty', () => {
    expect(isEmpty('foo')).toBe(false);
  });
});
