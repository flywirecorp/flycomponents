import React from 'react';
import { shallow } from 'enzyme';
import Week from '../Week';
import Day from '../Day';
import { parseDate } from '../../../utils/date';

describe('Week', () => {
  class WeekComponent {
    constructor(ownProps) {
      const NOVEMBER = 10;
      const defaultProps = {
        startingDate: parseDate('11/13/2016'),
        month: NOVEMBER,
        onDateClick: () => {},
        selectedDate: parseDate('11/18/2016')
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Week {...props} />);
    }

    days() {
      return this.component.find(Day);
    }
  }

  test('has 7 days', () => {
    const startingDate = parseDate('11/20/2016');
    const component = new WeekComponent({ startingDate });
    const days = component.days();
    expect(days).toHaveLength(7);

    expect(
      days
        .first()
        .prop('date')
        .isSame(startingDate, 'day')
    ).toBe(true);

    expect(
      days
        .last()
        .prop('date')
        .isSame(startingDate.add(6, 'day'), 'day')
    ).toBe(true);
  });

  test('sets current day', () => {
    const startingDate = parseDate('11/20/2016');
    const selectedDate = parseDate('11/20/2016');
    const component = new WeekComponent({ startingDate, selectedDate });

    expect(
      component
        .days()
        .first()
        .prop('selected')
    ).toBe(true);
  });

  test('sets other month days as disabled', () => {
    const startingDate = parseDate('12/01/2019');
    const component = new WeekComponent({ startingDate });

    expect(
      component
        .days()
        .first()
        .prop('disabled')
    ).toBe(true);
  });
});
