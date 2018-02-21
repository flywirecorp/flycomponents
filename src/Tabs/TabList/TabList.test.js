import React from 'react';
import { shallow } from 'enzyme';
import TabList from './TabList';
import Tab from '../Tab';

describe('TabList', () => {
  const option = 'Tab option';

  test('renders link', () => {
    const context = {
      activeIndex: 0,
      onSelectTab: jest.fn()
    };
    const wrapper = shallow(
      <TabList>
        <Tab>{option}</Tab>
      </TabList>,
      { context }
    );

    const tab = wrapper.find(Tab);

    expect(tab.length).toBe(1);
  });

  test('sends context', () => {
    const onSelect = jest.fn();
    const context = {
      activeIndex: 1,
      onSelectTab: onSelect
    };
    const wrapper = shallow(
      <TabList>
        <Tab>{option}</Tab>
        <Tab>{option}</Tab>
      </TabList>,
      { context }
    );

    const secondTab = wrapper.find(Tab).last();
    const onSelectTab = secondTab.props().onSelect;

    expect(secondTab.props().isActive).toBe(true);
    expect(typeof onSelectTab).toEqual('function');
  });
});
