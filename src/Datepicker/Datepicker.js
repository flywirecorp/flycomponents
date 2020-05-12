import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { parseDate, today, DATE_FORMAT } from '../utils/date';
import debounce from '../utils/debounce';
import Calendar from './Calendar';
import DateInput from './DateInput';
import FormGroup from '../FormGroup';

const EMPTY_STRING = '';
const WAIT_TO_FOCUS = 50;
const WAIT_TO_UPDATE = 150;
const DATEPICKER_HEIGHT = 420;
const REQUIRED_SIZE_ABOVE = 780;

const getA11yStatusMessage = ({ isOpen }) => {
  return isOpen
    ? 'Use tab or arrow keys to navigate the days or Escape key to close.'
    : 'Enter a date in the format MM/DD/YYYY, or press Enter key to open a calendar.';
};

class Datepicker extends Component {
  static propTypes = {
    calendarIconLabel: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    getA11yStatusMessage: PropTypes.func,
    hint: PropTypes.string,
    label: PropTypes.string,
    locale: PropTypes.string,
    name: PropTypes.string.isRequired,
    nextMonthLabel: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    prevMonthLabel: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    selectMonthLabel: PropTypes.string,
    selectYearLabel: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static childContextTypes = {
    locale: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    getA11yStatusMessage: getA11yStatusMessage,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false
  };

  constructor(props) {
    super(props);

    const { locale, value } = this.props;
    const initDate = parseDate(value);

    today.locale(locale);
    initDate && initDate.locale(locale);

    this.datepickerRef = React.createRef();
    this.calendarRef = React.createRef();
    this.dateInputRef = React.createRef();
    this.monthRef = React.createRef();
    this.nextMonthRef = React.createRef();
    this.prevMonthRef = React.createRef();
    this.yearRef = React.createRef();
    this.formGroupRef = React.createRef();

    this.state = {
      a11yStatusMessage: EMPTY_STRING,
      isOpen: false,
      isFocused: false,
      isAbove: false,
      selectedDate: initDate,
      focussedDate: initDate || today
    };
  }

  getChildContext() {
    const { locale } = this.props;
    return { locale };
  }

  componentDidMount() {
    this.updateA11yMessage();

    document.addEventListener('click', this.hideOnDocumentClick);
  }

  componentDidUpdate() {
    this.updateA11yMessage();

    window.addEventListener('resize', this.setStyles);
    window.addEventListener('scroll', this.setStyles);
  }

  componentWillUnmount() {
    if (this.updateA11yMessageDebounce) this.updateA11yMessageDebounce.cancel();
    document.removeEventListener('click', this.hideOnDocumentClick);
    window.removeEventListener('resize', this.setStyles);
    window.removeEventListener('scroll', this.setStyles);
  }

  setDate = date => {
    const { name, onChange } = this.props;
    const formattedDate = date.format(DATE_FORMAT);

    this.setState({ focussedDate: date, selectedDate: date }, () => {
      onChange(name, formattedDate);
      this.setFocus(this.calendarRef);
    });
  };

  setDateFromString = str => {
    const { name, onChange } = this.props;
    const date = parseDate(str);

    if (date) {
      this.setState({ selectedDate: date, focussedDate: date });
    }

    onChange(name, str);
  };

  closeCalendar = () => {
    this.setState({ isOpen: false }, () => {
      this.sendBlur();
      this.setFocus(this.dateInputRef);
    });
  };

  toggleCalendar = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  setDateAndCloseCalendar = date => {
    this.setDate(date);
    this.closeCalendar();
  };

  handleBlur = () => {
    this.setState({ isFocused: false }, () => this.sendBlur());
  };

  handleCalendarIconClick = evt => {
    evt.preventDefault();

    const { disabled, readOnly } = this.props;

    if (disabled || readOnly) {
      return;
    }

    this.setStyles();
    this.toggleCalendar();
  };

  handleFocus = () => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });

    onFocus();
  };

  setFocus = eleRef => {
    setTimeout(() => {
      eleRef.current.focus();
    }, WAIT_TO_FOCUS);
  };

  handleMonthChange = month => {
    this.setState(prevState => {
      return { focussedDate: prevState.focussedDate.set('month', month) };
    }, this.setFocus(this.monthRef));
  };

  handleNextMonthClick = () => {
    this.setState(prevState => {
      return { focussedDate: prevState.focussedDate.add(1, 'month') };
    }, this.setFocus(this.nextMonthRef));
  };

  handlePrevMonthClick = () => {
    this.setState(prevState => {
      return { focussedDate: prevState.focussedDate.subtract(1, 'month') };
    }, this.setFocus(this.prevMonthRef));
  };

  handleYearChange = year => {
    this.setState(prevState => {
      return { focussedDate: prevState.focussedDate.set('year', year) };
    }, this.setFocus(this.yearRef));
  };

  sendBlur() {
    const { name, onBlur } = this.props;
    onBlur(name);
  }

  hideOnDocumentClick = e => {
    const { isOpen: wasOpen } = this.state;
    const { target } = e;
    const parentElement = this.formGroupRef.current;

    if (parentElement.contains(target)) {
      return;
    }

    const { selectedDate } = this.state;
    const focussedDate = parseDate(selectedDate) || today;

    this.setState(
      () => {
        return { isOpen: false, focussedDate };
      },
      wasOpen ? this.sendBlur : null
    );
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

  updateA11yMessage = () => {
    this.updateA11yMessageDebounce = debounce(() => {
      const { isOpen } = this.state;

      const message = this.props.getA11yStatusMessage({
        isOpen
      });

      this.setState({ a11yStatusMessage: message });
    }, WAIT_TO_UPDATE);
  };

  handleClick = () => this.closeCalendar();

  handleKeyDown = str => this.setDateFromString(str);

  handleDateClick = date => this.setDateAndCloseCalendar(date);

  render() {
    const {
      a11yStatusMessage,
      isOpen,
      isFocused,
      isAbove,
      selectedDate,
      focussedDate
    } = this.state;

    const {
      calendarIconLabel,
      disabled,
      error,
      floatingLabel,
      getA11yStatusMessage,
      hint,
      label,
      locale,
      name,
      nextMonthLabel,
      onBlur,
      onChange,
      onFocus,
      prevMonthLabel,
      readOnly,
      required,
      selectMonthLabel,
      selectYearLabel,
      value,
      ...otherProps
    } = this.props;

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
        forwardRef={this.formGroupRef}
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
            calendarIconLabel={calendarIconLabel}
            defaultValue={selectedDate}
            disabled={disabled}
            error={error}
            name={name}
            onBlur={this.handleBlur}
            onCalendarIconClick={this.handleCalendarIconClick}
            onClick={this.handleClick}
            onFocus={this.handleFocus}
            onKeyDown={this.handleKeyDown}
            readOnly={readOnly}
            required={required}
            toggleCalendar={this.toggleCalendar}
            key={selectedDate}
            forwardRef={this.dateInputRef}
            {...otherProps}
          />
          <Calendar
            closeCalendar={this.closeCalendar}
            focussedDate={focussedDate}
            forwardRef={this.calendarRef}
            isOpen={isOpen}
            monthRef={this.monthRef}
            name={name}
            nextMonthLabel={nextMonthLabel}
            nextMonthRef={this.nextMonthRef}
            onDateClick={this.handleDateClick}
            onMonthChange={this.handleMonthChange}
            onNextMonthClick={this.handleNextMonthClick}
            onPrevMonthClick={this.handlePrevMonthClick}
            onYearChange={this.handleYearChange}
            prevMonthLabel={prevMonthLabel}
            prevMonthRef={this.prevMonthRef}
            selectMonthLabel={selectMonthLabel}
            selectYearLabel={selectYearLabel}
            setDate={this.setDate}
            yearRef={this.yearRef}
          />
        </div>
        <div
          id={`${name}-status`}
          role="status"
          aria-live="polite"
          style={{
            border: '0px',
            height: '1px',
            width: '1px',
            overflow: 'hidden',
            padding: '0px'
          }}
        >
          {a11yStatusMessage}
        </div>
      </FormGroup>
    );
  }
}

export default Datepicker;
