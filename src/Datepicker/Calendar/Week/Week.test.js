import React from 'react';
import { shallow } from 'enzyme';
import Week from '../Week';
import Day from '../Day';
import { Context } from '../../Datepicker';
import { parseDate, LONG_DATE_FORMAT } from '../../../utils/date';
import { fireEvent, render } from '@testing-library/react';

describe('Week', () => {
  const weekComponent = ownProps => {
    const NOVEMBER = 10;
    const defaultProps = {
      startingDate: parseDate('11/13/2016'),
      month: NOVEMBER,
      onDateClick: () => {},
      selectedDate: parseDate('11/18/2016')
    };
    const props = { ...defaultProps, ...ownProps };
    const tableBody = document.createElement('tbody');
    return render(
      <Context.Provider value={{ name: 'birthday' }}>
        <Week {...props} />
      </Context.Provider>,
      {
        container: document.body.appendChild(tableBody)
      }
    );
  };

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

    const { queryAllByRole, getByLabelText } = weekComponent({
      startingDate
    });
    const dayNodes = queryAllByRole('button');

    expect(dayNodes).toHaveLength(7);

    dayNodes.forEach(dayNode => {
      expect(dayNode).toHaveClass('Calendar-day');
    });

    const formattedFirstDate = startingDate.format(LONG_DATE_FORMAT);
    expect(getByLabelText(formattedFirstDate)).toBe(dayNodes[0]);

    const formattedLastDate = startingDate
      .add(6, 'day')
      .format(LONG_DATE_FORMAT);
    expect(getByLabelText(formattedLastDate)).toBe(dayNodes[6]);
  });

  test('sets current day', () => {
    const startingDate = parseDate('11/20/2016');
    const selectedDate = parseDate('11/22/2016');

    const { queryAllByRole, getByLabelText } = weekComponent({
      startingDate,
      selectedDate
    });
    const dayNodes = queryAllByRole('button');

    const formattedSelectedDate = selectedDate.format(LONG_DATE_FORMAT);
    expect(getByLabelText(formattedSelectedDate)).toBe(dayNodes[2]);
    expect(dayNodes[2]).toHaveClass('is-selected');
  });

  test('sets other month days as disabled', () => {
    const startingDate = parseDate('12/01/2019');

    const { queryAllByRole } = weekComponent({
      startingDate
    });
    const dayNodes = queryAllByRole('button');

    expect(dayNodes[0]).toHaveClass('is-disabled');
  });
});
