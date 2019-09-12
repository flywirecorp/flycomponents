import React from 'react';
import dayjs from 'dayjs';
import { monthNames } from '../../../utils/date';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

jest.mock('../../../utils/date', () => {
  return {
    monthNames: jest.fn(locale => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ])
  };
});

beforeEach(() => {
  monthNames.mockClear();
});

describe('Navigation', () => {
  class NavigationComponent {
    constructor(ownProps) {
      const FAKE_CALLBACK = () => {};
      const defaultProps = {
        onMonthChange: FAKE_CALLBACK,
        onNextMonthClick: FAKE_CALLBACK,
        onPrevMonthClick: FAKE_CALLBACK,
        onYearChange: FAKE_CALLBACK,
        startDate: dayjs('2016-11-13')
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Navigation {...props} />, {
        context: { locale: 'en' }
      });
    }

    navigation() {
      return this.component.find('.Calendar-header');
    }

    prevMonthButton() {
      return this.navigation().find('.Calendar-header-nav--prev button');
    }

    nextMonthButton() {
      return this.navigation().find('.Calendar-header-nav--next button');
    }

    monthSelector() {
      return this.navigation().find('.Calendar-header-nav--month Select');
    }

    monthSelectorLabels() {
      return this.monthSelector()
        .prop('values')
        .map(value => value.label);
    }

    yearSelector() {
      return this.navigation().find('.Calendar-header-nav--year Select');
    }

    yearSelectorLabels() {
      return this.yearSelector()
        .prop('values')
        .map(value => value.label);
    }

    simulatePrevMonthClick() {
      this.prevMonthButton().simulate('click');
    }

    simulateNextMonthClick() {
      this.nextMonthButton().simulate('click');
    }

    simulateSelectMonth(value) {
      this.monthSelector().simulate('change', { target: { value } });
    }
  }

  test('handles a previous month button click', () => {
    const onPrevMonthClick = jest.fn();
    const component = new NavigationComponent({ onPrevMonthClick });

    component.simulatePrevMonthClick();

    expect(onPrevMonthClick).toBeCalled();
  });

  test('handles a next month button click', () => {
    const onNextMonthClick = jest.fn();
    const component = new NavigationComponent({ onNextMonthClick });

    component.simulateNextMonthClick();

    expect(onNextMonthClick).toBeCalled();
  });

  test('handles the onChange event', () => {
    const onMonthChange = jest.fn();
    const component = new NavigationComponent({ onMonthChange });

    component.simulateSelectMonth(3);
    expect(onMonthChange).toBeCalledWith(3);
  });

  describe('month selector', () => {
    test('exists', async () => {
      const component = new NavigationComponent();
      await Promise.resolve();

      const monthSelector = component.monthSelector();
      const lastCall = monthNames.mock.calls.pop(0);

      expect(lastCall).toEqual(['en']);
      expect(monthSelector).toHaveLength(1);
      expect(monthSelector.prop('values')).toHaveLength(12);
    });
  });

  describe('year selector', () => {
    test('exists', () => {
      const component = new NavigationComponent();

      expect(component.yearSelector()).toHaveLength(1);
    });

    test('has a hundred of years', () => {
      const startDate = dayjs('2000-01-01');
      const component = new NavigationComponent({ startDate });
      const years = component.yearSelectorLabels();
      const firstYear = years[0];
      const lastYear = years[199];

      expect(years.length).toBe(200);
      expect(firstYear).toBe(1900);
      expect(lastYear).toBe(2099);
    });
  });
});
