import React from 'react';
import { shallow } from 'enzyme';
import CardNumberInput from './CardNumberInput';
import TextInput from '../TextInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CardNumberInput', () => {
  describe('renders', () => {
    test('a TextInput with all the passed props', () => {
      const props = { name: 'a_name', propA: 'propA', propB: 'propB' };
      const wrapper = shallow(<CardNumberInput {...props} />);

      const textInput = wrapper.find(TextInput);

      expect(textInput.props()).toEqual(expect.objectContaining(props));
    });

    test('a TextInput witht the provided className', () => {
      const props = { name: 'a_name', className: 'a_className' };
      const wrapper = shallow(<CardNumberInput {...props} />);

      expect(wrapper.find(TextInput).hasClass('a_className')).toEqual(true);
    });
  });

  describe('when no format prop is passed', () => {
    it('defaults to ....-....-....-.... only allowing numbers', () => {
      render(<CardNumberInput name="cardInput" label="Card Input" />);

      const cardInput = screen.getByRole('textbox', { name: /Card input/i });
      userEvent.type(cardInput, '1111-vvvv-aaaa-bbbb');

      expect(cardInput).toHaveValue('1111-');
    });
  });

  describe('when format prop is passed', () => {
    it('adapts to it', () => {
      const format = {
        pattern: '...',
        allowedCharacters: /[0-9]*/g
      };
      render(
        <CardNumberInput name="cardInput" label="Card Input" format={format} />
      );

      const cardInput = screen.getByRole('textbox', { name: /Card input/i });
      userEvent.type(cardInput, '111');

      expect(cardInput).toHaveValue('111');
    });
  });

  describe('onChange', () => {
    test('calls the passed onChange callback when on change', () => {
      const onChange = jest.fn();
      const name = 'a_name';
      const value = 'a_value';
      const wrapper = shallow(
        <CardNumberInput name={name} onChange={onChange} />
      );

      wrapper.simulate('change', name, value);

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
          const wrapper = shallow(<CardNumberInput name={name} />);

          const textInput = wrapper.find(TextInput);
          textInput.simulate('change', name, cardNumber);

          expect(wrapper.find(TextInput).hasClass(cardType)).toEqual(true);
        }
      );

      test('adds the card type className to the already passed on', () => {
        const name = 'a_name';
        const cardNumber = '4111111111111111';
        const cardType = 'visa';
        const className = 'a_className';
        const wrapper = shallow(
          <CardNumberInput name={name} className={className} />
        );

        const textInput = wrapper.find(TextInput);
        textInput.simulate('change', name, cardNumber);

        expect(wrapper.find(TextInput).hasClass(className)).toEqual(true);
        expect(wrapper.find(TextInput).hasClass(cardType)).toEqual(true);
      });

      test('cleans className when value is invalid', () => {
        const name = 'a_name';
        const validCardNumber = '4111111111111111';
        const cardType = 'visa';
        const invalidCardNumber = '4';
        const wrapper = shallow(<CardNumberInput name={name} />);

        const textInput = wrapper.find(TextInput);
        textInput.simulate('change', name, validCardNumber);
        textInput.simulate('change', name, invalidCardNumber);

        expect(wrapper.find(TextInput).hasClass(cardType)).not.toEqual(true);
      });
    });
  });
});
