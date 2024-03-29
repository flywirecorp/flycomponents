import React from 'react';
import Day from '../Day';
import { Context } from '../../Datepicker';
import { parseDate } from '../../../utils/date';
import { render } from '@testing-library/react';

describe('Day', () => {
  function DayComponent(ownProps) {
    const defaultProps = {
      current: false,
      date: parseDate('04/21/1979'),
      disabled: false,
      onDateClick: () => {},
      selected: false
    };
    const props = { ...defaultProps, ...ownProps };

    const tableRow = document.createElement('tr');
    return render(
      <Context.Provider value={{ name: 'birthday' }}>
        <Day {...props} />
      </Context.Provider>,
      {
        container: document.body.appendChild(tableRow)
      }
    );
  }

  test('renders a day', () => {
    const { getByText } = DayComponent();

    expect(getByText('21')).toBeInTheDocument();
  });

  test('sets day as current', () => {
    const { getByRole } = DayComponent({ current: true });

    expect(getByRole('button')).toHaveClass('is-current');
  });

  test('sets day as disabled', () => {
    const { getByRole } = DayComponent({ disabled: true });

    expect(getByRole('button')).toHaveClass('is-disabled');
  });

  test('sets day as selected', () => {
    const { getByRole } = DayComponent({ selected: true });

    expect(getByRole('button')).toHaveClass('is-selected');
  });
});
