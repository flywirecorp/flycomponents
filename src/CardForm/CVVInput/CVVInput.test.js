import React from 'react';
import { shallow } from 'enzyme';
import CVVInput from './CVVInput';
import TextInput from '../TextInput';

describe('CVVInput', () => {
  describe('renders', () => {
    test('a TextInput with all the passed props', () => {
      const props = { name: 'a_name', propA: 'propA', propB: 'propB' };
      const wrapper = shallow(<CVVInput {...props} />);

      const textInput = wrapper.find(TextInput);

      expect(textInput.props()).toEqual(expect.objectContaining(props));
    });

    test('a checkbox', () => {
      const props = { name: 'a_name' };
      const wrapper = shallow(<CVVInput {...props} />);

      expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
    });

    test('a span with the provided message', () => {
      const cvvTooltip = 'a_cvvTooltip';
      const props = { name: 'a_name', cvvTooltip };
      const wrapper = shallow(<CVVInput {...props} />);

      expect(wrapper.find('span').text()).toEqual(cvvTooltip);
    });
  });
});
