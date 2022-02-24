import React from 'react';
import { render } from '@testing-library/react';
import Highlighter from './Highlighter';

describe('Highlighter', () => {
  test('highlights a substring in string', () => {
    const text = 'Hello World!';
    const subString = 'World';
    const ownProps = { subString, text };

    const { getByText } = render(<Highlighter {...ownProps} />);
    const highlightedText = getByText(/world/i);

    expect(highlightedText).toHaveClass('is-highlighted');
  });
});
