import React from 'react';
import Options from './Options';
import { render } from '@testing-library/react';

describe('Options', () => {
  test('renders children when passed in', () => {
    const { getByText } = render(
      <Options name="test">
        <h1>An option</h1>
      </Options>
    );

    expect(getByText(/an option/i)).toBeInTheDocument();
  });
});
