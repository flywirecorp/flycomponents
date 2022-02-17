import React from 'react';
import { TabPanel } from './TabPanel';
import { Context } from '../Tabs';
import { ENTER, SPACE } from '../../utils/keycodes';
import { fireEvent, render } from '@testing-library/react';

describe('TabPanel', () => {
  test('receives select tab function', () => {
    const onSelectTab = jest.fn();
    const { container } = render(
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
    const button = container.firstChild.firstChild;
    fireEvent.click(button);

    expect(onSelectTab).toHaveBeenCalled();
  });
});
