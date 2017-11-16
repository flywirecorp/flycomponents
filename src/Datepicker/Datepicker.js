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
    error: PropTypes.string,
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
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {}
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

  handleCalendarIconClick = () => {
    const { readOnly } = this.props;

    if (readOnly) {
      return;
    }

    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  handleDateInputClick = () => {
    const { isOpen } = this.state;
    const { readOnly } = this.props;

    if (isOpen || readOnly) {
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

  sendBlur() {
    const { name, onBlur } = this.props;
    onBlur(name);
  }

  render() {
    const {
      error,
      hint,
      label,
      name,
      onFocus,
      readOnly,
      required,
      value
    } = this.props;
    const { isOpen, selectedDate, startDate } = this.state;

    return (
      <FormGroup
        error={error}
        hint={hint}
        label={label}
        name={name}
        required={required}
      >
        <div className={classNames('Datepicker', { 'is-open': isOpen })}>
          <DateInput
            name={name}
            onChange={() => {}}
            onCalendarIconClick={this.handleCalendarIconClick}
            onClick={this.handleDateInputClick}
            onFocus={onFocus}
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
