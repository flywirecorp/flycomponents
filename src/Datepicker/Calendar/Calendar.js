import PropTypes from 'prop-types';
import React from 'react';
import FocusTrap from 'focus-trap-react';
import DayNames from './DayNames';
import Month from './Month';
import Navigation from './Navigation';
import {
  ESC,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ENTER
} from '../../utils/keycodes';

const Calendar = ({
  closeCalendar,
  onDateClick,
  onMonthChange,
  onNextMonthClick,
  onPrevMonthClick,
  onYearChange,
  setDate,
  startDate,
  isOpen
}) => {
  const handleKeyDown = evt => {
    switch (evt.keyCode) {
      case ESC:
        closeCalendar();
        break;
      case ENTER:
        evt.preventDefault();
        setDate(startDate);
        closeCalendar();
        break;
      case ARROW_UP:
        evt.preventDefault();
        setDate(startDate.subtract(1, 'week'));
        break;
      case ARROW_DOWN:
        evt.preventDefault();
        setDate(startDate.add(1, 'week'));
        break;
      case ARROW_LEFT:
        evt.preventDefault();
        setDate(startDate.subtract(1, 'day'));
        break;
      case ARROW_RIGHT:
        evt.preventDefault();
        setDate(startDate.add(1, 'day'));
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
      <table className="Calendar-table" role="presentation">
        <DayNames startDate={startDate} />
        <Month onDateClick={onDateClick} startDate={startDate} />
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

const { bool, func, object } = PropTypes;

Calendar.propTypes = {
  closeCalendar: func.isRequired,
  isOpen: bool.isRequired,
  onDateClick: func.isRequired,
  onMonthChange: func.isRequired,
  onNextMonthClick: func.isRequired,
  onPrevMonthClick: func.isRequired,
  onYearChange: func.isRequired,
  setDate: func.isRequired,
  startDate: object.isRequired
};

export default Calendar;
