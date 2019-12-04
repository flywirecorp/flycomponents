import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Calendar from './Calendar';
import Navigation from './Navigation';
import DayNames from './DayNames';
import Month from './Month';
import {
  ESC,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP
} from '../../utils/keycodes';

describe('Calendar', () => {
  class CalendarComponent {
    constructor(ownProps) {
      const FAKE_CALLBACK = () => {};
      const defaultProps = {
        closeCalendar: FAKE_CALLBACK,
        isOpen: false,
        onDateClick: FAKE_CALLBACK,
        onMonthChange: FAKE_CALLBACK,
        onNextMonthClick: FAKE_CALLBACK,
        onPrevMonthClick: FAKE_CALLBACK,
        onYearChange: FAKE_CALLBACK,
        setDate: FAKE_CALLBACK,
        focussedDate: moment('2016-11-13')
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

  test('closes the calendar when ESC or ENTER key pressed', () => {
    const closeCalendar = jest.fn();
    const component = new CalendarComponent({ closeCalendar });

    component.simulateKeyPress(ESC);
    expect(closeCalendar).toBeCalled();
  });

  test('subtracts one week when arrow up key pressed', () => {
    const focussedDate = moment('2016-11-13');
    const setDate = jest.fn();
    const component = new CalendarComponent({ focussedDate, setDate });

    component.simulateKeyPress(ARROW_UP);

    expect(setDate).toBeCalledWith(focussedDate.subtract(1, 'week'));
  });

  test('adds one week when arrow down key pressed', () => {
    const focussedDate = moment('2016-11-13');
    const setDate = jest.fn();
    const component = new CalendarComponent({ focussedDate, setDate });

    component.simulateKeyPress(ARROW_DOWN);

    expect(setDate).toBeCalledWith(focussedDate.add(1, 'week'));
  });

  test('adds one day when arrow right key pressed', () => {
    const focussedDate = moment('2016-11-13');
    const setDate = jest.fn();
    const component = new CalendarComponent({ focussedDate, setDate });

    component.simulateKeyPress(ARROW_RIGHT);

    expect(setDate).toBeCalledWith(focussedDate.add(1, 'day'));
  });

  test('subtracts one day when arrow right left pressed', () => {
    const focussedDate = moment('2016-11-13');
    const setDate = jest.fn();
    const component = new CalendarComponent({ focussedDate, setDate });

    component.simulateKeyPress(ARROW_LEFT);

    expect(setDate).toBeCalledWith(focussedDate.subtract(1, 'day'));
  });
});
