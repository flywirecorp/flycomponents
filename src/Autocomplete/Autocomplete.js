import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import scrollIntoView from 'dom-scroll-into-view';
import Option from './Option';
import Options from './Options';
import FormGroup from '../FormGroup';
import debounce from '../utils/debounce';
import isEmpty from '../utils/isEmpty';
import { getAriaDescribedBy } from '../utils/aria';

const NO_SPECIAL_CHARACTERS = 'noSpecialCharacters';
const NO_OPTION = {};
const EMPTY_STRING = '';
const WAIT_TIME = 200;
const INITIAL_INDEX = -1;
const KEYS = [13, 27, 38, 40, 9, 16];
const [ENTER, ESC, ARROW_UP, ARROW_DOWN, TAB, SHIFT] = KEYS;
const getA11yStatusMessage = ({ isOpen, options, selectedOption }) => {
  const optionsClosed = !isOpen;
  const { label } = selectedOption;

  if (optionsClosed) {
    return label ? `You have selected ${label}` : EMPTY_STRING;
  }

  const resultCount = options.length;

  if (resultCount === 0) {
    return 'No results are available';
  }

  return `${resultCount} ${
    resultCount === 1 ? 'result is' : 'results are'
  } available, use up and down arrow keys to navigate. Press Enter key to select.`;
};

const removeSpecialCharacters = str => {
  try {
    return typeof str === 'string'
      ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      : str;
  } catch (err) {
    return str;
  }
};

const withSearchKey = arrOfObjects => {
  return arrOfObjects.map(props => ({
    ...props,
    [NO_SPECIAL_CHARACTERS]: removeSpecialCharacters(props.label)
  }));
};

export class Autocomplete extends Component {
  static propTypes = {
    ariaDescribedBy: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    fuseConfig: PropTypes.object,
    getA11yStatusMessage: PropTypes.func,
    hint: PropTypes.string,
    label: PropTypes.string,
    minOptionsForSearch: PropTypes.number,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    shouldSort: PropTypes.bool,
    template: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    ariaDescribedBy: '',
    disabled: false,
    floatingLabel: true,
    fuseConfig: {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['label']
    },
    getA11yStatusMessage: getA11yStatusMessage,
    minOptionsForSearch: Infinity,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false,
    shouldSort: false
  };

  constructor(props) {
    super(props);

    const { options, value } = this.props;

    this.state = {
      a11yStatusMessage: EMPTY_STRING,
      isOpen: false,
      options: withSearchKey(options),
      searchQuery: this.getOptionLabelByValue(options, value),
      selectedIndex: INITIAL_INDEX,
      selectedValue: value,
      hasValue: !!value
    };

    this.searchInputRef = React.createRef();
    this.optionListRef = React.createRef();
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

  getOptionIndexByValue(options, value) {
    const selectedOptionIndex = options.findIndex(
      option => option.value === value
    );
    return selectedOptionIndex === -1 ? INITIAL_INDEX : selectedOptionIndex;
  }

  getOptionByValue(options = [], value) {
    return options.find(option => option.value === value);
  }

  getOptionLabelByValue(options, value) {
    const selectedOption = this.getOptionByValue(options, value);

    return selectedOption ? selectedOption.label.toString() : EMPTY_STRING;
  }

  adjustOffset() {
    const { selectedIndex } = this.state;

    if (selectedIndex === INITIAL_INDEX) return;

    const optionSelected = this.optionRefs[selectedIndex].current;

    if (!optionSelected) return;

    scrollIntoView(optionSelected, this.optionListRef.current, {
      onlyScrollIfNeeded: true
    });
  }

  focusSearchInput() {
    this.searchInputRef.current.focus();
  }

  clickOutsideHandler = event => {
    if (
      (this.searchInputRef.current &&
        this.searchInputRef.current.contains(event.target)) ||
      (this.optionListRef.current &&
        this.optionListRef.current.contains(event.target))
    ) {
      return;
    }

    this.selectPreviousOption();
  };

  handleFocus = () => {
    const { onFocus } = this.props;

    onFocus();
  };

  handleOptionHover(value) {
    const options = this.loadOptions();
    const index = options.findIndex(option => option.value === value);

    return this.setState({ selectedIndex: index });
  }

  handleOptionSelected = value => {
    const { options } = this.props;

    this.setState(
      () => {
        return {
          isOpen: false,
          searchQuery: this.getOptionLabelByValue(options, value),
          selectedValue: value
        };
      },
      () => {
        this.updateA11yMessage();
        this.sendChange(value);
      }
    );
  };

  handleSearchClick = () => {
    const { disabled, readOnly } = this.props;
    if (disabled || readOnly) return false;

    this.resetSearchQuery();
    this.showOptions();
  };

  handleSearchKeyDown = e => {
    const { isOpen } = this.state;
    let shouldOpenOptions = true;

    switch (e.keyCode) {
      case ARROW_DOWN:
        e.preventDefault();
        this.moveIndexUp();
        break;
      case ARROW_UP:
        e.preventDefault();
        this.moveIndexDown();
        break;
      case ENTER:
        e.preventDefault();

        if (isOpen) {
          shouldOpenOptions = false;
        }

        this.selectCurrentOption();
        break;
      case TAB:
        shouldOpenOptions = false;
        this.selectCurrentOption();
        this.hideOptions();
        break;
      case ESC:
        shouldOpenOptions = false;
        this.hideOptions();
        break;
      case SHIFT:
        shouldOpenOptions = false;
        break;
    }

    if (shouldOpenOptions) this.showOptions();
  };

  handleSearchQueryChange = e => {
    const { value } = e.target;

    this.cancelPreviousA11yMessage();
    this.setState(() => {
      return {
        a11yStatusMessage: EMPTY_STRING,
        searchQuery: value,
        selectedIndex: 0
      };
    }, this.updateA11yMessage);
  };

  cancelPreviousA11yMessage = () => {
    this.updateA11yMessage.cancel();
  };

  updateA11yMessage = debounce(() => {
    const { isOpen, selectedValue } = this.state;
    const options = this.loadOptions();
    const selectedOption =
      this.getOptionByValue(options, selectedValue) || NO_OPTION;

    const message = this.props.getA11yStatusMessage({
      isOpen,
      options,
      selectedOption
    });

    this.setState({ a11yStatusMessage: message });
  }, WAIT_TIME);

  hideOptions() {
    const { isOpen } = this.state;

    if (!isOpen) return;

    this.setState(() => {
      return { isOpen: false };
    }, this.updateA11yMessage);
  }

  loadOptions() {
    const { fuseConfig } = this.props;
    const searchOff = !this.searchOn();
    const { options, searchQuery } = this.state;

    if (searchOff || !searchQuery) {
      return this.sortIfNeeded(options);
    }

    const fuse = new Fuse(options, {
      ...fuseConfig,
      keys: [...fuseConfig.keys, ...[NO_SPECIAL_CHARACTERS]]
    });

    return this.sortIfNeeded(fuse.search(searchQuery));
  }

  moveIndex(offset) {
    const optionsLength = this.loadOptions().length;
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
    }, this.adjustOffset);
  }

  moveIndexDown() {
    this.moveIndex(-1);
  }

  moveIndexUp() {
    this.moveIndex(1);
  }

  resetSearchQuery() {
    return this.setState(() => {
      return {
        searchQuery: ''
      };
    });
  }

  searchOn() {
    const { minOptionsForSearch, options, readOnly } = this.props;

    if (readOnly) return false;
    if (minOptionsForSearch === Infinity) {
      return true;
    }
    return minOptionsForSearch < options.length;
  }

  selectCurrentOption() {
    const options = this.loadOptions();
    const { selectedIndex } = this.state;

    if (selectedIndex === INITIAL_INDEX || !options[selectedIndex]) {
      this.hideOptions();
      return;
    }

    const { value } = options[selectedIndex];

    this.handleOptionSelected(value);
    this.focusSearchInput();
  }

  selectPreviousOption() {
    const { isOpen: wasSearching } = this.state;
    const { options } = this.props;

    return this.setState(
      prevState => {
        const { selectedValue } = prevState;

        return {
          isOpen: false,
          searchQuery: this.getOptionLabelByValue(options, selectedValue)
        };
      },
      wasSearching ? this.sendBlur : null
    );
  }

  sendBlur() {
    const { name, onBlur } = this.props;
    onBlur(name);
  }

  sendChange(value) {
    const { name, onChange } = this.props;
    onChange(name, value);
  }

  showOptions() {
    const { isOpen, selectedValue } = this.state;
    const { options, readOnly } = this.props;

    if (isOpen || readOnly) {
      return;
    }

    this.setState(
      {
        isOpen: true,
        selectedIndex: this.getOptionIndexByValue(options, selectedValue)
      },
      this.adjustOffset
    );
  }

  sortIfNeeded(options = []) {
    const { shouldSort } = this.props;
    const compareLabel = (a, b) => (a.label > b.label ? 1 : -1);

    return shouldSort ? options.sort(compareLabel) : options;
  }

  render() {
    const {
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      name,
      placeholder,
      readOnly,
      required,
      template,
      ariaDescribedBy
    } = this.props;
    const options = this.loadOptions();
    const searchOn = this.searchOn();
    const {
      a11yStatusMessage,
      isOpen,
      searchQuery,
      selectedIndex,
      selectedValue
    } = this.state;

    const optionList = options.map((option, i) => (
      <Option
        key={option.value}
        onClick={value => this.handleOptionSelected(value)}
        onMouseEnter={value => this.handleOptionHover(value)}
        hasFocus={selectedIndex === i}
        option={option}
        forwardRef={this.optionRefs[i]}
        searchQuery={searchQuery.toString()}
        selectedValue={new RegExp(`^${selectedValue}$`, 'i').test(option.value)}
        template={template}
        highlighText={searchOn}
        id={`${name}-option-${i}`}
      />
    ));

    return (
      <FormGroup
        disabled={disabled}
        error={error}
        floatingLabel={floatingLabel}
        hint={hint}
        label={label}
        isFocused={isOpen}
        hasValue={!!searchQuery}
        name={name}
        readOnly={readOnly}
        required={required}
      >
        <div
          className={classNames(
            'Autocomplete',
            { 'is-searching': isOpen },
            { 'Autocomplete--noReadOnly': !readOnly },
            { 'Autocomplete--searchDisabled': !searchOn }
          )}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-owns={`${name}-options`}
          aria-labelledby={`${name}-label`}
        >
          <input
            aria-activedescendant={`${name}-option-${this.state.selectedIndex}`}
            aria-autocomplete="list"
            aria-controls={`${name}-options`}
            aria-describedby={getAriaDescribedBy(name, ariaDescribedBy)}
            aria-disabled={disabled}
            aria-invalid={!isEmpty(error)}
            aria-labelledby={`${name}-label`}
            aria-readonly={readOnly}
            aria-required={required}
            autoComplete="off"
            className="Autocomplete-search"
            disabled={disabled}
            id={name}
            name={name}
            onChange={this.handleSearchQueryChange}
            onClick={this.handleSearchClick}
            onFocus={this.handleFocus}
            onKeyDown={this.handleSearchKeyDown}
            placeholder={placeholder}
            readOnly={!searchOn}
            ref={this.searchInputRef}
            required={required}
            type="search"
            value={searchQuery}
          />
          <Options
            aria-labelledby={`${name}-label`}
            id={`${name}-options`}
            forwardRef={this.optionListRef}
          >
            {optionList}
          </Options>
          <div
            id="a11y-status-message"
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
      </FormGroup>
    );
  }
}

export const AutocompleteWithClickOutside = Autocomplete;
