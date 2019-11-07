import React from 'react';
import { shallow } from 'enzyme';
import Options from './Options';

describe('Options', () => {
  test('renders children when passed in', () => {
    const component = shallow(
      <Options id="my-options">
        <h1>An option</h1>
      </Options>
    );

    expect(component.contains('An option')).toBe(true);
  });
});
