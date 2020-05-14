import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import scrollIntoView from 'dom-scroll-into-view';
import Option from './Option';
import Options from './Options';
import debounce from '../../utils/debounce';
import { ENTER, ESC, ARROW_UP, ARROW_DOWN, TAB } from '../../utils/keycodes';

const INITIAL_INDEX = -1;
const WAIT_TIME = 200;
const EMPTY_STRING = '';
const getA11yStatusMessage = ({ isOpen, options, selectedOption }) => {
  const optionsClosed = !isOpen;

  if (optionsClosed) {
    return selectedOption
      ? `You have selected ${selectedOption}`
      : EMPTY_STRING;
  }

  const resultCount = options.length;

  if (resultCount === 0) {
    return 'No results are available';
  }

  return `${resultCount} ${
    resultCount === 1 ? 'result is' : 'results are'
  } available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.`;
};

export class PrefixSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    getA11yStatusMessage: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    getA11yStatusMessage: getA11yStatusMessage
  };

  constructor(props) {
    super(props);

    const { options, value } = this.props;

    this.state = {
      a11yStatusMessage: EMPTY_STRING,
      dialingCode: value,
      isOpen: false,
      selectedIndex: INITIAL_INDEX,
      typedQuery: ''
    };

    this.typedQueryTimer = 0;

    this.optionListRef = React.createRef();
    this.buttonRef = React.createRef();
    this.optionRefs = Array.from({ length: options.length }, () =>
      React.createRef()
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutsideHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutsideHandler);
  }

  getOptionIndexByValue(value) {
    const { options } = this.props;

    return options.findIndex(option => option.value === value);
  }

  getDialingCodeByValue(index) {
    const { options } = this.props;
    const dialingCode =
      index === INITIAL_INDEX ? '' : options[index].dialingCode;

    return dialingCode;
  }

  adjustOffet() {
    const { selectedIndex } = this.state;
    if (selectedIndex === INITIAL_INDEX) return;

    const optionSelected = this.optionRefs[selectedIndex].current;
    const optionList = this.optionListRef.current;

    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true });
  }

  clickOutsideHandler = event => {
    if (
      (this.optionListRef.current &&
        this.optionListRef.current.contains(event.target)) ||
      (this.buttonRef.current && this.buttonRef.current.contains(event.target))
    ) {
      return;
    }

    const { value } = this.props;
    const selectedIndex = this.getOptionIndexByValue(value);

    this.setState(() => {
      return { isOpen: false, selectedIndex };
    });
  };

  handleMenuClick = () => {
    const { onFocus, readOnly } = this.props;

    if (readOnly) return false;

    this.setState(
      prevState => {
        return { isOpen: !prevState.isOpen };
      },
      () => {
        onFocus();
        this.updateA11yMessage();
      }
    );
  };

  handleMenuKeydown = e => {
    let shouldOpenOptions = true;

    switch (e.keyCode) {
      case ARROW_DOWN: {
        e.preventDefault();
        return this.moveIndexUp();
      }
      case ARROW_UP: {
        e.preventDefault();
        return this.moveIndexDown();
      }
      case ENTER: {
        e.preventDefault();
        const { isOpen } = this.state;
        if (isOpen) {
          shouldOpenOptions = false;
        }

        this.selectCurrentOption();
        break;
      }
      case TAB: {
        shouldOpenOptions = false;
        this.selectCurrentOption();
        this.hideOptions();
        break;
      }
      case ESC: {
        e.preventDefault();
        shouldOpenOptions = false;
        return this.hideOptions();
      }
      default: {
        return this.handleTypedChar(e.keyCode);
      }
    }

    if (shouldOpenOptions) this.showOptions();
  };

  handleOptionHover(value) {
    const selectedIndex = this.getOptionIndexByValue(value);

    return this.setState({ selectedIndex });
  }

  handleOptionSelected = value => {
    const selectedIndex = this.getOptionIndexByValue(value);
    const dialingCode = this.getDialingCodeByValue(selectedIndex);

    this.hideOptions();
    this.setState(
      () => {
        return {
          isOpen: false,
          selectedIndex,
          dialingCode
        };
      },
      () => {
        this.sendChange(dialingCode);
        this.updateA11yMessage();
      }
    );
  };

  handleTypedChar(keyCode) {
    const newChar = String.fromCharCode(keyCode).toLowerCase();
    clearTimeout(this.typedQueryTimer);

    this.setState(prevState => {
      return { typedQuery: prevState.typedQuery.concat(newChar) };
    }, this.searchTypedCountry);

    this.typedQueryTimer = setTimeout(() => {
      this.setState({
        typedQuery: ''
      });
    }, 2000);
  }

  hideOptions() {
    this.setState(() => {
      return { isOpen: false };
    });
  }

  moveIndex(offset) {
    const { options } = this.props;

    const optionsLength = options.length;
    const normalize = index => {
      if (index < 0) {
        return optionsLength - 1;
      }
      if (index >= optionsLength) {
        return 0;
      }
      return index;
    };

    this.setState(prevState => {
      return { selectedIndex: normalize(prevState.selectedIndex + offset) };
    }, this.adjustOffet);
  }

  updateA11yMessage = debounce(() => {
    const { isOpen, dialingCode } = this.state;
    const { options } = this.props;

    const message = this.props.getA11yStatusMessage({
      isOpen,
      options,
      selectedOption: dialingCode
    });

    this.setState({ a11yStatusMessage: message });
  }, WAIT_TIME);

  moveIndexDown() {
    this.moveIndex(-1);
  }

  moveIndexUp() {
    this.moveIndex(1);
  }

  searchTypedCountry() {
    const { typedQuery } = this.state;
    const { options } = this.props;

    const searchedOptionIndex = options.findIndex(option =>
      option.label.toLowerCase().startsWith(typedQuery)
    );

    this.setState(
      {
        selectedIndex: searchedOptionIndex
      },
      this.adjustOffet
    );
  }

  sendChange(value) {
    const { name, onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(name, value);
    }
  }

  selectCurrentOption() {
    const { selectedIndex } = this.state;
    const { options } = this.props;

    if (selectedIndex === INITIAL_INDEX) {
      return this.hideOptions();
    }

    const value = options[selectedIndex].value;
    this.updateA11yMessage();
    return this.handleOptionSelected(value);
  }

  showOptions() {
    const { readOnly } = this.props;
    if (readOnly) return false;

    this.setState({ isOpen: true }, this.updateA11yMessage);
  }

  renderOption = (option, index) => {
    const { label, value, dialingCode } = option;
    const { name } = this.props;
    const { selectedIndex } = this.state;

    const hasFocus = selectedIndex === index;

    return (
      <Option
        country={label}
        dialingCode={dialingCode}
        hasFocus={hasFocus}
        key={value}
        onClick={value => this.handleOptionSelected(value)}
        onMouseEnter={value => this.handleOptionHover(value)}
        onMouseOver={value => this.handleOptionHover(value)}
        forwardRef={this.optionRefs[index]}
        value={value}
        id={`${name}-option-${index}`}
      />
    );
  };

  render() {
    const { label, name, disabled, readOnly, options } = this.props;
    const {
      selectedIndex,
      dialingCode,
      isOpen,
      a11yStatusMessage
    } = this.state;
    const optionList = options.map(this.renderOption);

    return (
      <div
        className={classNames(
          'Autocomplete',
          { 'is-searching': isOpen },
          'PhoneNumber-menu'
        )}
        aria-label={label}
      >
        <button
          disabled={disabled}
          className="Autocomplete-search PhoneNumber-menu-input"
          onKeyDown={this.handleMenuKeydown}
          onClick={this.handleMenuClick}
          readOnly={readOnly}
          type="button"
          role="listbox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="phoneNumber-menu-options"
          aria-activedescendant={`${name}-option-${selectedIndex}`}
          aria-label={dialingCode && `+${dialingCode}`}
          ref={this.buttonRef}
        >
          {dialingCode && `+ ${dialingCode}`}
        </button>
        <Options forwardRef={this.optionListRef}>{optionList}</Options>
        <div
          role="status"
          aria-live="polite"
          aria-relevant="additions text"
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
      </div>
    );
  }
}

export default PrefixSelector;
