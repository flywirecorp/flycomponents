import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { applyPattern } from '../../utils/formatter';

const DATE_FORMAT = 'MM/DD/YYYY';
const DATE_PATTERN = '../../....';
const DELETE_KEYCODE = 8;

class DateInput extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onCalendarIconClick: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    selectedDate: PropTypes.string,
    setSelectedDate: PropTypes.func.isRequired
  };

  handleClick = e => {
    const { onClick } = this.props;
    this.handleFocus();
    onClick();
  };

  handleFocus() {
    const input = this.refs.input;
    input.focus();
  }

  handleKeyDown = e => {
    const { selectedDate = '', setSelectedDate, readOnly } = this.props;
    const inputValue = `${selectedDate}${String.fromCharCode(e.which)}`;
    let value = inputValue.replace(/\D/g, '');

    if (readOnly) return false;

    if (e.which === DELETE_KEYCODE) {
      value = value.slice(0, -1);
    }

    const formatedDate = applyPattern(value, DATE_PATTERN);

    setSelectedDate(formatedDate);
  };

  render() {
    const {
      name,
      onCalendarIconClick,
      onBlur,
      onFocus,
      readOnly,
      selectedDate
    } = this.props;
    const calendarIcon = <CalendarIcon />;

    return (
      <div className="InputGroup" onClick={onCalendarIconClick}>
        <input
          autoComplete="off"
          className="Input InputGroup-input"
          id={name}
          onBlur={onBlur}
          onChange={() => {}}
          onClick={this.handleClick}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={DATE_FORMAT}
          name={name}
          readOnly={readOnly}
          ref="input"
          type="text"
          value={selectedDate}
        />
        <span className="InputGroup-context">{calendarIcon}</span>
      </div>
    );
  }
}

export default DateInput;
