import React from 'react';
import { shallow } from 'enzyme';
import Day from '../Day';
import { parseDate } from '../../../utils/date';
import { SPACE, ENTER } from '../../../utils/keycodes';

describe('Day', () => {
  class DayComponent {
    constructor(ownProps) {
      const defaultProps = {
        current: false,
        date: parseDate('04/21/1979'),
        disabled: false,
        onDateClick: () => {},
        selected: false
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Day {...props} />);
    }

    day() {
      return this.component.find('.Calendar-day');
    }

    dayOfMonth() {
      return this.day().text();
    }

    isDisabled() {
      return this.day().hasClass('is-disabled');
    }

    isSelected() {
      return this.day().hasClass('is-selected');
    }

    isCurrent() {
      return this.day().hasClass('is-current');
    }

    simulateKeyPress(keyCode) {
      this.day().simulate('keyDown', {
        keyCode,
        preventDefault: () => {}
      });
    }
  }

  test('renders a day', () => {
    const component = new DayComponent();

    expect(component.dayOfMonth()).toBe('21');
  });

  test('sets day as current', () => {
    const component = new DayComponent({ current: true });

    expect(component.isCurrent()).toBe(true);
  });

  test('sets day as disabled', () => {
    const component = new DayComponent({ disabled: true });

    expect(component.isDisabled()).toBe(true);
  });

  test('sets day as selected', () => {
    const component = new DayComponent({ selected: true });

    expect(component.isSelected()).toBe(true);
  });

  test('sets current day when Enter key pressed', () => {
    const date = parseDate('04/21/1979');
    const onDateClick = jest.fn();
    const component = new DayComponent({ date, onDateClick });

    [SPACE, ENTER].forEach(key => {
      component.simulateKeyPress(key);
      expect(onDateClick).toBeCalledWith(date);
    });
  });
});
