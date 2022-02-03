import React from 'react';
import { render } from '@testing-library/react';
import Content from './Content';

describe('Content', () => {
  it('renders its children', () => {
    const { getByText } = render(<Content>some content</Content>);

    expect(getByText(/some content/i)).toBeInTheDocument();
  });
});
