import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { parseDateOrToday } from '../utils/date';
import Calendar from './Calendar';
import DateInput from './DateInput';
import FormGroup from '../FormGroup';

const DATEPICKER_HEIGHT = 420;
const REQUIRED_SIZE_ABOVE = 780;

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

  static childContextTypes = {
    locale: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false
  };

  constructor(props) {
    super(props);

    const { locale, value } = this.props;
    const startDate = parseDateOrToday(value);
    startDate.locale(locale);

    this.datepickerRef = React.createRef();

    this.state = {
      isOpen: false,
      isFocused: false,
      isAbove: false,
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

  componentDidUpdate() {
    window.addEventListener('resize', this.setStyles);
    window.addEventListener('scroll', this.setStyles);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideOnDocumentClick);
    window.removeEventListener('resize', this.setStyles);
    window.removeEventListener('scroll', this.setStyles);
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

  handleBlur = () => {
    this.setState({ isFocused: false }, () => this.sendBlur());
  };

  handleCalendarIconClick = () => {
    const { disabled, readOnly } = this.props;

    if (disabled || readOnly) {
      return;
    }

    this.setStyles();

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
    this.setStyles();
  };

  handleFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });

    onFocus();
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

  get datepickerBottomPosition() {
    const element = this.datepickerRef.current;

    const { top: datepickerTopPosition } = element.getBoundingClientRect();
    return datepickerTopPosition + DATEPICKER_HEIGHT;
  }

  get fitsAbove() {
    return this.datepickerBottomPosition > REQUIRED_SIZE_ABOVE;
  }

  get fitsBelow() {
    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    return viewportHeight >= this.datepickerBottomPosition;
  }

  setStyles = () => {
    const element = this.datepickerRef.current;
    if (!element) return false;

    const isAbove = !this.fitsBelow && this.fitsAbove;
    this.setState({ isAbove: isAbove });
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
    const { isOpen, isFocused, isAbove, selectedDate, startDate } = this.state;

    return (
      <FormGroup
        disabled={disabled}
        error={error}
        floatingLabel={floatingLabel}
        isFocused={isOpen || isFocused}
        hasValue={!!selectedDate}
        hasSuffix
        hint={hint}
        label={label}
        name={name}
        required={required}
        readOnly={readOnly}
      >
        <div
          className={classNames(
            'Datepicker',
            { 'is-open': isOpen },
            { 'is-reverse': isAbove }
          )}
          ref={this.datepickerRef}
        >
          <DateInput
            disabled={disabled}
            error={error}
            floatingLabel={floatingLabel}
            name={name}
            onBlur={this.handleBlur}
            onCalendarIconClick={this.handleCalendarIconClick}
            onChange={() => {}}
            onClick={this.handleDateInputClick}
            onFocus={this.handleFocus}
            readOnly={readOnly}
            required={required}
            selectedDate={selectedDate}
            setSelectedDate={this.setSelectedDate}
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
            isOpen={isOpen}
          />
        </div>
      </FormGroup>
    );
  }
}

export default Datepicker;
