import React from 'react';
import { shallow } from 'enzyme';
import TabPanels from './TabPanels';
import TabPanel from '../TabPanel';

describe('TabPanels', () => {
  test('sends context', () => {
    const firstContent = 'First content';
    const secondContent = 'Second content';
    const onSelect = jest.fn();
    const context = {
      activeIndex: 0,
      onSelectTab: onSelect
    };
    const wrapper = shallow(
      <TabPanels>
        <TabPanel>{firstContent}</TabPanel>
        <TabPanel>{secondContent}</TabPanel>
      </TabPanels>,
      { context }
    );

    const panel = wrapper.find(TabPanel);

    expect(panel.length).toEqual(1);
    expect(panel.props().children).toEqual(firstContent);
  });
});
