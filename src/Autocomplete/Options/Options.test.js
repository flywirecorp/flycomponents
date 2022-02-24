import React from 'react';
import { render } from '@testing-library/react';
import Options from './Options';

describe('Options', () => {
  test('renders passed children', () => {
    const { getByText } = render(<Options>Some option</Options>);

    expect(getByText(/some option/i)).toBeTruthy();
  });
});
