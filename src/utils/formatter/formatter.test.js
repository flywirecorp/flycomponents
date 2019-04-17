import { applyPattern } from './formatter';

describe('applyPattern', () => {
  test('returns same text if text is undefined', () => {
    const pattern = '+.. ... ... ...';
    const text = applyPattern(undefined, pattern);
    const expectedText = undefined;

    expect(text).toBe(expectedText);
  });

  test('returns same text if text is blank', () => {
    const pattern = '+.. ... ... ...';
    const text = applyPattern('', pattern);
    const expectedText = '';

    expect(text).toBe(expectedText);
  });

  test('returns same text if no pattern', () => {
    const text = applyPattern('text');
    const expectedText = 'text';

    expect(text).toBe(expectedText);
  });

  test('returns a formatted text', () => {
    const pattern = '+. (...) ...-....';
    const text = applyPattern('16666666666', pattern);
    const expectedText = '+1 (666) 666-6666';

    expect(text).toBe(expectedText);
  });

  test('returns a partial formatted text', () => {
    const pattern = '../../....';
    const text = applyPattern('1212', pattern);
    const expectedText = '12/12';

    expect(text).toBe(expectedText);
  });

  test('ignores exceding text', () => {
    const pattern = '../../....';
    const text = applyPattern('121220120', pattern);
    const expectedText = '12/12/2012';

    expect(text).toBe(expectedText);
  });

  test('appends exceding text', () => {
    const pattern = '../../....';
    const text = applyPattern('121220120', pattern, {
      ignoreExcedingText: false
    });
    const expectedText = '12/12/20120';

    expect(text).toBe(expectedText);
  });

  describe('shouldAddSeparatorBeforeTyping', () => {
    test('does not add separator if it is the next character when it is false', () => {
      const pattern = '../..';
      const expectedText = '12';

      const text = applyPattern('12', pattern, {
        shouldAddSeparatorBeforeTyping: false
      });

      expect(text).toEqual(expectedText);
    });

    test('add separator if it is the next character when it is true', () => {
      const pattern = '../..';
      const expectedText = '12/';

      const text = applyPattern('12', pattern, {
        shouldAddSeparatorBeforeTyping: true
      });

      expect(text).toEqual(expectedText);
    });
  });
});
