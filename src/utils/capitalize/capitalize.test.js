import capitalize from './capitalize';

describe('capitalize', () => {
  test('uppercases first letter of a string', () => {
    expect(capitalize('flavio')).toEqual('Flavio');
    expect(capitalize('f')).toEqual('F');
  });
});
