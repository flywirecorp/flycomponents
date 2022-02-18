import React from 'react';
import TabPanels from './TabPanels';
import TabPanel from '../TabPanel';
import { Context } from '../Tabs';
import { render } from '@testing-library/react';

describe('TabPanels', () => {
  test('sends context', () => {
    const firstContent = 'First content';
    const secondContent = 'Second content';
    const onSelect = jest.fn();
    const { container } = render(
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
    const content = container.firstChild.childNodes;

    expect(content.length).toEqual(2);

    expect(content.item(0)).toHaveTextContent('First content');
    expect(content.item(0)).toHaveProperty('id', 'my-tabs-panel-0');
    expect(content.item(0)).not.toHaveStyle('display: none;');

    expect(content.item(1)).toHaveTextContent('Second content');
    expect(content.item(1)).toHaveProperty('id', 'my-tabs-panel-1');
    expect(content.item(1)).toHaveStyle('display: none;');
  });
});
