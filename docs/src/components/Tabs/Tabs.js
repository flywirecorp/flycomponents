import React from 'react';
import Tabs from '../../../../src/Tabs';
import Component from '../Component';
import README from './README.md';

export default () => {
  const { Tab, TabList, TabPanel, TabPanels } = Tabs;

  return (
    <Component readme={README}>
      <Tabs defaultActiveIndex={1}>
        <TabList>
          <Tab>First</Tab>
          <Tab>Second</Tab>
          <Tab isDisabled>Disabled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First option content</TabPanel>
          <TabPanel>Second option content</TabPanel>
          <TabPanel>Third option content</TabPanel>
        </TabPanels>
      </Tabs>
    </Component>
  );
};
