import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CardNumberInput from './CardNumberInput';
import userEvent from '@testing-library/user-event';

describe('CardNumberInput', () => {
  userEvent.setup();

  describe('renders', () => {
    test('a TextInput with all the passed props', () => {
      const props = { name: 'a_name', prop_a: 'propA', prop_b: 'propB' };
      const { getByRole } = render(<CardNumberInput {...props} />);

      const input = getByRole('textbox');

      expect(input).toHaveAttribute('name', 'a_name');
      expect(input).toHaveAttribute('prop_a', 'propA');
      expect(input).toHaveAttribute('prop_b', 'propB');
    });

    test('a TextInput witht the provided className', () => {
      const props = { name: 'a_name', className: 'a_className' };
      const { container } = render(<CardNumberInput {...props} />);

      expect(container.firstChild.classList.contains('a_className')).toBe(true);
    });
  });

  describe('when no format prop is passed', () => {
    it('defaults to ....-....-....-.... only allowing numbers', async () => {
      render(<CardNumberInput name="cardInput" label="Card Input" />);

      const cardInput = screen.getByRole('textbox', { name: /Card input/i });
      await userEvent.type(cardInput, '1111-vvvv-aaaa-bbbb');

      expect(cardInput).toHaveValue('1111-');
    });
  });

  describe('when format prop is passed', () => {
    it('adapts to it', async () => {
      const format = {
        pattern: '...',
        allowedCharacters: /[0-9]*/g
      };
      render(
        <CardNumberInput name="cardInput" label="Card Input" format={format} />
      );

      const cardInput = screen.getByRole('textbox', { name: /Card input/i });
      await userEvent.type(cardInput, '111');

      expect(cardInput).toHaveValue('111');
    });
  });

  describe('onChange', () => {
    test('calls the passed onChange callback when on change', async () => {
      const onChange = jest.fn();
      const name = 'a_name';
      const value = '123';
      const { getByRole } = render(
        <CardNumberInput name={name} onChange={onChange} />
      );

      const input = getByRole('textbox');
      fireEvent.change(input, { target: { value: value } });

      expect(onChange).toHaveBeenCalledWith(name, value);
    });

    describe('adds a className ', () => {
      const cardTypes = [
        ['visa', '4111111111111111'],
        ['mc', '5340762276893578'],
        ['amex', '378953407816481']
      ];

      test.each(cardTypes)(
        'to identify the card type %s',
        (cardType, cardNumber) => {
          const name = 'a_name';
          const { container, getByRole } = render(
            <CardNumberInput name={name} />
          );

          const input = getByRole('textbox');
          fireEvent.change(input, { target: { value: cardNumber } });

          expect(container.firstChild.classList.contains(cardType)).toBe(true);
        }
      );

      test('adds the card type className to the already passed on', () => {
        const name = 'a_name';
        const cardNumber = '4111111111111111';
        const cardType = 'visa';
        const className = 'a_className';
        const { container, getByRole } = render(
          <CardNumberInput name={name} className={className} />
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: cardNumber } });

        expect(container.firstChild.classList.contains(className)).toBe(true);
        expect(container.firstChild.classList.contains(cardType)).toBe(true);
      });

      test('cleans className when value is invalid', () => {
        const name = 'a_name';
        const validCardNumber = '4111111111111111';
        const cardType = 'visa';
        const invalidCardNumber = '4';
        const { container, getByRole } = render(
          <CardNumberInput name={name} />
        );

        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: validCardNumber } });
        fireEvent.change(input, { target: { value: invalidCardNumber } });

        expect(container.firstChild.classList.contains(cardType)).toBe(false);
      });
    });
  });
});
