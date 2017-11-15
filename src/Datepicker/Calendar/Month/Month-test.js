import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';
import Month from './Month';
import Week from '../Week';

describe('Month', () => {
  class MonthComponent {
    constructor(ownProps) {
      const defaultProps = {
        onDateClick: () => {},
        selectedDate: '',
        startDate: moment('2016-11-13')
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

  it('has 5 weeks', () => {
    const startDate = moment('2016-11-13');
    const component = new MonthComponent({ startDate });

    expect(component.weeks()).to.have.length(5);
  });
});
