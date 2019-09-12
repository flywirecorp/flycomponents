import {
  daysOfWeek,
  monthNames,
  monthStartingWeekDates,
  parseDateOrToday
} from './date';

import dayjs from 'dayjs';

describe('monthStartingWeekDates', () => {
  const dateFormat = 'MM/DD/YYYY';

  describe('when a month starts on a start-of-week (sunday)', () => {
    const date = dayjs('01/01/2017', dateFormat);

    test('returns the correct weeks', async () => {
      const weeks = await monthStartingWeekDates(date);
      const formatedWeeks = weeks.map(week => week.format(dateFormat));
      const expectedWeeks = [
        '01/01/2017',
        '01/08/2017',
        '01/15/2017',
        '01/22/2017',
        '01/29/2017'
      ];

      expect(formatedWeeks).toEqual(expectedWeeks);
    });
  });

  describe('when a month ends on a end-of-week (saturday)', () => {
    const date = dayjs('12/01/2016', dateFormat);

    test('returns the correct weeks', async () => {
      const weeks = await monthStartingWeekDates(date);
      const formatedWeeks = weeks.map(week => week.format(dateFormat));
      const expectedWeeks = [
        '11/27/2016',
        '12/04/2016',
        '12/11/2016',
        '12/18/2016',
        '12/25/2016'
      ];

      expect(formatedWeeks).toEqual(expectedWeeks);
    });
  });

  describe('when a month starts on a end-of-week and end on a start-of-week', () => {
    const date = dayjs('04/01/2017', dateFormat);

    test('returns the correct weeks', async () => {
      const weeks = await monthStartingWeekDates(date);
      const formatedWeeks = weeks.map(week => week.format(dateFormat));
      const expectedWeeks = [
        '03/26/2017',
        '04/02/2017',
        '04/09/2017',
        '04/16/2017',
        '04/23/2017',
        '04/30/2017'
      ];

      expect(formatedWeeks).toEqual(expectedWeeks);
    });
  });
});

describe('daysOfWeek', () => {
  test('returns the days of week', async () => {
    const days = await daysOfWeek();
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expect(days).toEqual(expectedDays);
  });

  test('returns the days of week in the given locale', async () => {
    const days = await daysOfWeek('es');
    const expectedDays = [
      'lun.',
      'mar.',
      'mié.',
      'jue.',
      'vie.',
      'sáb.',
      'dom.'
    ];

    expect(days).toEqual(expectedDays);
  });
});

describe('monthNames', () => {
  test('returs month names in the given locale', async () => {
    const months = await monthNames('es');
    const expectedMonths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    expect(months).toEqual(expectedMonths);
  });
});

describe('parseDateOrToday', () => {
  const dateFormat = 'MM/DD/YYYY';

  describe('passing a string date', () => {
    const date = parseDateOrToday('01/01/2016');

    test('returns a parsed date', () => {
      const expectedDate = dayjs('01/01/2016', dateFormat);

      expect(date.format(dateFormat)).toBe(expectedDate.format(dateFormat));
    });
  });

  describe('passing no valid string date', () => {
    const date = parseDateOrToday('01/01');

    test('returns a parsed date', () => {
      const expectedDate = dayjs();

      expect(date.format(dateFormat)).toBe(expectedDate.format(dateFormat));
    });
  });
});
