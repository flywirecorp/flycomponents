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
  }

  componentWillReceiveProps(nextProps) {
    const { options: nextOptions, value: nextValue } = nextProps;
    const { value: currentValue } = this.props;

    if (nextValue === currentValue) {
      return;
    }

    this.setState({
      searchQuery: this.getOptionLabelByValue(nextOptions, nextValue)
    });
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

  handleClickOutside() {
    return this.selectPreviousOption();
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

  getOptionLabelByValue(options, value) {
    const NO_LABEL = '';
    const selectedOption = options.find(option => option.value === value);

    return selectedOption ? selectedOption.label.toString() : NO_LABEL;
  }

  getOptionIndexByValue(options, value) {
    const selectedOptionIndex = options.findIndex(
      option => option.value === value
    );
    return selectedOptionIndex === -1 ? INITIAL_INDEX : selectedOptionIndex;
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

  resetSearchQuery() {
    return this.setState(() => {
      return {
        searchQuery: ''
      };
    });
  }

  handleSearchClick = () => {
    const { disabled, readOnly } = this.props;
    if (disabled || readOnly) return false;
    this.resetSearchQuery();
    this.showOptions();
  };

  handleFocus = () => {
    const { onFocus } = this.props;

    this.handleSearchClick();
    onFocus();
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

  handleOptionHover(value) {
    const options = this.loadOptions();
    const index = options.findIndex(option => option.value === value);

    return this.setState({ selectedIndex: index });
  }

  hideOptions() {
    this.setState({ isOpen: false });
  }

  moveIndexDown() {
    this.moveIndex(-1);
  }

  moveIndexUp() {
    this.moveIndex(1);
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

  adjustOffset() {
    const { selectedIndex } = this.state;
    const optionSelected = findDOMNode(this.refs[`option-${selectedIndex}`]);

    if (!optionSelected) return;

    const optionList = findDOMNode(this.refs.optionList);

    if (selectedIndex === INITIAL_INDEX) return;
    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true });
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

  sendBlur() {
    const { name, onBlur } = this.props;
    onBlur(name);
  }

  sendChange(value) {
    const { name, onChange } = this.props;
    onChange(name, value);
  }

  searchOn() {
    const { minOptionsForSearch, options, readOnly } = this.props;

    if (readOnly) return false;
    if (minOptionsForSearch === Infinity) {
      return true;
    }
    return minOptionsForSearch < options.length;
  }

  blurSearchInput() {
    this.searchInput.blur();
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
        ref={`option-${i}`}
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
          ref="autocomplete"
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
            ref={input => (this.searchInput = input)}
            placeholder={placeholder}
            readOnly={!searchOn}
            type="text"
            value={searchQuery}
          />
          <Options ref="optionList">{optionList}</Options>
        </div>
      </FormGroup>
    );
  }
}

export const AutocompleteWithClickOutside = onClickOutside(Autocomplete);
