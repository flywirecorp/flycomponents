import PropTypes from 'prop-types';
import React from 'react';
import FocusTrap from 'focus-trap-react';
import DayNames from './DayNames';
import Month from './Month';
import Navigation from './Navigation';
import {
  ENTER,
  ESC,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP
} from '../../utils/keycodes';
import { LONG_DATE_FORMAT } from '../../utils/date';

const Calendar = ({
  closeCalendar,
  focussedDate,
  forwardRef,
  isOpen,
  monthRef,
  name,
  nextMonthLabel,
  nextMonthRef,
  onDateClick,
  onMonthChange,
  onNextMonthClick,
  onPrevMonthClick,
  onYearChange,
  prevMonthLabel,
  prevMonthRef,
  selectMonthLabel,
  selectYearLabel,
  setDate,
  yearRef
}) => {
  const handleKeyDown = evt => {
    switch (evt.keyCode) {
      case ESC:
        evt.preventDefault();
        closeCalendar();
        break;
      case ARROW_UP:
        evt.preventDefault();
        setDate(focussedDate.subtract(1, 'week'));
        break;
      case ARROW_DOWN:
        evt.preventDefault();
        setDate(focussedDate.add(1, 'week'));
        break;
      case ARROW_LEFT:
        evt.preventDefault();
        setDate(focussedDate.subtract(1, 'day'));
        break;
      case ARROW_RIGHT:
        evt.preventDefault();
        setDate(focussedDate.add(1, 'day'));
        break;
    }
  };

  const calendar = (
    <div className="Calendar Datepicker-calendar" onKeyDown={handleKeyDown}>
      <Navigation
        focussedDate={focussedDate}
        monthRef={monthRef}
        nextMonthLabel={nextMonthLabel}
        nextMonthRef={nextMonthRef}
        onMonthChange={onMonthChange}
        onNextMonthClick={onNextMonthClick}
        onPrevMonthClick={onPrevMonthClick}
        onYearChange={onYearChange}
        prevMonthLabel={prevMonthLabel}
        prevMonthRef={prevMonthRef}
        selectMonthLabel={selectMonthLabel}
        selectYearLabel={selectYearLabel}
        yearRef={yearRef}
      />
      <table
        aria-activedescendant={`${focussedDate.month()}-${focussedDate.date()}`}
        aria-labelledby="datepicker-month-date"
        aria-readonly="true"
        className="Calendar-table"
        id={`${name}-calendar`}
        ref={forwardRef}
        role="grid"
        tabIndex={0}
        onKeyDown={evt => {
          if (evt.keyCode === ENTER) {
            evt.preventDefault();
            setDate(focussedDate);
            closeCalendar();
          }
        }}
      >
        <DayNames focussedDate={focussedDate} />
        <Month onDateClick={onDateClick} focussedDate={focussedDate} />
      </table>
      <div
        role="status"
        aria-live="polite"
        style={{
          border: '0px',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
          padding: '0px'
        }}
      >
        {focussedDate.format(LONG_DATE_FORMAT)}
      </div>
    </div>
  );

  return isOpen ? (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true
      }}
    >
      {calendar}
    </FocusTrap>
  ) : (
    <>{calendar}</>
  );
};

Calendar.propTypes = {
  closeCalendar: PropTypes.func.isRequired,
  focussedDate: PropTypes.object.isRequired,
  forwardRef: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  monthRef: PropTypes.object,
  name: PropTypes.string,
  nextMonthLabel: PropTypes.string,
  nextMonthRef: PropTypes.object,
  onDateClick: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  prevMonthLabel: PropTypes.string,
  prevMonthRef: PropTypes.object,
  selectMonthLabel: PropTypes.string,
  selectYearLabel: PropTypes.string,
  setDate: PropTypes.func.isRequired,
  yearRef: PropTypes.object
};

export default Calendar;
