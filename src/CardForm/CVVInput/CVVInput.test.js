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

    test('a TextInput with the provided className', () => {
      const props = { name: 'a_name', className: 'a_className' };
      const wrapper = shallow(<CVVInput {...props} />);

      const textInput = wrapper.find(TextInput);

      expect(textInput.hasClass('a_className')).toEqual(true);
    });

    test('a span with the question logo', () => {
      const props = { name: 'a_name' };
      const wrapper = shallow(<CVVInput {...props} />);

      expect(
        wrapper.find('span[className="cvvInput-Icon-Tooltip"]')
      ).toHaveLength(1);
    });

    test('a span with the provided message', () => {
      const cvvTooltip = 'a_cvvTooltip';
      const props = { name: 'a_name', cvvTooltip };
      const wrapper = shallow(<CVVInput {...props} />);

      expect(
        wrapper.find('span[className="cvvInput-Label-Tooltip"]').text()
      ).toEqual(cvvTooltip);
    });
  });
});
