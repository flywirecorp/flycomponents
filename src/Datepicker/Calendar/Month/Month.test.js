import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';
import Month from './Month';
import Week from '../Week';

describe('Month', () => {
  class MonthComponent {
    constructor(ownProps) {
      const locale = 'EN';
      const defaultProps = {
        onDateClick: () => {},
        selectedDate: '',
        startDate: dayjs('2016-11-13')
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Month {...props} />, { locale });
    }

    month() {
      return this.component.find('tbody');
    }

    weeks() {
      return this.month().find(Week);
    }
  }

  test('has 5 weeks', () => {
    const startDate = dayjs('2016-11-13');
    const component = new MonthComponent({ startDate });

    expect(component.weeks()).toHaveLength(5);
  });
});
