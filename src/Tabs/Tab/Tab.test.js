import React from 'react';
import { shallow } from 'enzyme';
import Tab from './Tab';

describe('Tab', () => {
  const option = 'Tab option';

  test('renders link', () => {
    const wrapper = shallow(<Tab>{option}</Tab>);

    const link = wrapper.find('a');

    expect(wrapper.text()).toEqual(option);
    expect(link.length).toBe(1);
  });

  test('activates link', () => {
    const isActiveClass = 'is-active';
    const wrapper = shallow(<Tab isActive>{option}</Tab>);

    const link = wrapper.find('a');

    expect(link.hasClass(isActiveClass)).toBe(true);
  });

  test('disables link', () => {
    const disabledClass = 'is-disabled';
    const wrapper = shallow(<Tab isDisabled>{option}</Tab>);

    const link = wrapper.find('a');

    expect(link.hasClass(disabledClass)).toBe(true);
  });

  test('calls function on select', () => {
    const onSelect = jest.fn();

    const wrapper = shallow(<Tab onSelect={onSelect}>{option}</Tab>);

    const link = wrapper.find('a');
    link.simulate('click');

    expect(onSelect).toHaveBeenCalled();
  });

  test('calls function on click', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Tab onClick={onClick}>{option}</Tab>);

    const link = wrapper.find('a');
    link.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
