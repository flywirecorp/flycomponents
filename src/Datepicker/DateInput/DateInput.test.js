import React from 'react';
import { shallow } from 'enzyme';
import DateInput from './DateInput';

describe('DateInput', () => {
  class DateInputComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'name',
        onCalendarIconClick: () => {},
        onClick: () => {},
        selectedDate: '',
        setSelectedDate: () => {}
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<DateInput {...props} />);
    }

    input() {
      return this.component.find('input');
    }

    simulateChange(value) {
      this.component.setState({ value });
      this.input().simulate('change');
    }

    state() {
      return this.component.state();
    }

    setState(state) {
      this.component.setState(state);
    }

    pressKey(k) {
      const keys = {
        0: { which: 48 },
        delete: { which: 8 }
      };

      this.input().simulate('keyDown', keys[k]);
    }
  }

  test('sets the state value while writing', () => {
    const setSelectedDate = jest.fn();
    const component = new DateInputComponent({ setSelectedDate });

    component.pressKey(0);

    expect(setSelectedDate).toBeCalledWith('0');
  });

  test('removes the last character when pressing delete key', () => {
    const setSelectedDate = jest.fn();
    const selectedDate = '05/12/2016';
    const component = new DateInputComponent({ selectedDate, setSelectedDate });

    component.pressKey('delete');

    expect(setSelectedDate).toBeCalledWith('05/12/201');
  });

  test('does not change input field if readOnly prop is passed in', () => {
    const setSelectedDate = jest.fn();
    const component = new DateInputComponent({
      setSelectedDate,
      readOnly: true
    });

    component.pressKey(0);

    expect(setSelectedDate).not.toBeCalled();
  });
});
