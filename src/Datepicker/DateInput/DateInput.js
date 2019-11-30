import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { format } from '../../utils/formatter';
import { BACKSPACE } from '../../utils/keycodes';
import { DATE_FORMAT, DATE_PATTERN } from '../../utils/date';

class DateInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onCalendarIconClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.sting
  };

  handleKeyDown = evt => {
    const { disabled, value, onKeyDown, readOnly } = this.props;
    const inputValue = `${value}${String.fromCharCode(evt.which)}`;
    let newValue = inputValue.replace(/\D/g, '');

    if (readOnly || disabled) return false;
    if (evt.which === BACKSPACE) {
      newValue = newValue.slice(0, -1);
    }

    const formatedDate = format(newValue, { pattern: DATE_PATTERN });
    onKeyDown(formatedDate);
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
      value
    } = this.props;

    return (
      <div className="InputGroup">
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
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={DATE_FORMAT}
          name={name}
          readOnly={readOnly}
          type="text"
          value={value}
        />
        <span className="InputGroup-context">
          <CalendarIcon onClick={onCalendarIconClick} />
        </span>
      </div>
    );
  }
}

export default DateInput;
