import React from 'react';
import { Context } from '../../Datepicker';
import DayNames from './DayNames';
import { render } from '@testing-library/react';

describe('DayNames', () => {
  test('renders the days of the week', () => {
    const locale = 'en';

    const tableRow = document.createElement('table');
    const { queryAllByRole } = render(
      <Context.Provider value={{ locale }}>
        <DayNames />
      </Context.Provider>,
      {
        container: document.body.appendChild(tableRow)
      }
    );

    const days = queryAllByRole('columnheader').map(
      header => header.firstChild.textContent
    );
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expect(days).toEqual(expectedDays);
  });
});
