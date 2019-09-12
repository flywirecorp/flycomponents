import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';
import Calendar from './Calendar';
import Navigation from './Navigation';
import DayNames from './DayNames';
import Month from './Month';

describe('Calendar', () => {
  class CalendarComponent {
    constructor(ownProps) {
      const FAKE_CALLBACK = () => {};
      const defaultProps = {
        onDateClick: FAKE_CALLBACK,
        onMonthChange: FAKE_CALLBACK,
        onNextMonthClick: FAKE_CALLBACK,
        onPrevMonthClick: FAKE_CALLBACK,
        onYearChange: FAKE_CALLBACK,
        selectedDate: '',
        startDate: dayjs('2016-11-13')
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Calendar {...props} />);
    }

    calendar() {
      return this.component.find('.Calendar');
    }

    navigation() {
      return this.calendar().find(Navigation);
    }

    dayNames() {
      return this.calendar().find(DayNames);
    }

    month() {
      return this.calendar().find(Month);
    }
  }

  test('has a navigation bar', () => {
    const component = new CalendarComponent();

    expect(component.navigation()).toHaveLength(1);
  });

  test('has a day names header', () => {
    const component = new CalendarComponent();

    expect(component.dayNames()).toHaveLength(1);
  });

  test('has a day month table', () => {
    const component = new CalendarComponent();

    expect(component.month()).toHaveLength(1);
  });
});
