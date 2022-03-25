import React from 'react';
import moment from 'moment';
import { Context } from '../../Datepicker';
import Month from './Month';
import { render } from '@testing-library/react';

describe('Month', () => {
  const defaultProps = {
    onDateClick: () => {},
    selectedDate: moment('2016-11-13')
  };

  test('has 5 weeks', () => {
    const props = { ...defaultProps, selectedDate: moment('2016-11-13') };
    const table = document.createElement('table');
    const { queryAllByRole } = render(
      <Context.Provider value={{ name: 'birthday' }}>
        <Month {...props} />
      </Context.Provider>,
      {
        container: document.body.appendChild(table)
      }
    );

    const weekNodes = queryAllByRole('row');
    expect(weekNodes).toHaveLength(5);
    weekNodes.forEach(weekNode => {
      expect(weekNode).toHaveClass('week');
    });
  });
});
