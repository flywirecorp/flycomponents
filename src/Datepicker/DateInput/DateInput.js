import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CalendarIcon from './CalendarIcon';
import { format } from '../../utils/formatter';
import { BACKSPACE } from '../../utils/keycodes';
import { DATE_FORMAT, DATE_PATTERN } from '../../utils/date';

class DateInput extends Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onCalendarIconClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue && props.defaultValue.format(DATE_FORMAT)
    };
  }

  handleKeyDown = evt => {
    const { disabled, onKeyDown, readOnly } = this.props;
    if (readOnly || disabled) return false;

    const pressedKey = evt.which;

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
      disabled,
      error,
      name,
      onBlur,
      onCalendarIconClick,
      onFocus,
      readOnly,
      required
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
          onChange={() => {}}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={DATE_FORMAT}
          name={name}
          readOnly={readOnly}
          type="text"
          value={value}
          pattern="MM/DD/YYYY"
        />
        <span className="InputGroup-context">
          <CalendarIcon onClick={onCalendarIconClick} />
        </span>
      </div>
    );
  }
}

export default DateInput;
