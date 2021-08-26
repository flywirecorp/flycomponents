import React from 'react';
import { mount } from 'enzyme';
import Tab from '../Tab';
import TabList from './TabList';
import { Context } from '../Tabs';

describe('TabList', () => {
  const option = 'Tab option';

  test('renders link', () => {
    const wrapper = mount(
      <Context.Provider
        value={{
          activeIndex: 0,
          onSelectTab: jest.fn(),
        }}
      >
        <TabList>
          <Tab>{option}</Tab>
        </TabList>
      </Context.Provider>,
    );

    const tab = wrapper.find(Tab);

    expect(tab.length).toBe(1);
  });

  test('sends context', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <Context.Provider
        value={{
          activeIndex: 1,
          onSelectTab: onSelect,
        }}
      >
        <TabList>
          <Tab>{option}</Tab>
          <Tab>{option}</Tab>
        </TabList>
      </Context.Provider>,
    );

    const secondTab = wrapper.find(Tab).last();
    const onSelectTab = secondTab.props().onSelect;

    expect(secondTab.props().isActive).toBe(true);
    expect(typeof onSelectTab).toEqual('function');
  });
});
