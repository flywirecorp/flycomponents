import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { format } from '../../utils/formatter';
import { BACKSPACE, ENTER } from '../../utils/keycodes';
import { DATE_FORMAT, DATE_PATTERN } from '../../utils/date';
import Input from '../../Input';

class DateInput extends Component {
  static propTypes = {
    autoOpenPicker: PropTypes.bool,
    calendarIconLabel: PropTypes.string,
    dateFormat: PropTypes.string,
    datePattern: PropTypes.string,
    defaultValue: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    forwardRef: PropTypes.object,
    hint: PropTypes.string,
    label: PropTypes.string,
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
      value:
        props.defaultValue && props.defaultValue.format(this.props.dateFormat)
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

        return { value: format(value, { pattern: this.props.datePattern }) };
      },
      () => onKeyDown(this.state.value)
    );
  };

  render() {
    const { value } = this.state;
    const {
      autoOpenPicker,
      calendarIconLabel,
      dateFormat,
      datePattern,
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
      hint,
      label,
      ...otherProps
    } = this.props;

    const onClickEvent = { onClick: onCalendarIconClick };
    let dateInputClickEvent, calendarIconClickEvent;
    if (autoOpenPicker) {
      dateInputClickEvent = onClickEvent;
    } else {
      calendarIconClickEvent = onClickEvent;
    }

    return (
      <div className="InputGroup" {...dateInputClickEvent}>
        <Input
          ariaDescribedBy={`${name}-status`}
          disabled={disabled}
          autoComplete="off"
          className="Input InputGroup-input"
          id={name}
          onChange={() => {}}
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={dateFormat}
          name={name}
          readOnly={readOnly}
          required={required}
          type="text"
          value={value}
          pattern={datePattern}
          forwardRef={forwardRef}
          error={error}
          hint={hint}
          label={label}
          {...otherProps}
        />
        <span className="InputGroup-context">
          <CalendarIcon
            label={calendarIconLabel}
            hasError={!!error}
            {...calendarIconClickEvent}
          />
        </span>
      </div>
    );
  }
}

DateInput.defaultProps = {
  dateFormat: DATE_FORMAT,
  datePattern: DATE_PATTERN
};

export default DateInput;
