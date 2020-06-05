import React from 'react';
import { mount } from 'enzyme';
import { TabPanel } from './TabPanel';
import { Context } from '../Tabs';

describe('TabPanel', () => {
  test('receives select tab function', () => {
    const onSelectTab = jest.fn();
    const wrapper = mount(
      <Context.Provider value={{ onSelectTab }}>
        <TabPanel>{({ selectTab }) => <div onClick={selectTab} />}</TabPanel>
      </Context.Provider>
    );

    wrapper.find('div').simulate('click');

    expect(onSelectTab).toHaveBeenCalled();
  });
});
