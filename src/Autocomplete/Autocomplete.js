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

export class Autocomplete extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    fuseConfig: PropTypes.object,
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
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['label']
    },
    minOptionsForSearch: Infinity,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false
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
        return this.moveIndexUp();
      case ARROW_UP:
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
      return options;
    }

    const fuse = new Fuse(options, fuseConfig);
    return fuse.search(searchQuery);
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

  render() {
    const {
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      name,
      placeholder,
      required,
      readOnly,
      template
    } = this.props;
    const options = this.loadOptions();
    const searchOn = this.searchOn();
    const { isOpen, searchQuery, selectedIndex, selectedValue } = this.state;

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
            aria-required={required}
          />
          <Options ref={this.optionListRef}>{optionList}</Options>
        </div>
      </FormGroup>
    );
  }
}

export const AutocompleteWithClickOutside = onClickOutside(Autocomplete);
