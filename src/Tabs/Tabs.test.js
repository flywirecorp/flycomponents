import React from 'react';
import { shallow } from 'enzyme';
import Tabs from './Tabs';
import TabList from './TabList';
import TabPanels from './TabPanels';

describe('Tabs', () => {
  const panelsContent = 'Panels content';
  const wrapper = shallow(
    <Tabs>
      <TabList />
      <TabPanels>{panelsContent}</TabPanels>
    </Tabs>
  );

  test('renders children', () => {
    const tabList = wrapper.find(TabList);
    const tabPanel = wrapper.find(TabPanels);

    expect(tabList.length).toBe(1);
    expect(tabPanel.length).toBe(1);
  });

  test('defaults to first tab active', () => {
    const activeTabIndex = wrapper.state().activeIndex;

    expect(activeTabIndex).toBe(0);
  });

  test('merges classNames sent with their default classes', () => {
    const wrapper = shallow(
      <Tabs className="customClass">
        <TabList />
        <TabPanels>{panelsContent}</TabPanels>
      </Tabs>
    );

    expect(wrapper.find('.Tabs.customClass').length).toEqual(1);
  });
});
