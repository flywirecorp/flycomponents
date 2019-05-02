import { format } from './formatter';

describe('format', () => {
  test('returns same text if text is undefined', () => {
    const pattern = '+.. ... ... ...';
    const options = { pattern };
    const text = format(undefined, options);
    const expectedText = undefined;

    expect(text).toBe(expectedText);
  });

  test('returns same text if text is blank', () => {
    const pattern = '+.. ... ... ...';
    const options = { pattern };
    const text = format('', options);
    const expectedText = '';

    expect(text).toBe(expectedText);
  });

  test('returns same text if no pattern', () => {
    const text = format('text');
    const expectedText = 'text';

    expect(text).toBe(expectedText);
  });

  test('returns a formatted text', () => {
    const pattern = '+. (...) ...-....';
    const options = { pattern };
    const text = format('16666666666', options);
    const expectedText = '+1 (666) 666-6666';

    expect(text).toBe(expectedText);
  });

  test('returns a partial formatted text', () => {
    const pattern = '../../....';
    const options = { pattern };
    const text = format('1212', options);
    const expectedText = '12/12';

    expect(text).toBe(expectedText);
  });

  test('ignores exceding text', () => {
    const pattern = '../../....';
    const options = { pattern };
    const text = format('121220120', options);
    const expectedText = '12/12/2012';

    expect(text).toBe(expectedText);
  });

  test('appends exceding text', () => {
    const pattern = '../../....';
    const options = { pattern, ignoreExcedingText: false };
    const text = format('121220120', options);
    const expectedText = '12/12/20120';

    expect(text).toBe(expectedText);
  });

  describe('shouldAddSeparatorBeforeTyping', () => {
    test('does not add separator if it is the next character when it is false', () => {
      const pattern = '../..';
      const options = { pattern, shouldAddSeparatorBeforeTyping: false };
      const expectedText = '12';

      const text = format('12', options);

      expect(text).toEqual(expectedText);
    });

    test('add separator if it is the next character when it is true', () => {
      const pattern = '../..';
      const options = { pattern, shouldAddSeparatorBeforeTyping: true };
      const expectedText = '12/';

      const text = format('12', options);

      expect(text).toEqual(expectedText);
    });
  });

  describe('allowedCharacters', () => {
    test('allows to enter allowed characters', () => {
      const options = { allowedCharacters: /[a-z]/g };
      const expectedText = 'abc';

      const text = format('abc', options);

      expect(text).toEqual(expectedText);
    });

    test('removes not allowed characters', () => {
      const options = { allowedCharacters: /[a-z]/g };
      const expectedText = 'a';

      const text = format('1a', options);

      expect(text).toEqual(expectedText);
    });

    test('allows any digit by default', () => {
      const expectedText = '1a-2';

      const text = format('1a-2', {});

      expect(text).toEqual(expectedText);
    });
  });
});
