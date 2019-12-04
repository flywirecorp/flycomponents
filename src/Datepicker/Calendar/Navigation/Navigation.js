import PropTypes from 'prop-types';
import React from 'react';
import Select from '../../../Select';
import { monthNames } from '../../../utils/date';

const NEXT_MONTH_LABEL = 'Go to next month';
const PREV_MONTH_LABEL = 'Go to previous month';
const SELECT_MONTH_LABEL = 'Select month';
const SELECT_YEAR_LABEL = 'Select year';

const Navigation = (
  {
    focussedDate,
    monthRef,
    nextMonthLabel,
    nextMonthRef,
    onMonthChange,
    onNextMonthClick,
    onPrevMonthClick,
    onYearChange,
    prevMonthLabel,
    prevMonthRef,
    selectMonthLabel,
    selectYearLabel,
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
          aria-label={prevMonthLabel}
          ref={prevMonthRef}
        >
          <span className="Icon Icon--arrowLeft Icon--xs" />
        </button>
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--month">
        <Select
          aria-label={selectMonthLabel}
          className="Calendar-header-navItem"
          selectedValue={currentMonth}
          onChange={handleMonthChange}
          onClick={handleClick}
          values={months}
          key={currentMonth}
          forwardRef={monthRef}
        />
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--year">
        <Select
          aria-label={selectYearLabel}
          className="Calendar-header-navItem"
          selectedValue={currentYear}
          onChange={handleYearChange}
          onClick={handleClick}
          values={years}
          key={currentYear}
          forwardRef={yearRef}
        />
      </div>
      <div className="Calendar-header-nav Calendar-header-nav--next">
        <button
          className="Button Button--default Calendar-header-navItem"
          onClick={onNextMonthClick}
          aria-label={nextMonthLabel}
          ref={nextMonthRef}
        >
          <span className="Icon Icon--arrowRight Icon--xs" />
        </button>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  focussedDate: PropTypes.object.isRequired,
  monthRef: PropTypes.object,
  nextMonthLabel: PropTypes.string,
  nextMonthRef: PropTypes.object,
  onMonthChange: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  prevMonthLabel: PropTypes.string,
  prevMonthRef: PropTypes.object,
  selectMonthLabel: PropTypes.string,
  selectYearLabel: PropTypes.string,
  yearRef: PropTypes.object
};

Navigation.defaultProps = {
  nextMonthLabel: NEXT_MONTH_LABEL,
  prevMonthLabel: PREV_MONTH_LABEL,
  selectMonthLabel: SELECT_MONTH_LABEL,
  selectYearLabel: SELECT_YEAR_LABEL
};

Navigation.contextTypes = {
  locale: PropTypes.string
};

export default Navigation;
