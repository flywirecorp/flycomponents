import React from 'react';
import { mount } from 'enzyme';
import TabPanels from './TabPanels';
import TabPanel from '../TabPanel';
import { Context } from '../Tabs';

describe('TabPanels', () => {
  test('sends context', () => {
    const firstContent = 'First content';
    const secondContent = 'Second content';
    const onSelect = jest.fn();
    const wrapper = mount(
      <Context.Provider
        value={{
          activeIndex: 0,
          onSelectTab: onSelect,
          id: 'my-tabs'
        }}
      >
        <TabPanels>
          <TabPanel>{firstContent}</TabPanel>
          <TabPanel>{secondContent}</TabPanel>
        </TabPanels>
      </Context.Provider>
    );

    const panel = wrapper.find(TabPanel);

    expect(panel.length).toEqual(2);
    expect(panel.first().props()).toEqual({
      'aria-labelledby': 'my-tabs-tab-0',
      children: 'First content',
      id: 'my-tabs-panel-0',
      isActive: true
    });

    expect(panel.last().props()).toEqual({
      'aria-labelledby': 'my-tabs-tab-1',
      children: 'Second content',
      id: 'my-tabs-panel-1',
      isActive: false
    });
  });
});
