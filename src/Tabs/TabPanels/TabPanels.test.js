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
          onSelectTab: onSelect
        }}
      >
        <TabPanels>
          <TabPanel>{firstContent}</TabPanel>
          <TabPanel>{secondContent}</TabPanel>
        </TabPanels>
      </Context.Provider>
    );

    const panel = wrapper.find(TabPanel);

    expect(panel.length).toEqual(1);
    expect(panel.props().children).toEqual(firstContent);
  });
});
