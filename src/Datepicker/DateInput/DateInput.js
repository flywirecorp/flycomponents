import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { applyPattern } from '../../utils/formatter';

const DATE_FORMAT = 'MM/DD/YYYY';
const DATE_PATTERN = '../../....';
const DELETE_KEYCODE = 8;

class DateInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onCalendarIconClick: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    selectedDate: PropTypes.string,
    setSelectedDate: PropTypes.func.isRequired
  };

  handleKeyDown = e => {
    const {
      disabled,
      selectedDate = '',
      setSelectedDate,
      readOnly
    } = this.props;
    const inputValue = `${selectedDate}${String.fromCharCode(e.which)}`;
    let value = inputValue.replace(/\D/g, '');

    if (readOnly || disabled) return false;

    if (e.which === DELETE_KEYCODE) {
      value = value.slice(0, -1);
    }

    const formatedDate = applyPattern(value, DATE_PATTERN);

    setSelectedDate(formatedDate);
  };

  render() {
    const {
      disabled,
      name,
      onCalendarIconClick,
      onBlur,
      onFocus,
      readOnly,
      selectedDate
    } = this.props;

    return (
      <div className="InputGroup" onClick={onCalendarIconClick}>
        <input
          disabled={disabled}
          autoComplete="off"
          className="Input InputGroup-input"
          id={name}
          onBlur={onBlur}
          onChange={() => {}}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={DATE_FORMAT}
          name={name}
          readOnly={readOnly}
          type="text"
          value={selectedDate}
        />
        <span className="InputGroup-context">
          <CalendarIcon />
        </span>
      </div>
    );
  }
}

export default DateInput;
