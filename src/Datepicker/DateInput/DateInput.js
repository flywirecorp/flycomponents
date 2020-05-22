import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { format } from '../../utils/formatter';
import { BACKSPACE, ENTER } from '../../utils/keycodes';
import { DATE_FORMAT, DATE_PATTERN } from '../../utils/date';

class DateInput extends Component {
  static propTypes = {
    calendarIconLabel: PropTypes.string,
    defaultValue: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    forwardRef: PropTypes.object,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onCalendarIconClick: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    toggleCalendar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue && props.defaultValue.format(DATE_FORMAT)
    };
  }

  handleKeyDown = evt => {
    const { disabled, onKeyDown, readOnly, toggleCalendar } = this.props;
    if (readOnly || disabled) return false;

    const pressedKey = evt.which;

    if (pressedKey === ENTER) {
      toggleCalendar();
      return;
    }

    this.setState(
      prevState => {
        const inputValue = `${prevState.value}${String.fromCharCode(
          pressedKey
        )}`;
        let value = inputValue.replace(/\D/g, '');
        if (pressedKey === BACKSPACE) value = value.slice(0, -1);

        return { value: format(value, { pattern: DATE_PATTERN }) };
      },
      () => onKeyDown(this.state.value)
    );
  };

  render() {
    const { value } = this.state;
    const {
      calendarIconLabel,
      defaultValue,
      disabled,
      error,
      forwardRef,
      name,
      onBlur,
      onCalendarIconClick,
      onClick,
      onFocus,
      onKeyDown,
      readOnly,
      required,
      toggleCalendar,
      ...otherProps
    } = this.props;

    return (
      <div className="InputGroup">
        <input
          aria-describedby={`${name}-error-msg ${name}-status`}
          aria-disabled={disabled}
          aria-invalid={!!error}
          aria-labelledby={`${name}-label`}
          aria-readonly={readOnly}
          disabled={disabled}
          autoComplete="off"
          className="Input InputGroup-input"
          id={name}
          onChange={() => {}}
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={DATE_FORMAT}
          name={name}
          readOnly={readOnly}
          required={required}
          type="text"
          value={value}
          pattern={DATE_PATTERN}
          ref={forwardRef}
          {...otherProps}
        />
        <span className="InputGroup-context">
          <CalendarIcon
            onClick={onCalendarIconClick}
            label={calendarIconLabel}
            hasError={!!error}
          />
        </span>
      </div>
    );
  }
}

export default DateInput;
