import React from 'react';
import { shallow } from 'enzyme';
import { Heading } from './Heading';

describe('Heading', () => {
  describe('render', () => {
    test('show the default component', () => {
      const wrapper = shallow(<Heading />);

      expect(wrapper.find('h1.Heading').length).toEqual(1);
    });

    test('shows the sent text to the component', () => {
      const text = 'a_text';
      const wrapper = shallow(<Heading>{text}</Heading>);
      const h1 = wrapper.find('h1.Heading');

      expect(h1.text()).toEqual(text);
    });

    test('shows a large component when type large is sent', () => {
      const wrapper = shallow(<Heading size="large" />);

      expect(wrapper.find('h1.Heading--large').length).toEqual(1);
    });

    test('shows custom class on heading component', () => {
      const wrapper = shallow(<Heading size="large" />);

      expect(wrapper.find('.Heading--large').length).toEqual(1);
    });

    test('customizes heading tag', () => {
      const wrapper = shallow(<Heading as="h5" />);

      expect(wrapper.find('h5.Heading').length).toEqual(1);
    });

    test('shows error when invalid heading tag', () => {
      expect(() => {
        shallow(<Heading as="p" />);
      }).toThrow('Unsupported type');
    });

    test('merges classNames sent with their default classes', () => {
      const wrapper = shallow(<Heading className="customClass" />);

      expect(wrapper.find('.Heading.customClass').length).toEqual(1);
    });

    test('adds custom attributes', () => {
      const wrapper = shallow(
        <Heading className="customClass" data-qa="custom" />
      );

      expect(wrapper.find('.Heading[data-qa="custom"]').length).toEqual(1);
    });
  });
});
