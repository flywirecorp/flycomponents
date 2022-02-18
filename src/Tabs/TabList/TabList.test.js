import React from 'react';
import Tab from '../Tab';
import TabList from './TabList';
import { Context } from '../Tabs';
import { fireEvent, render } from '@testing-library/react';

describe('TabList', () => {
  const option = 'Tab option';

  test('renders link', () => {
    const { getByRole, container } = render(
      <Context.Provider
        value={{
          activeIndex: 0,
          onSelectTab: jest.fn()
        }}
      >
        <TabList>
          <Tab>{option}</Tab>
        </TabList>
      </Context.Provider>
    );

    expect(container.firstChild.firstChild).toHaveTextContent(option);
    expect(container.firstChild.firstChild).toHaveClass('Tab-link');
    expect(getByRole('tab')).toBeInTheDocument();
  });

  test('sends context', () => {
    const onSelectTab = jest.fn();
    const onChange = jest.fn();
    const isActiveClass = 'is-active';

    const { container } = render(
      <Context.Provider
        value={{
          activeIndex: 1,
          onSelectTab,
          onChange
        }}
      >
        <TabList>
          <Tab>{option}</Tab>
          <Tab>{option}</Tab>
        </TabList>
      </Context.Provider>
    );

    const secondTab = container.firstChild.lastChild;

    fireEvent.click(secondTab);

    expect(secondTab).toHaveClass(isActiveClass);
    expect(onSelectTab).toHaveBeenCalledWith(1);
    expect(onChange).toHaveBeenCalledWith({ index: 1 });
  });
});
