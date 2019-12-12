import React from 'react';
import { shallow } from 'enzyme';
import DateInput from './DateInput';
import { parseDate } from '../../utils/date';
import { ENTER, BACKSPACE } from '../../utils/keycodes';

describe('DateInput', () => {
  class DateInputComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'name',
        onCalendarIconClick: () => {},
        onFocus: () => {},
        onClick: () => {},
        onKeyDown: () => {},
        toggleCalendar: () => {}
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
        delete: { which: BACKSPACE },
        enter: { which: ENTER }
      };

      this.input().simulate('keyDown', keys[k]);
    }
  }

  test('sets the state value while writing', () => {
    const onKeyDown = jest.fn();
    const component = new DateInputComponent({ onKeyDown });

    component.pressKey(0);

    expect(onKeyDown).toBeCalledWith('0');
  });

  test('removes the last character when pressing delete key', () => {
    const onKeyDown = jest.fn();
    const defaultValue = parseDate('05/12/2016');
    const component = new DateInputComponent({ defaultValue, onKeyDown });

    component.pressKey('delete');

    expect(onKeyDown).toBeCalledWith('05/12/201');
  });

  test('does not change input field if readOnly prop is passed in', () => {
    const onKeyDown = jest.fn();
    const component = new DateInputComponent({
      onKeyDown,
      readOnly: true
    });

    component.pressKey(0);

    expect(onKeyDown).not.toBeCalled();
  });

  test('toggles calendar when Enter key pressed', () => {
    const toggleCalendar = jest.fn();
    const component = new DateInputComponent({ toggleCalendar });

    component.pressKey('enter');

    expect(toggleCalendar).toBeCalledWith();
  });

  test('pass other properties to the inner input field', () => {
    const component = new DateInputComponent({ 'aria-required': true });

    const input = component.input();

    expect(input.prop('aria-required')).toBe(true);
  });
});
