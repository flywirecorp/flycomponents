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
  isOpen,
  monthRef,
  nextMonthRef,
  onDateClick,
  onMonthChange,
  onNextMonthClick,
  onPrevMonthClick,
  onYearChange,
  prevMonthRef,
  setDate,
  yearRef
}) => {
  const handleCalendarKeyDown = evt => {
    switch (evt.keyCode) {
      case ESC:
        closeCalendar();
        break;
      case ARROW_UP:
      case ARROW_DOWN:
      case ARROW_LEFT:
      case ARROW_RIGHT:
        evt.preventDefault();
        break;
    }
  };

  const handlePickerKeyDown = evt => {
    switch (evt.keyCode) {
      case ENTER:
        closeCalendar();
        break;
      case ARROW_UP:
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
    <div
      className="Calendar Datepicker-calendar"
      onKeyDown={handleCalendarKeyDown}
    >
      <Navigation
        focussedDate={focussedDate}
        monthRef={monthRef}
        nextMonthRef={nextMonthRef}
        onMonthChange={onMonthChange}
        onNextMonthClick={onNextMonthClick}
        onPrevMonthClick={onPrevMonthClick}
        onYearChange={onYearChange}
        prevMonthRef={prevMonthRef}
        yearRef={yearRef}
      />
      <table
        role="grid"
        aria-readonly="true"
        aria-activedescendant={`${focussedDate.month()}-${focussedDate.date()}`}
        aria-labelledby="datepicker-month-date"
        tabIndex="0"
        className="Calendar-table"
        onKeyDown={handlePickerKeyDown}
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
    <React.Fragment>{calendar}</React.Fragment>
  );
};

Calendar.propTypes = {
  closeCalendar: PropTypes.func.isRequired,
  focussedDate: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  monthRef: PropTypes.object,
  nextMonthRef: PropTypes.object,
  onDateClick: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  prevMonthRef: PropTypes.object,
  setDate: PropTypes.func.isRequired,
  yearRef: PropTypes.object
};

export default Calendar;
