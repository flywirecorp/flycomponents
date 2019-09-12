import dayjs from 'dayjs';

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

const getLocaleDate = async locale =>
  import(`dayjs/locale/${locale.toLowerCase()}`);

export const monthStartingWeekDates = async (date, locale = DEFAULT_LOCALE) => {
  const { name: localeCode } = await getLocaleDate(locale);

  let firstDayOfWeek = dayjs(date)
    .locale(localeCode)
    .startOf('month')
    .startOf('week');

  const lastDayOfMonth = dayjs(date)
    .locale(localeCode)
    .endOf('month')
    .endOf('week');

  const firstDaysOfWeeks = [];

  do {
    firstDaysOfWeeks.push(firstDayOfWeek.clone());
    firstDayOfWeek = firstDayOfWeek.add(1, 'week');
  } while (firstDayOfWeek.isBefore(lastDayOfMonth));

  return firstDaysOfWeeks;
};

export const daysOfWeek = async (locale = DEFAULT_LOCALE) => {
  const { weekdaysShort, weekStart } = await getLocaleDate(locale);
  const firstDayOfWeek = valueOrDefault(weekStart, DEFAULT_WEEK_START);
  const dayNames = valueOrDefault(weekdaysShort, DEFAULT_WEEKDAYS_SHORT);

  return [
    ...dayNames.slice(firstDayOfWeek),
    ...dayNames.slice(0, firstDayOfWeek)
  ];
};

export const monthNames = async (locale = DEFAULT_LOCALE) => {
  const localeData = await getLocaleDate(locale);

  return valueOrDefault(localeData.months, DEFAULT_MONTH_NAMES);
};

export const parseDateOrToday = stringDate => {
  const DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const parsedDate = dayjs(stringDate, DATE_FORMAT);
  if (parsedDate.isValid() && DATE_REGEX.test(stringDate)) {
    return parsedDate;
  }

  return dayjs();
};
