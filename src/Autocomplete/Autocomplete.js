import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import onClickOutside from 'react-onclickoutside';
import scrollIntoView from 'dom-scroll-into-view';
import Option from './Option';
import Options from './Options';
import FormGroup from '../FormGroup';

const INITIAL_INDEX = -1;
const KEYS = [13, 27, 38, 40, 9];
const [ENTER, ESC, ARROW_UP, ARROW_DOWN, TAB] = KEYS;
const getA11yStatusMessage = ({ isOpen, options }) => {
  if (!isOpen) {
    return '';
  }

  const resultCount = options.length;

  if (resultCount === 0) {
    return 'No results are available';
  }

  return `${resultCount} result${
    resultCount === 1 ? ' is' : 's are'
  } available, use up and down arrow keys to navigate. Press Enter key to select.`;
};

export class Autocomplete extends Component {
  static propTypes = {
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
      isOpen: false,
      searchQuery: this.getOptionLabelByValue(options, value),
      selectedIndex: INITIAL_INDEX,
      selectedValue: value,
      hasValue: !!value
    };

    this.searchInputRef = React.createRef();
    this.optionListRef = React.createRef();
    this.setOptionRef = (i, e) => {
      this[`option-${i}`] = e;
    };
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { options: nextOptions, value: nextValue } = nextProps;
    const { value: currentValue } = this.props;

    if (nextValue === currentValue) {
      return;
    }

    this.setState({
      searchQuery: this.getOptionLabelByValue(nextOptions, nextValue)
    });
  }

  getOptionIndexByValue(options, value) {
    const selectedOptionIndex = options.findIndex(
      option => option.value === value
    );
    return selectedOptionIndex === -1 ? INITIAL_INDEX : selectedOptionIndex;
  }

  getOptionLabelByValue(options, value) {
    const NO_LABEL = '';
    const selectedOption = options.find(option => option.value === value);

    return selectedOption ? selectedOption.label.toString() : NO_LABEL;
  }

  adjustOffset() {
    const { selectedIndex } = this.state;
    const optionSelected = findDOMNode(this[`option-${selectedIndex}`]);

    if (!optionSelected) return;

    const optionList = findDOMNode(this.optionListRef.current);

    if (selectedIndex === INITIAL_INDEX) return;
    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true });
  }

  blurSearchInput() {
    this.searchInputRef.current.blur();
  }

  handleClickOutside() {
    return this.selectPreviousOption();
  }

  handleFocus = () => {
    const { onFocus } = this.props;

    this.handleSearchClick();
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
        this.sendChange(value);
        this.blurSearchInput();
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
    this.showOptions();

    switch (e.keyCode) {
      case ARROW_DOWN:
        e.preventDefault();
        return this.moveIndexUp();
      case ARROW_UP:
        e.preventDefault();
        return this.moveIndexDown();
      case ENTER:
      case TAB:
        return this.selectCurrentOption();
      case ESC:
        return this.hideOptions();
    }
  };

  handleSearchQueryChange = e => {
    const { value } = e.target;

    this.setState({
      searchQuery: value,
      selectedIndex: 0
    });
  };

  hideOptions() {
    this.setState({ isOpen: false });
  }

  loadOptions() {
    const { fuseConfig, options } = this.props;
    const searchOff = !this.searchOn();
    const { searchQuery } = this.state;

    if (searchOff || !searchQuery) {
      return this.sortIfNeeded(options);
    }

    const fuse = new Fuse(options, fuseConfig);
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
      return;
    }

    const { value } = options[selectedIndex];
    return this.handleOptionSelected(value);
  }

  selectPreviousOption() {
    const { isOpen: wasSearching } = this.state;
    const { options } = this.props;

    return this.setState(prevState => {
      const { selectedValue } = prevState;

      return {
        isOpen: false,
        searchQuery: this.getOptionLabelByValue(options, selectedValue)
      };
    }, wasSearching ? this.sendBlur : null);
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
      getA11yStatusMessage,
      hint,
      label,
      name,
      placeholder,
      readOnly,
      required,
      template
    } = this.props;
    const options = this.loadOptions();
    const searchOn = this.searchOn();
    const { isOpen, searchQuery, selectedIndex, selectedValue } = this.state;
    const a11yStatusMessage = getA11yStatusMessage({ isOpen, options });
    const optionList = options.map((option, i) => (
      <Option
        key={option.value}
        onClick={value => this.handleOptionSelected(value)}
        onMouseEnter={value => this.handleOptionHover(value)}
        hasFocus={selectedIndex === i}
        option={option}
        ref={option => this.setOptionRef(i, option)}
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
            autoComplete="off"
            className="Autocomplete-search"
            disabled={disabled}
            id={name}
            name={name}
            onChange={this.handleSearchQueryChange}
            onClick={this.handleSearchClick}
            onFocus={this.handleFocus}
            onKeyDown={this.handleSearchKeyDown}
            ref={this.searchInputRef}
            placeholder={placeholder}
            readOnly={!searchOn}
            type="search"
            value={searchQuery}
            required={required}
            aria-autocomplete="list"
            aria-controls={`${name}-options`}
            aria-activedescendant={`${name}-option-${this.state.selectedIndex}`}
            aria-labelledby={`${name}-label`}
          />

          <Options ref={this.optionListRef} id={`${name}-options`}>
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

export const AutocompleteWithClickOutside = onClickOutside(Autocomplete);
