import moment from 'moment';

export const DATE_FORMAT = 'MM/DD/YYYY';
export const LONG_DATE_FORMAT = 'dddd, MMMM D YYYY';
export const DATE_PATTERN = '../../....';

export const isWeekInMonth = (weekDate, month) => {
  const date = weekDate.clone();
  const startingWeekDateMonth = date.startOf('week').month();
  const endingWeekDateMonth = date.endOf('week').month();
  if (startingWeekDateMonth === month || endingWeekDateMonth === month) {
    return true;
  }

  return false;
};

export const monthStartingWeekDates = monthDate => {
  const currentMonth = monthDate.month();
  const weekStartingDate = monthDate
    .clone()
    .startOf('month')
    .startOf('week');

  const monthWeeks = [];
  while (isWeekInMonth(weekStartingDate, currentMonth)) {
    monthWeeks.push(weekStartingDate.clone());
    weekStartingDate.add(1, 'week');
  }

  return monthWeeks;
};

export const daysOfWeek = (locale = 'en') => {
  const momentInLocale = moment.localeData(locale);
  const firstDayOfWeek = momentInLocale.firstDayOfWeek();
  const dayNames = momentInLocale.weekdaysShort();

  return [
    ...dayNames.slice(firstDayOfWeek),
    ...dayNames.slice(0, firstDayOfWeek)
  ];
};

export const monthNames = (locale = 'en') => {
  const momentInLocale = moment.localeData(locale);

  return momentInLocale.months();
};

export const parseDate = stringDate => {
  const DATE_REGEX = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const parsedDate = moment(stringDate, DATE_FORMAT);
  if (parsedDate.isValid() && DATE_REGEX.test(stringDate)) {
    return parsedDate;
  }
};

export const today = moment();
