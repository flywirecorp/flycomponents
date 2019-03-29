import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';
import scrollIntoView from 'dom-scroll-into-view';
import Option from './Option';
import Options from './Options';
import isEmpty from '../../utils/isEmpty';

const INITIAL_INDEX = -1;
const KEYS = [13, 27, 38, 40];
const [ENTER, ESC, ARROW_UP, ARROW_DOWN] = KEYS;
const styles = {
  fakeInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0
  }
};

export class FlagSelector extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
    value: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedIndex: INITIAL_INDEX,
      typedQuery: '',
      options: this.validOptions
    };

    this.typedQueryTimer = 0;

    this.optionListRef = React.createRef();
    this.setOptionRef = (i, e) => {
      this[`option-${i}`] = e;
    };
  }

  getOptionIndexByValue(value) {
    const { options } = this.state;

    return options.findIndex(option => option.value === value);
  }

  adjustOffet() {
    const { selectedIndex } = this.state;
    const optionSelected = findDOMNode(this[`option-${selectedIndex}`]);
    const optionList = findDOMNode(this.optionListRef.current);

    if (selectedIndex === INITIAL_INDEX) return;
    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true });
  }

  handleClickOutside(e) {
    const { value } = this.props;
    const selectedIndex = this.getOptionIndexByValue(value);

    this.setState(() => {
      return { isOpen: false, selectedIndex };
    });
  }

  handleMenuClick = () => {
    const { onFocus, readOnly } = this.props;

    if (readOnly) return false;

    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    }, onFocus);
  };

  handleMenuKeydown = e => {
    if (KEYS.includes(e.keyCode)) {
      e.preventDefault();
    }

    this.showOptions();

    switch (e.keyCode) {
      case ARROW_DOWN:
        return this.moveIndexUp();
      case ARROW_UP:
        return this.moveIndexDown();
      case ENTER:
        return this.selectCurrentOption();
      case ESC:
        return this.hideOptions();
      default:
        return this.handleTypedChar(e.keyCode);
    }
  };

  handleOptionHover(option) {
    const selectedIndex = this.getOptionIndexByValue(option.value);

    return this.setState({ selectedIndex });
  }

  handleOptionSelected = option => {
    const selectedIndex = this.getOptionIndexByValue(option.value);

    this.hideOptions();
    this.setState(() => {
      return {
        isOpen: false,
        selectedIndex
      };
    }, this.sendChange(option.value));
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
    this.setState({ isOpen: false });
  }

  moveIndex(offset) {
    const { options } = this.state;
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

  moveIndexDown() {
    this.moveIndex(-1);
  }

  moveIndexUp() {
    this.moveIndex(1);
  }

  searchTypedCountry() {
    const { options, typedQuery } = this.state;

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

  selectCurrentOption() {
    const { options, selectedIndex } = this.state;

    if (selectedIndex === INITIAL_INDEX) {
      return;
    }

    const { value } = options[selectedIndex];
    return this.handleOptionSelected(value);
  }

  sendChange(value) {
    const { name, onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(name, value);
    }
  }

  showOptions() {
    const { readOnly } = this.props;
    if (readOnly) return false;

    this.setState({ isOpen: true });
  }

  get validOptions() {
    const { options } = this.props;

    return options.filter(
      ({ dialingCode, phonePattern }) =>
        !isEmpty(dialingCode) && !isEmpty(phonePattern)
    );
  }

  render() {
    const { value = '' } = this.props;
    const { disabled, readOnly } = this.props;
    const { isOpen, options, selectedIndex } = this.state;

    const optionList = options.map((option, i) => (
      <Option
        country={option.label}
        dialingCode={option.dialingCode}
        hasFocus={selectedIndex === i}
        key={option.value}
        onClick={value => this.handleOptionSelected(option)}
        onMouseEnter={value => this.handleOptionHover(option)}
        onMouseOver={value => this.handleOptionHover(option)}
        ref={option => this.setOptionRef(i, option)}
        value={option.value}
      />
    ));

    return (
      <div
        className={classNames(
          'Autocomplete',
          { 'is-searching': isOpen },
          'PhoneNumber-menu'
        )}
      >
        <span className="Autocomplete-search PhoneNumber-menu-input">
          {value ? `+ ${value}` : null}
        </span>
        {!disabled ? (
          <div
            className="PhoneNumber-menu-fakeInput"
            onClick={this.handleMenuClick}
            onKeyDown={this.handleMenuKeydown}
            readOnly={readOnly}
            style={styles.fakeInput}
            tabIndex={-1}
          />
        ) : null}

        <Options ref={this.optionListRef}>{optionList}</Options>
      </div>
    );
  }
}

export default onClickOutside(FlagSelector);
