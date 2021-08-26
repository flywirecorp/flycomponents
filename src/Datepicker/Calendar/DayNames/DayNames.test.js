import React from 'react';
import { mount } from 'enzyme';
import { Context } from '../../Datepicker';
import DayNames from './DayNames';

describe('DayNames', () => {
  test('renders the days of the week', () => {
    const locale = 'en';
    const component = mount(
      <Context.Provider value={{ locale }}>
        <DayNames />
      </Context.Provider>,
      {
        attachTo: document.createElement('table'),
      },
    );

    const days = component.find('.Calendar-weekday').map(d => d.text());
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expect(days).toEqual(expectedDays);
  });
});
