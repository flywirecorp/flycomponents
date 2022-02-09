import React from 'react';
import { Heading } from './Heading';
import { render } from '@testing-library/react';

describe('Heading', () => {
  describe('render', () => {
    test('show the default component', () => {
      const { container } = render(<Heading />);

      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('h1')).toHaveClass(
        'Heading Heading--huge'
      );
    });

    test('shows the sent text to the component', () => {
      const text = 'a_text';

      const { getByText } = render(<Heading>{text}</Heading>);

      expect(getByText(text)).toBeInTheDocument();
    });

    test('shows a large component when type large is sent', () => {
      const size = 'large';

      const { container } = render(<Heading size={size} />);

      expect(container.querySelector('h1')).toHaveClass(
        'Heading Heading--large'
      );
    });

    test('customizes heading tag', () => {
      const tag = 'h5';

      const { container } = render(<Heading as={tag} />);

      expect(container.querySelector('h5')).toBeInTheDocument();
    });

    test('shows error when invalid heading tag', () => {
      const invalidTag = 'p';
      const err = console.error;
      console.error = jest.fn();
      let actual;

      try {
        render(<Heading as={invalidTag} />);
      } catch (error) {
        actual = error.message;
      }

      expect(actual).toEqual('Unsupported type');

      console.error = err;
    });

    test('merges classNames sent with their default classes', () => {
      const customClass = 'custom-class';

      const { container } = render(<Heading className={customClass} />);

      expect(container.querySelector('h1')).toHaveClass(
        `Heading Heading--huge ${customClass}`
      );
    });

    test('adds custom attributes', () => {
      const id = 'custom';

      const { getByTestId } = render(<Heading data-testid={id} />);

      expect(getByTestId(id)).toBeInTheDocument();
    });
  });
});
