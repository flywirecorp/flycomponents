import React from 'react';
import { shallow } from 'enzyme';
import { PrefixSelector } from './PrefixSelector';
import Option from './Option';

describe('PrefixSelector', () => {
  const options = [
    {
      label: 'Spain',
      value: 'ES',
      dialingCode: '34',
      phonePattern: '+.. ... ... ...'
    },
    {
      label: 'United States',
      value: 'US',
      dialingCode: '1',
      phonePattern: '+. (...) ...-....'
    }
  ];
  test('renders a list of options', () => {
    const wrapper = shallow(<PrefixSelector options={options} />);
    expect(wrapper.find(Option)).toHaveLength(2);
  });

  test('selects one option when click', () => {
    const wrapper = shallow(<PrefixSelector options={options} />);
    const firstOption = wrapper.find(Option).first();

    firstOption.simulate('click');

    wrapper.update();

    expect(
      wrapper
        .find(Option)
        .first()
        .prop('hasFocus')
    ).toEqual(true);
  });

  test('selects one option when mouse enter', () => {
    const wrapper = shallow(<PrefixSelector options={options} />);
    const firstOption = wrapper.find(Option).first();

    firstOption.simulate('mouseEnter');

    wrapper.update();

    expect(
      wrapper
        .find(Option)
        .first()
        .prop('hasFocus')
    ).toEqual(true);
  });

  describe('when pressing arrows', () => {
    describe('when pressing arrow down', () => {
      const arrowDown = {
        keyCode: 40,
        preventDefault: () => {}
      };

      test('selects first option', () => {
        const wrapper = shallow(<PrefixSelector options={options} />);
        const dropdownInput = wrapper.find('.PhoneNumber-menu-input');

        dropdownInput.simulate('keyDown', arrowDown);
        wrapper.update();

        expect(
          wrapper
            .find(Option)
            .first()
            .prop('hasFocus')
        ).toEqual(true);
      });

      test('selects second option', () => {
        const wrapper = shallow(<PrefixSelector options={options} />);
        const dropdownInput = wrapper.find('.PhoneNumber-menu-input');

        dropdownInput.simulate('keyDown', arrowDown);
        dropdownInput.simulate('keyDown', arrowDown);
        wrapper.update();

        expect(
          wrapper
            .find(Option)
            .at(1)
            .prop('hasFocus')
        ).toEqual(true);
      });

      test('selects first option when pressing down after the last option', () => {
        const wrapper = shallow(<PrefixSelector options={options} />);
        const dropdownInput = wrapper.find('.PhoneNumber-menu-input');

        dropdownInput.simulate('keyDown', arrowDown);
        dropdownInput.simulate('keyDown', arrowDown);
        dropdownInput.simulate('keyDown', arrowDown);
        wrapper.update();

        expect(
          wrapper
            .find(Option)
            .first()
            .prop('hasFocus')
        ).toEqual(true);
      });
    });

    describe('when pressing arrow up', () => {
      const arrowUp = {
        keyCode: 38,
        preventDefault: () => {}
      };

      test('selects last option', () => {
        const wrapper = shallow(<PrefixSelector options={options} />);
        const dropdownInput = wrapper.find('.PhoneNumber-menu-input');

        dropdownInput.simulate('keyDown', arrowUp);
        wrapper.update();

        expect(
          wrapper
            .find(Option)
            .last()
            .prop('hasFocus')
        ).toEqual(true);
      });

      test('selects second-last option', () => {
        const wrapper = shallow(<PrefixSelector options={options} />);
        const dropdownInput = wrapper.find('.PhoneNumber-menu-input');

        dropdownInput.simulate('keyDown', arrowUp);
        dropdownInput.simulate('keyDown', arrowUp);
        wrapper.update();

        expect(
          wrapper
            .find(Option)
            .first()
            .prop('hasFocus')
        ).toEqual(true);
      });

      test('selects first option when pressing down after the last option', () => {
        const wrapper = shallow(<PrefixSelector options={options} />);
        const dropdownInput = wrapper.find('.PhoneNumber-menu-input');

        dropdownInput.simulate('keyDown', arrowUp);
        dropdownInput.simulate('keyDown', arrowUp);
        dropdownInput.simulate('keyDown', arrowUp);
        wrapper.update();

        expect(
          wrapper
            .find(Option)
            .last()
            .prop('hasFocus')
        ).toEqual(true);
      });
    });
  });
});
