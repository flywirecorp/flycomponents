import React from 'react';
import { shallow } from 'enzyme';
import CVVInput from './CVVInput';
import TextInput from '../TextInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CVVInput', () => {
  describe('renders', () => {
    test('a TextInput with all the passed props', () => {
      const props = { name: 'a_name', propA: 'propA', propB: 'propB' };
      const wrapper = shallow(<CVVInput {...props} />);

      const textInput = wrapper.find(TextInput);

      expect(textInput.props()).toEqual(expect.objectContaining(props));
    });

    test('a TextInput with the provided className', () => {
      const props = { name: 'a_name', className: 'a_className' };
      const wrapper = shallow(<CVVInput {...props} />);

      const textInput = wrapper.find(TextInput);

      expect(textInput.hasClass('a_className')).toEqual(true);
    });

    test('a span with the question logo', () => {
      const props = { name: 'a_name' };
      const wrapper = shallow(<CVVInput {...props} />);

      expect(wrapper.find('#cvvInput-Label-Tooltip')).toHaveLength(1);
    });

    test('a span with the provided message', () => {
      const cvvTooltip = 'a_cvvTooltip';
      const props = { name: 'a_name', cvvTooltip };
      const wrapper = shallow(<CVVInput {...props} />);

      expect(wrapper.find('#cvvInput-Label-Tooltip').text()).toEqual(
        cvvTooltip
      );
    });
  });

  it('handles on focus events with its name', () => {
    const onFocus = jest.fn();
    const props = {
      label: 'CVV',
      name: 'cvv_field_name',
      cvvTooltip: 'tooltip',
      onFocus
    };

    render(<CVVInput {...props} />);

    userEvent.tab();

    expect(onFocus).toHaveBeenCalledWith('cvv_field_name');
  });

  describe('format', () => {
    test('when no format prop given defaults to 3/4 digits only', () => {
      const props = { label: 'CVV', name: 'cvv_field_name' };
      render(<CVVInput {...props} />);

      const input = screen.getByRole('textbox', { name: 'CVV' });
      userEvent.type(
        input,
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/.,><?+_=-!@#$%^&*()|'
      );

      expect(input).toHaveValue('');
    });

    test('when format prop given set the format of the input ', () => {
      const props = {
        label: 'CVV',
        name: 'cvv_field_name',
        format: { pattern: '.....', allowedCharacters: /[a-z]*/g }
      };
      render(<CVVInput {...props} />);

      const input = screen.getByRole('textbox', { name: 'CVV' });
      userEvent.type(input, 'abcde');

      expect(input).toHaveValue('abcde');
    });
  });

  describe('tooltip', () => {
    test('shows the tooltip while the input is focused', () => {
      const wrapper = shallow(<CVVInput name="a_name" />);
      const textInput = wrapper.find(TextInput);

      wrapper.find('#cvvInput-Label-Tooltip').hasClass('opacity-0');

      textInput.simulate('focus');
      wrapper.find('#cvvInput-Label-Tooltip').hasClass('opacity-1');

      textInput.simulate('blur');
      wrapper.find('#cvvInput-Label-Tooltip').hasClass('opacity-0');
    });
  });
});
