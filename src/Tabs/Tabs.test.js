import React from 'react';
import { mount } from 'enzyme';
import Tabs from './Tabs';
import Tab from './Tab';
import TabList from './TabList';
import TabPanels from './TabPanels';
import TabPanel from './TabPanel';

describe('Tabs', () => {
  const wrapper = mount(
    <Tabs>
      <TabList>
        <Tab>First</Tab>
        <Tab>Second</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First option content</TabPanel>
        <TabPanel>Second option content</TabPanel>
      </TabPanels>
    </Tabs>,
  );

  test('renders children', () => {
    const tabList = wrapper.find(TabList);
    const tabPanel = wrapper.find(TabPanels);

    expect(tabList.length).toBe(1);
    expect(tabPanel.length).toBe(1);
  });

  test('defaults to first tab active', () => {
    const firstTab = wrapper.find(Tab).first();

    expect(firstTab.prop('isActive')).toBe(true);
  });

  test('merges classNames sent with their default classes', () => {
    const wrapper = mount(
      <Tabs className="customClass">
        <TabList />
        <TabPanels>
          <TabPanel>First option content</TabPanel>
        </TabPanels>
      </Tabs>,
    );

    expect(wrapper.find('.Tabs.customClass').length).toEqual(1);
  });
});
