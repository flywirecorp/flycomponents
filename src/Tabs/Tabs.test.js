import React from 'react';
import { shallow, mount } from 'enzyme';
import Tabs from './Tabs';
import TabList from './TabList';
import Tab from './Tab';
import TabPanels from './TabPanels';
import TabPanel from './TabPanel';

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

  test('call onTabSelected if is declared', () => {
    const onTabSelected = jest.fn();

    const tabOption1 = 'Tab1';
    const tabOption2 = 'Tab2';

    const wrapper = mount(
      <Tabs defaultActiveIndex={0} onTabSelected={onTabSelected}>
        <TabList>
          <Tab>{tabOption1}</Tab>
          <Tab>{tabOption2}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First option content</TabPanel>
          <TabPanel>Second option content</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const secondTab = wrapper.find(Tab).at(1);
    secondTab.simulate('click');

    expect(onTabSelected).toHaveBeenCalled();
  });
});
