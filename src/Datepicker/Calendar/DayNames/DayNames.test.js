import React from 'react';
import { mount } from 'enzyme';
import DayNames from './DayNames';
import { daysOfWeek } from '../../../utils/date';

jest.mock('../../../utils/date', () => {
  return {
    daysOfWeek: jest.fn(locale => [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ])
  };
});

describe('DayNames', () => {
  test('renders the days of the week', () => {
    const locale = 'en';
    const table = document.createElement('table');
    const component = mount(<DayNames />, {
      context: { locale },
      attachTo: table
    });

    const days = component.find('.Calendar-weekday').map(d => d.text());
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const lastCall = daysOfWeek.mock.calls.pop();

    expect(days).toEqual(expectedDays);
    expect(lastCall).toEqual([locale]);

    daysOfWeek.mockReset();
  });
});
