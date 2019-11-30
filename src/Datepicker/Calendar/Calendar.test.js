import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Calendar from './Calendar';
import Navigation from './Navigation';
import DayNames from './DayNames';
import Month from './Month';
import { ESC } from '../../utils/keycodes';

describe('Calendar', () => {
  class CalendarComponent {
    constructor(ownProps) {
      const FAKE_CALLBACK = () => {};
      const defaultProps = {
        isOpen: false,
        closeCalendar: FAKE_CALLBACK,
        onDateClick: FAKE_CALLBACK,
        onMonthChange: FAKE_CALLBACK,
        onNextMonthClick: FAKE_CALLBACK,
        onPrevMonthClick: FAKE_CALLBACK,
        onYearChange: FAKE_CALLBACK,
        selectedDate: '',
        startDate: moment('2016-11-13')
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

    hasFocusTrap() {
      return this.component.exists('FocusTrap');
    }

    simulateKeyPress(keyCode) {
      this.calendar().simulate('keyDown', {
        keyCode,
        preventDefault: () => {}
      });
    }

    pressEscKey() {
      this.simulateKeyPress(ESC);
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

  test('traps the focus when open', () => {
    const component = new CalendarComponent({ isOpen: true });

    expect(component.hasFocusTrap()).toBe(true);
  });

  test('closes the calendar when ESC key pressed', () => {
    const closeCalendar = jest.fn();
    const component = new CalendarComponent({ closeCalendar });

    component.pressEscKey();

    expect(closeCalendar).toBeCalled();
  });
});
