import React from 'react';
import { shallow } from 'enzyme';
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
  test('renders the days of the week', async () => {
    const locale = 'en';
    const component = shallow(<DayNames />, {
      context: { locale }
    });

    await Promise.resolve();

    const days = component.find('.Calendar-weekday').map(d => d.text());
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const lastCall = daysOfWeek.mock.calls.pop();

    expect(days).toEqual(expectedDays);
    expect(lastCall).toEqual([locale]);

    daysOfWeek.mockReset();
  });
});
