import { getAriaDescribedBy } from './aria';

describe('getAriaDescribedBy', () => {
  test('shows default properties if not sent', () => {
    const name = 'name';

    const result = getAriaDescribedBy(name);

    expect(result).toEqual('name-error-msg name-hint-msg');
  });

  test('merges the properties', () => {
    const name = 'name';
    const extraAriaLabel = 'wadus';

    const result = getAriaDescribedBy(name, extraAriaLabel);

    expect(result).toEqual('wadus name-error-msg name-hint-msg');
  });
});
