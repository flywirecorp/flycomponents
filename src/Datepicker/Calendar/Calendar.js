import PropTypes from 'prop-types';
import React from 'react';
import FocusTrap from 'focus-trap-react';
import DayNames from './DayNames';
import Month from './Month';
import Navigation from './Navigation';
import { ESC } from '../../utils/keycodes';

const Calendar = ({
  closeCalendar,
  onDateClick,
  onMonthChange,
  onNextMonthClick,
  onPrevMonthClick,
  onYearChange,
  selectedDate,
  startDate,
  isOpen
}) => {
  const handleKeyDown = evt => {
    switch (evt.keyCode) {
      case ESC:
        closeCalendar();
        break;
    }
  };

  const calendar = (
    <div className="Calendar Datepicker-calendar" onKeyDown={handleKeyDown}>
      <Navigation
        onMonthChange={onMonthChange}
        onNextMonthClick={onNextMonthClick}
        onPrevMonthClick={onPrevMonthClick}
        onYearChange={onYearChange}
        startDate={startDate}
      />
      <table className="Calendar-table">
        <DayNames startDate={startDate} />
        <Month
          onDateClick={onDateClick}
          selectedDate={selectedDate}
          startDate={startDate}
        />
      </table>
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

const { bool, func, object, string } = PropTypes;

Calendar.propTypes = {
  closeCalendar: func.isRequired,
  isOpen: bool.isRequired,
  onDateClick: func.isRequired,
  onMonthChange: func.isRequired,
  onNextMonthClick: func.isRequired,
  onPrevMonthClick: func.isRequired,
  onYearChange: func.isRequired,
  selectedDate: string,
  startDate: object.isRequired
};

export default Calendar;
