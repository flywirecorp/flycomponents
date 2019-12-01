import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Month from './Month';
import Week from '../Week';

describe('Month', () => {
  class MonthComponent {
    constructor(ownProps) {
      const defaultProps = {
        onDateClick: () => {},
        selectedDate: '',
        focussedDate: moment('2016-11-13')
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Month {...props} />);
    }

    month() {
      return this.component.find('tbody');
    }

    weeks() {
      return this.month().find(Week);
    }
  }

  test('has 5 weeks', () => {
    const focussedDate = moment('2016-11-13');
    const component = new MonthComponent({ focussedDate });

    expect(component.weeks()).toHaveLength(5);
  });
});
