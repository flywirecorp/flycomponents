import React from 'react';
import { mount } from 'enzyme';
import { TabPanel } from './TabPanel';
import { Context } from '../Tabs';
import { ENTER, SPACE } from '../../utils/keycodes';

describe('TabPanel', () => {
  test('receives select tab function', () => {
    const onSelectTab = jest.fn();
    const wrapper = mount(
      <Context.Provider value={{ onSelectTab }}>
        <TabPanel>
          {({ selectTab }) => (
            <div
              onClick={selectTab}
              onKeyDown={evt =>
                [ENTER, SPACE].includes(evt.keyCode) && selectTab()
              }
              role="button"
              tabIndex={0}
            />
          )}
        </TabPanel>
      </Context.Provider>
    );

    wrapper.find('div').simulate('click');

    expect(onSelectTab).toHaveBeenCalled();
  });
});
