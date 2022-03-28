import React from 'react';
import { Context } from '../../Datepicker';
import moment from 'moment';
import Navigation from './Navigation';
import { fireEvent, render } from '@testing-library/react';

describe('Navigation', () => {
  function NavigationComponent(ownProps) {
    const FAKE_CALLBACK = () => {};
    const defaultProps = {
      onMonthChange: FAKE_CALLBACK,
      onNextMonthClick: FAKE_CALLBACK,
      onPrevMonthClick: FAKE_CALLBACK,
      onYearChange: FAKE_CALLBACK,
      selectedDate: moment('2016-11-13')
    };
    const props = { ...defaultProps, ...ownProps };

    return render(
      <Context.Provider value={{ locale: 'en' }}>
        <Navigation {...props} />
      </Context.Provider>
    );
  }

  test('handles a previous month button click', () => {
    const onPrevMonthClick = jest.fn();
    const { getByLabelText } = NavigationComponent({ onPrevMonthClick });

    fireEvent.click(getByLabelText('Go to previous month'));

    expect(onPrevMonthClick).toBeCalled();
  });

  test('handles a next month button click', () => {
    const onNextMonthClick = jest.fn();
    const { getByLabelText } = NavigationComponent({ onNextMonthClick });

    fireEvent.click(getByLabelText('Go to next month'));

    expect(onNextMonthClick).toBeCalled();
  });

  test('handles the onChange event', () => {
    const onMonthChange = jest.fn();
    const { getByLabelText } = NavigationComponent({ onMonthChange });
    fireEvent.change(getByLabelText('Select month'), {
      target: { value: 3 }
    });
    expect(onMonthChange).toBeCalledWith('3');
  });

  describe('month selector', () => {
    test('exists', () => {
      const { getByLabelText } = NavigationComponent();

      expect(getByLabelText('Select month')).toBeInTheDocument();
      expect(getByLabelText('Select month').childNodes).toHaveLength(12);
    });
  });

  describe('year selector', () => {
    test('exists', () => {
      const { getByLabelText } = NavigationComponent();

      expect(getByLabelText('Select year')).toBeInTheDocument();
    });

    test('has a hundred of years', () => {
      const selectedDate = moment('2000-01-01');

      const { getByLabelText } = NavigationComponent({ selectedDate });
      const years = getByLabelText('Select year').childNodes;
      const firstYear = years[0];
      const lastYear = years[199];

      expect(years).toHaveLength(200);
      expect(firstYear.textContent).toBe('1900');
      expect(lastYear.textContent).toBe('2099');
    });
  });
});
