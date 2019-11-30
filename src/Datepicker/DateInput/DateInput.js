import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { format } from '../../utils/formatter';
import { BACKSPACE } from '../../utils/keycodes';

const DATE_FORMAT = 'MM/DD/YYYY';
const DATE_PATTERN = '../../....';

class DateInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onCalendarIconClick: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
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

    if (e.which === BACKSPACE) {
      value = value.slice(0, -1);
    }

    const formatedDate = format(value, { pattern: DATE_PATTERN });

    setSelectedDate(formatedDate);
  };

  render() {
    const {
      disabled,
      error,
      name,
      onBlur,
      onCalendarIconClick,
      onFocus,
      readOnly,
      required,
      selectedDate
    } = this.props;

    return (
      <div className="InputGroup" onClick={onCalendarIconClick}>
        <input
          aria-describedby={`${name}-error-msg`}
          aria-disabled={disabled}
          aria-invalid={!!error}
          aria-labelledby={`${name}-label`}
          aria-readonly={readOnly}
          aria-required={required}
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
