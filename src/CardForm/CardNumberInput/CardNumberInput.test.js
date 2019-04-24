import React from 'react';
import { shallow } from 'enzyme';
import CardNumberInput from './CardNumberInput';
import TextInput from '../TextInput';

describe('CardNumberInput', () => {
  describe('renders', () => {
    test('a TextInput with all the passed props', () => {
      const props = { name: 'a_name', propA: 'propA', propB: 'propB' };
      const wrapper = shallow(<CardNumberInput {...props} />);

      const textInput = wrapper.find(TextInput);

      expect(textInput.props()).toEqual(expect.objectContaining(props));
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
