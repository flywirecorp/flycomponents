import dayjs from 'dayjs';
import capitalize from '../capitalize';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export const DATE_FORMAT = 'MM/DD/YYYY';
export const DEFAULT_LOCALE = 'en';

const getLocaleData = locale =>
  dayjs()
    .locale(locale.toLowerCase())
    .localeData();

export const monthStartingWeekDates = (date, locale = DEFAULT_LOCALE) => {
  let firstDayOfWeek = dayjs(date)
    .locale(locale.toLowerCase())
    .startOf('month')
    .startOf('week');

  const lastDayOfMonth = dayjs(date)
    .locale(locale.toLowerCase())
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
  const dayNames = localeData.weekdaysShort().map(capitalize);
  const firstDayOfWeek = localeData.firstDayOfWeek();

  return [
    ...dayNames.slice(firstDayOfWeek),
    ...dayNames.slice(0, firstDayOfWeek)
  ];
};

export const monthNames = (locale = DEFAULT_LOCALE) => {
  const localeData = getLocaleData(locale);
  const months = localeData.months().map(capitalize);

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
