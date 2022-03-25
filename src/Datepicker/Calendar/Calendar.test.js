import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Context } from '../Datepicker';
import moment from 'moment';
import Calendar from './Calendar';

jest.mock('focus-trap-react', () => ({ children }) => (
  <div data-testid="FocusTrap">{children}</div>
));

describe('Calendar', () => {
  function calendarComponent(ownProps) {
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
      selectedDate: moment('2016-11-13')
    };
    const props = { ...defaultProps, ...ownProps };

    return render(
      <Context.Provider value={{ locale: 'en' }}>
        <Calendar {...props} />
      </Context.Provider>
    );
  }

  test('has a navigation bar', () => {
    const { getByRole } = calendarComponent();

    expect(getByRole('navigation')).toBeInTheDocument();
  });

  test('has a day names header', () => {
    const { getByRole } = calendarComponent();

    expect(
      getByRole('row', { name: 'Sun Mon Tue Wed Thu Fri Sat' })
    ).toBeInTheDocument();
  });

  test('has a day month table', () => {
    const { queryAllByRole } = calendarComponent();

    expect(queryAllByRole('presentation')[2]).toBeInTheDocument();
  });

  test('traps the focus when open', () => {
    const { getByTestId } = calendarComponent({ isOpen: true });

    expect(getByTestId('FocusTrap')).toBeInTheDocument();
  });

  test('closes the calendar when ESC or ENTER key pressed', () => {
    const closeCalendar = jest.fn();

    const { container } = calendarComponent({ closeCalendar });
    fireEvent.keyDown(container.firstChild, { keyCode: 27 });

    expect(closeCalendar).toBeCalled();
  });

  test('subtracts one week when arrow up key pressed', () => {
    const selectedDate = moment('2016-11-13');
    const setDate = jest.fn();

    const { container } = calendarComponent({ selectedDate, setDate });
    fireEvent.keyDown(container.firstChild, { keyCode: 38 });

    expect(setDate).toBeCalledWith(selectedDate.subtract(1, 'week'));
  });

  test('adds one week when arrow down key pressed', () => {
    const selectedDate = moment('2016-11-13');
    const setDate = jest.fn();

    const { container } = calendarComponent({ selectedDate, setDate });
    fireEvent.keyDown(container.firstChild, { keyCode: 40 });

    expect(setDate).toBeCalledWith(selectedDate.add(1, 'week'));
  });

  test('adds one day when arrow right key pressed', () => {
    const selectedDate = moment('2016-11-13');
    const setDate = jest.fn();

    const { container } = calendarComponent({ selectedDate, setDate });
    fireEvent.keyDown(container.firstChild, { keyCode: 39 });

    expect(setDate).toBeCalledWith(selectedDate.add(1, 'day'));
  });

  test('subtracts one day when arrow right left pressed', () => {
    const selectedDate = moment('2016-11-13');
    const setDate = jest.fn();

    const { container } = calendarComponent({ selectedDate, setDate });
    fireEvent.keyDown(container.firstChild, { keyCode: 37 });

    expect(setDate).toBeCalledWith(selectedDate.subtract(1, 'day'));
  });
});
