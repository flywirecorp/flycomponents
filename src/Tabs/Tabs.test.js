import React from 'react';
import Tabs from './Tabs';
import Tab from './Tab';
import TabList from './TabList';
import TabPanels from './TabPanels';
import TabPanel from './TabPanel';
import { render } from '@testing-library/react';

describe('Tabs', () => {
  const { container } = render(
    <Tabs>
      <TabList>
        <Tab>First</Tab>
        <Tab>Second</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>First option content</TabPanel>
        <TabPanel>Second option content</TabPanel>
      </TabPanels>
    </Tabs>
  );
  const tabs = container.firstChild;
  const tabList = tabs.childNodes.item(0);
  const tabPanels = tabs.childNodes.item(1);

  test('renders children', () => {
    expect(tabList).toHaveClass('TabList');
    expect(tabList.childNodes.length).toBe(2);
    expect(tabList.childNodes.item(0)).toHaveProperty('id', 'tabs-tab-0');
    expect(tabList.childNodes.item(1)).toHaveProperty('id', 'tabs-tab-1');

    expect(tabPanels).toHaveClass('TabPanels');
    expect(tabPanels.childNodes.length).toBe(2);
    expect(tabPanels.childNodes.item(0)).toHaveProperty('id', 'tabs-panel-0');
    expect(tabPanels.childNodes.item(1)).toHaveProperty('id', 'tabs-panel-1');
  });

  test('defaults to first tab active', () => {
    expect(tabList.childNodes.item(0)).toHaveClass('is-active');
  });

  test('merges classNames sent with their default classes', () => {
    const className = 'customClass';
    const { container } = render(
      <Tabs className={className}>
        <TabList />
        <TabPanels>
          <TabPanel>First option content</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(container.firstChild).toHaveClass(className);
  });
});
