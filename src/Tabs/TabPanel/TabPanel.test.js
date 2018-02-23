import React from 'react';
import { shallow } from 'enzyme';
import { TabPanel } from './TabPanel';

describe('TabPanel', () => {
  test('receives select tab function', () => {
    const onSelectTab = jest.fn();
    const context = { onSelectTab };
    const wrapper = shallow(
      <TabPanel>{({ selectTab }) => <div onClick={selectTab} />}</TabPanel>,
      { context }
    );

    wrapper.find('div').simulate('click');

    expect(onSelectTab).toHaveBeenCalled();
  });
});
