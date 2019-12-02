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
  ARROW_UP
} from '../../utils/keycodes';

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
  const handleKeyDown = evt => {
    switch (evt.keyCode) {
      case ESC:
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
        nextMonthRef={nextMonthRef}
        onMonthChange={onMonthChange}
        onNextMonthClick={onNextMonthClick}
        onPrevMonthClick={onPrevMonthClick}
        onYearChange={onYearChange}
        prevMonthRef={prevMonthRef}
        yearRef={yearRef}
      />
      <table className="Calendar-table" role="presentation">
        <DayNames focussedDate={focussedDate} />
        <Month onDateClick={onDateClick} focussedDate={focussedDate} />
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
          {focussedDate.format('LL')}
        </div>
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
  focussedDate: object.isRequired,
  isOpen: bool.isRequired,
  monthRef: object,
  nextMonthRef: object,
  onDateClick: func.isRequired,
  onMonthChange: func.isRequired,
  onNextMonthClick: func.isRequired,
  onPrevMonthClick: func.isRequired,
  onYearChange: func.isRequired,
  prevMonthRef: object,
  setDate: func.isRequired,
  yearRef: object
};

export default Calendar;
