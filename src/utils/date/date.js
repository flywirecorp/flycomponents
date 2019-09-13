import dayjs from 'dayjs';
import capitalize from '../capitalize';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/id';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/pt';
import 'dayjs/locale/zh-cn';

dayjs.extend(localeData);

export const DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_LOCALE = 'en';
const DEFAULT_WEEK_START = 0;
const DEFAULT_WEEKDAYS_SHORT = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

const DEFAULT_MONTH_NAMES = [
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
];

const valueOrDefault = (value, defaultValue) => {
  if (typeof value === 'object') {
    return Object.keys(value).length ? value : defaultValue;
  }

  return value || defaultValue;
};

const getLocaleData = locale =>
  dayjs()
    .locale(locale.toLowerCase())
    .localeData();

export const monthStartingWeekDates = (date, locale = DEFAULT_LOCALE) => {
  let firstDayOfWeek = dayjs(date)
    .startOf('month')
    .startOf('week');

  const lastDayOfMonth = dayjs(date)
    .endOf('month')
    .endOf('week');

  const firstDaysOfWeeks = [];

  do {
    firstDaysOfWeeks.push(firstDayOfWeek.clone());
    firstDayOfWeek = firstDayOfWeek.add(1, 'week');
  } while (firstDayOfWeek.isBefore(lastDayOfMonth));

  return firstDaysOfWeeks;
};

export const daysOfWeek = (locale = DEFAULT_LOCALE) => {
  const localeData = getLocaleData(locale);
  const weekdaysShort = localeData.weekdaysShort();
  const weekStart = localeData.firstDayOfWeek();
  const firstDayOfWeek = valueOrDefault(weekStart, DEFAULT_WEEK_START);
  const dayNames = valueOrDefault(weekdaysShort, DEFAULT_WEEKDAYS_SHORT).map(
    capitalize
  );

  return [
    ...dayNames.slice(firstDayOfWeek),
    ...dayNames.slice(0, firstDayOfWeek)
  ];
};

export const monthNames = (locale = DEFAULT_LOCALE) => {
  const localeData = getLocaleData(locale);
  const months = valueOrDefault(localeData.months(), DEFAULT_MONTH_NAMES).map(
    capitalize
  );

  return months;
};

export const parseDateOrToday = stringDate => {
  const DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const parsedDate = dayjs(stringDate, DATE_FORMAT);
  if (parsedDate.isValid() && DATE_REGEX.test(stringDate)) {
    return parsedDate;
  }

  return dayjs();
};
