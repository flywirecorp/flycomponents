import PropTypes from 'prop-types';
import React from 'react';
import Select from '../../../Select';
import { monthNames } from '../../../utils/date';

const Navigation = (
  {
    focussedDate,
    monthRef,
    nextMonthRef,
    onMonthChange,
    onNextMonthClick,
    onPrevMonthClick,
    onYearChange,
    prevMonthRef,
    yearRef
  },
  { locale }
) => {
  const currentMonth = focussedDate.month();
  const currentYear = focussedDate.year();
  const months = monthNames(locale).map((month, i) => ({
    value: i,
    label: month
  }));

  const years = [...Array(200).keys()].map(i => {
    const year = currentYear - 100 + i;
    return { value: year, label: year };
  });

  const handleClick = evt => {
    evt.stopPropagation();
  };

  const handleMonthChange = evt => {
    evt.stopPropagation();
    const month = evt.target.value;
    onMonthChange(month);
  };

  const handleYearChange = evt => {
    evt.stopPropagation();
    const year = evt.target.value;
    onYearChange(year);
  };

  return (
    <nav className="Calendar-header">
      <div className="Calendar-header-nav Calendar-header-nav--prev">
        <button
          className="Button Button--default Calendar-header-navItem"
          onClick={onPrevMonthClick}
          aria-label="Previous month"
          ref={prevMonthRef}
        >
          <span className="Icon Icon--arrowLeft Icon--xs" />
        </button>
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--month">
        <Select
          className="Calendar-header-navItem"
          selectedValue={currentMonth}
          onChange={handleMonthChange}
          onClick={handleClick}
          values={months}
          key={currentMonth}
          aria-label="Month"
          forwardRef={monthRef}
        />
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--year">
        <Select
          className="Calendar-header-navItem"
          selectedValue={currentYear}
          onChange={handleYearChange}
          onClick={handleClick}
          values={years}
          key={currentYear}
          aria-label="Year"
          forwardRef={yearRef}
        />
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--next">
        <button
          className="Button Button--default Calendar-header-navItem"
          onClick={onNextMonthClick}
          aria-label="Next month"
          ref={nextMonthRef}
        >
          <span className="Icon Icon--arrowRight Icon--xs" />
        </button>
      </div>
    </nav>
  );
};

const { func, object, string } = PropTypes;

Navigation.propTypes = {
  focussedDate: object.isRequired,
  monthRef: object,
  nextMonthRef: object,
  onMonthChange: func.isRequired,
  onNextMonthClick: func.isRequired,
  onPrevMonthClick: func.isRequired,
  onYearChange: func.isRequired,
  prevMonthRef: object,
  yearRef: object
};

Navigation.contextTypes = {
  locale: string
};

export default Navigation;
