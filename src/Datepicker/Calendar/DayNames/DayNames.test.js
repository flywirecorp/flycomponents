import React from 'react';
import { shallow } from 'enzyme';
import DayNames from './DayNames';

describe('DayNames', () => {
  test('renders the days of the week', () => {
    const component = shallow(<DayNames />, { context: { locale: 'en' } });
    const days = component.find('.Calendar-weekday').map(d => d.text());
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expect(days).toEqual(expectedDays);
  });
});
