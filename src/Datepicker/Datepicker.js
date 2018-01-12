import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { parseDateOrToday } from '../utils/date';
import Calendar from './Calendar';
import DateInput from './DateInput';
import FormGroup from '../FormGroup';

class Datepicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    hint: PropTypes.string,
    label: PropTypes.string,
    locale: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static defaultProps = {
    disabled: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false
  };

  static childContextTypes = {
    locale: PropTypes.string
  };

  constructor(props) {
    super(props);

    const { locale, value } = this.props;
    const startDate = parseDateOrToday(value);
    startDate.locale(locale);

    this.state = {
      isOpen: false,
      isFocused: false,
      selectedDate: value,
      startDate
    };
  }

  getChildContext() {
    const { locale } = this.props;
    return { locale };
  }

  componentDidMount() {
    document.addEventListener('click', this.hideOnDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideOnDocumentClick);
  }

  setSelectedDate = date => {
    const { name, onChange } = this.props;

    this.setState({ selectedDate: date });
    onChange(name, date);
  };

  setSelectedDateAndCloseCalendar = date => {
    this.setSelectedDate(date);

    this.setState(() => {
      return { isOpen: false };
    }, this.sendBlur);
  };

  handleFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });

    onFocus();
  };

  handleCalendarIconClick = () => {
    const { disabled, readOnly } = this.props;

    if (disabled || readOnly) {
      return;
    }

    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  handleDateInputClick = () => {
    const { isOpen } = this.state;
    const { disabled, readOnly } = this.props;

    if (disabled || isOpen || readOnly) {
      return;
    }
    this.setState({ isOpen: true });
  };

  handleMonthChange = month => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.set('month', month) };
    });
  };

  handleNextMonthClick = () => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.add(1, 'month') };
    });
  };

  handlePrevMonthClick = () => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.subtract(1, 'month') };
    });
  };

  handleYearChange = year => {
    this.setState(prevState => {
      return { startDate: prevState.startDate.set('year', year) };
    });
  };

  hideOnDocumentClick = e => {
    const { isOpen: wasOpen } = this.state;
    const { target } = e;
    const parentElement = findDOMNode(this);

    if (parentElement.contains(target)) {
      return;
    }

    const { selectedDate } = this.state;
    const startDate = parseDateOrToday(selectedDate);

    this.setState(() => {
      return { isOpen: false, startDate };
    }, wasOpen ? this.sendBlur : null);
  };

  handleBlur = () => {
    this.setState({ isFocused: false }, () => this.sendBlur());
  };

  sendBlur() {
    const { name, onBlur } = this.props;
    onBlur(name);
  }

  render() {
    const {
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      name,
      readOnly,
      required,
      value
    } = this.props;
    const { isOpen, isFocused, selectedDate, startDate } = this.state;

    return (
      <FormGroup
        disabled={disabled}
        error={error}
        floatingLabel={floatingLabel}
        isFocused={isOpen || isFocused}
        hasValue={!!selectedDate}
        hint={hint}
        label={label}
        name={name}
        required={required}
        readOnly={readOnly}
      >
        <div className={classNames('Datepicker', { 'is-open': isOpen })}>
          <DateInput
            disabled={disabled}
            name={name}
            onChange={() => {}}
            onCalendarIconClick={this.handleCalendarIconClick}
            onBlur={this.handleBlur}
            onClick={this.handleDateInputClick}
            onFocus={this.handleFocus}
            selectedDate={selectedDate}
            setSelectedDate={this.setSelectedDate}
            readOnly={readOnly}
            ref="dateInput"
            value={value}
          />
          <Calendar
            onDateClick={this.setSelectedDateAndCloseCalendar}
            onMonthChange={this.handleMonthChange}
            onNextMonthClick={this.handleNextMonthClick}
            onPrevMonthClick={this.handlePrevMonthClick}
            onYearChange={this.handleYearChange}
            selectedDate={selectedDate}
            startDate={startDate}
          />
        </div>
      </FormGroup>
    );
  }
}

export default Datepicker;
