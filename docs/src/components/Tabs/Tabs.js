import React from 'react';
import Tabs from '../../../../src/Tabs';
import { Button } from '../../../../src';
import Component from '../Component';
import README from './README.md';

export default () => {
  const { Tab, TabList, TabPanel, TabPanels } = Tabs;

  return (
    <Component readme={README}>
      <Tabs className="customTabs" defaultActiveIndex={1}>
        <TabList>
          <Tab>First</Tab>
          <Tab onClick={() => alert('clicked')}>Second</Tab>
          <Tab>Third</Tab>
          <Tab isDisabled>Disabled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First option content</TabPanel>
          <TabPanel>Second option content</TabPanel>
          <TabPanel>
            {({ selectTab }) => (
              <Button
                className="Button Button--primary"
                onClick={() => {
                  selectTab(0);
                }}
              >
                Go to first
              </Button>
            )}
          </TabPanel>
          <TabPanel>Third option content</TabPanel>
        </TabPanels>
      </Tabs>
    </Component>
  );
};
