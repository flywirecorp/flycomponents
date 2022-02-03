import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders its children', () => {
    const { getByText } = render(<Header>some content</Header>);

    expect(getByText(/some content/i)).toBeInTheDocument();
  });

  describe('when clicked', () => {
    it('sets the section as active', () => {
      const setActive = jest.fn();

      const { getByText } = render(
        <Header setActive={setActive}>Some header</Header>
      );
      const header = getByText(/some header/i);
      fireEvent.click(header);

      expect(setActive).toHaveBeenCalled();
    });
  });
});
