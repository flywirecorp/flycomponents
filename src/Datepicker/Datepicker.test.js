import React from 'react';
import { shallow } from 'enzyme';
import Datepicker from './Datepicker';
import Calendar from './Calendar';
import DateInput from './DateInput';

describe('Datepicker', () => {
  class DatepickerComponent {
    constructor(ownProps) {
      const defaultProps = {
        error: '',
        label: 'Your birthday',
        name: 'birthday',
        onBlur: () => {},
        onChange: () => {},
        required: false,
        value: null
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Datepicker {...props} />);
    }

    datepicker() {
      return this.component;
    }

    currentDate() {
      const state = this.datepicker().state();
      return state.startDate.format('MM/DD/YYYY');
    }

    selectedDate() {
      const state = this.datepicker().state();
      return state.selectedDate;
    }

    dateInput() {
      return this.component.find(DateInput);
    }

    calendar() {
      return this.component.find(Calendar);
    }

    calendarIsVisible() {
      return this.component.state('isOpen');
    }

    simulateCalendarIconClick() {
      this.dateInput().simulate('calendarIconClick');
    }

    simulateDateInputClick() {
      this.dateInput().simulate('click');
    }

    simulateDateInputBlur() {
      this.dateInput().simulate('blur');
    }

    simulatePrevMonthClick() {
      this.calendar().simulate('prevMonthClick');
    }

    simulateNextMonthClick() {
      this.calendar().simulate('nextMonthClick');
    }

    simulateMonthChange(month) {
      this.calendar().simulate('monthChange', month);
    }

    simulateYearChange(year) {
      this.calendar().simulate('yearChange', year);
    }

    simulateDateClick(date) {
      this.calendar().simulate('dateClick', date);
    }
  }

  test('has a date input', () => {
    const component = new DatepickerComponent();

    expect(component.dateInput()).toHaveLength(1);
  });

  test('has a calendar', () => {
    const component = new DatepickerComponent();

    expect(component.calendar()).toHaveLength(1);
  });

  test('hiddes the calendar by default', () => {
    const component = new DatepickerComponent();

    expect(component.calendarIsVisible()).toBe(false);
  });

  test('shows the calendar when clicking the calendar icon', () => {
    const component = new DatepickerComponent();
    component.simulateCalendarIconClick();

    expect(component.calendarIsVisible()).toBe(true);
  });

  test('shows the calendar when clicking the date input', () => {
    const component = new DatepickerComponent();

    component.simulateDateInputClick();

    expect(component.calendarIsVisible()).toBe(true);
  });

  test('hides the calendar when date input blurs', () => {
    jest.useFakeTimers();

    const CLOSE_DELAY_TIME = 150;
    const component = new DatepickerComponent();

    component.simulateDateInputClick();
    component.simulateDateInputBlur();

    setTimeout(() => {
      expect(component.calendarIsVisible()).toBe(false);
    }, CLOSE_DELAY_TIME + 1);
  });

  test('moves calendar one month back', () => {
    const value = '11/22/2016';
    const component = new DatepickerComponent({ value });

    component.simulatePrevMonthClick();

    expect(component.currentDate()).toBe('10/22/2016');
  });

  test('moves calendar one month ahead', () => {
    const value = '11/22/2016';
    const component = new DatepickerComponent({ value });

    component.simulateNextMonthClick();

    expect(component.currentDate()).toBe('12/22/2016');
  });

  test('moves calendar to selected month', () => {
    const JANUARY = 0;
    const value = '11/22/2016';
    const component = new DatepickerComponent({ value });

    component.simulateMonthChange(JANUARY);

    expect(component.currentDate()).toBe('01/22/2016');
  });

  test('moves calendar to selected year', () => {
    const value = '11/22/2016';
    const component = new DatepickerComponent({ value });

    component.simulateYearChange(2017);

    expect(component.currentDate()).toBe('11/22/2017');
  });

  test('selects date clicking a day', () => {
    const value = '11/22/2016';
    const component = new DatepickerComponent({ value });

    component.simulateDateClick('04/21/1979');

    expect(component.selectedDate()).toBe('04/21/1979');
  });

  test('selects date clicking a day', () => {
    const value = '11/22/2016';
    const component = new DatepickerComponent({ value });

    component.simulateDateClick('04/21/1979');

    expect(component.selectedDate()).toBe('04/21/1979');
  });

  describe('having read-only property', () => {
    const component = new DatepickerComponent({ readOnly: true });

    test('renders a read-only input', () => {
      expect(component.dateInput().prop('readOnly')).toBe(true);
    });

    test('does not open the calendar clicking the date input', () => {
      component.simulateDateInputClick();

      expect(component.calendarIsVisible()).toBe(false);
    });

    test('does not open the calendar clicking the calendar icon', () => {
      component.simulateCalendarIconClick();

      expect(component.calendarIsVisible()).toBe(false);
    });
  });

  describe('having disabled property', () => {
    const component = new DatepickerComponent({ disabled: true });

    test('renders a read-only input', () => {
      expect(component.dateInput().prop('disabled')).toBe(true);
    });

    test('does not open the calendar clicking the date input', () => {
      component.simulateDateInputClick();

      expect(component.calendarIsVisible()).toBe(false);
    });

    test('does not open the calendar clicking the calendar icon', () => {
      component.simulateCalendarIconClick();

      expect(component.calendarIsVisible()).toBe(false);
    });
  });
});
