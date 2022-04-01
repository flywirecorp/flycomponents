import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CVVInput from './CVVInput';
import userEvent from '@testing-library/user-event';

describe('CVVInput', () => {
  userEvent.setup();

  describe('renders', () => {
    test('a TextInput with all the passed props', () => {
      const props = { name: 'a_name', prop_a: 'propA', prop_b: 'propB' };
      const { getByRole } = render(<CVVInput {...props} />);

      const input = getByRole('textbox');

      expect(input).toHaveAttribute('name', 'a_name');
      expect(input).toHaveAttribute('prop_a', 'propA');
      expect(input).toHaveAttribute('prop_b', 'propB');
    });

    test('a TextInput with the provided className', () => {
      const props = { name: 'a_name', className: 'a_className' };
      const { container } = render(<CVVInput {...props} />);

      expect(container.firstChild.classList.contains('a_className')).toBe(true);
    });

    test('a span with the question logo', () => {
      const props = { name: 'a_name' };
      const { container } = render(<CVVInput {...props} />);

      expect(
        container.firstChild.children[2].className.includes(
          'cvvInput-Label-Tooltip'
        )
      ).toBe(true);
    });

    test('a span with the provided message', () => {
      const cvvTooltip = 'a_cvvTooltip';
      const props = { name: 'a_name', cvvTooltip };
      render(<CVVInput {...props} />);

      expect(screen.queryByText(cvvTooltip)).toBeInTheDocument();
    });
  });

  it('handles on focus events with its name', async () => {
    const onFocus = jest.fn();
    const props = {
      label: 'CVV',
      name: 'cvv_field_name',
      cvvTooltip: 'tooltip',
      onFocus
    };

    render(<CVVInput {...props} />);

    await userEvent.tab();

    expect(onFocus).toHaveBeenCalledWith('cvv_field_name');
  });

  describe('format', () => {
    test('when no format prop given defaults to 3/4 digits only', async () => {
      const props = { label: 'CVV', name: 'cvv_field_name' };
      render(<CVVInput {...props} />);

      const input = screen.getByRole('textbox', { name: 'CVV' });
      await userEvent.type(
        input,
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/.,><?+_=-!@#$%^&*()|'
      );

      expect(input).toHaveValue('');
    });

    test('when format prop given set the format of the input ', async () => {
      const props = {
        label: 'CVV',
        name: 'cvv_field_name',
        format: { pattern: '.....', allowedCharacters: /[a-z]*/g }
      };
      render(<CVVInput {...props} />);

      const input = screen.getByRole('textbox', { name: 'CVV' });
      await userEvent.type(input, 'abcde');

      expect(input).toHaveValue('abcde');
    });
  });

  describe('tooltip', () => {
    test('shows the tooltip while the input is focused', () => {
      const { container, getByRole } = render(<CVVInput name="a_name" />);
      const input = getByRole('textbox');

      expect(
        container.firstChild.children[2].className.includes('opacity-0')
      ).toBe(true);

      fireEvent.focus(input);
      expect(
        container.firstChild.children[2].className.includes('opacity-1')
      ).toBe(true);

      fireEvent.blur(input);
      expect(
        container.firstChild.children[2].className.includes('opacity-0')
      ).toBe(true);
    });
  });
});
