import {
  daysOfWeek,
  monthNames,
  monthStartingWeekDates,
  parseDate,
  DATE_FORMAT
} from './date';
import moment from 'moment';

describe('monthStartingWeekDates', () => {
  moment.locale('en');

  describe('when a month starts on a start-of-week (sunday)', () => {
    const date = moment('01/01/2017', DATE_FORMAT);

    test('returns the correct weeks', () => {
      const weeks = monthStartingWeekDates(date);
      const formatedWeeks = weeks.map(week => week.format(DATE_FORMAT));
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
    const date = moment('12/01/2016', DATE_FORMAT);

    test('returns the correct weeks', () => {
      const weeks = monthStartingWeekDates(date);
      const formatedWeeks = weeks.map(week => week.format(DATE_FORMAT));
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
    const date = moment('04/01/2017', DATE_FORMAT);

    test('returns the correct weeks', () => {
      const weeks = monthStartingWeekDates(date);
      const formatedWeeks = weeks.map(week => week.format(DATE_FORMAT));
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
  test('returns the days of week', () => {
    const days = daysOfWeek();
    const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expect(days).toEqual(expectedDays);
  });

  test('returns the days of week in the given locale', () => {
    const days = daysOfWeek('es');
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
  test('returs month names in the given locale', () => {
    const months = monthNames('es');
    const expectedMonths = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];

    expect(months).toEqual(expectedMonths);
  });
});

describe('parseDatey', () => {
  test('returns a parsed date is valid', () => {
    const date = parseDate('01/01/2016');
    const expectedDate = moment('01/01/2016', DATE_FORMAT);

    expect(date.format(DATE_FORMAT)).toBe(expectedDate.format(DATE_FORMAT));
  });

  test('returns undefined is invalid', () => {
    const date = parseDate('01/01');

    expect(date).toBeUndefined();
  });
});
