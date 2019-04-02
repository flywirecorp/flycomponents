import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Option from './Option';
import Options from './Options';
import onClickOutside from 'react-onclickoutside';

const KEYS = [38, 40];
const [ARROW_UP, ARROW_DOWN] = KEYS;

export class PrefixSelector extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  };

  state = {
    isOpen: false,
    selectedIndex: -1
  };

  handleClickOutside = e => {
    this.setState({ isOpen: false });
  };

  handleMenuClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleClick = index => {
    this.setState({ selectedIndex: index, isOpen: false });
  };

  handleMouseEnter = index => {
    this.setState({ selectedIndex: index });
  };

  get lastIndex() {
    const { options } = this.props;
    return options.length - 1;
  }

  get nextIndex() {
    const { selectedIndex } = this.state;

    const isLastIndex = selectedIndex === this.lastIndex;

    return isLastIndex ? 0 : selectedIndex + 1;
  }

  get previousIndex() {
    const { selectedIndex } = this.state;

    return selectedIndex < 1 ? this.lastIndex : selectedIndex - 1;
  }

  handleKeyDown = e => {
    if (!KEYS.includes(e.keyCode)) return;

    e.preventDefault();

    const key = e.keyCode;

    let selectedIndex;

    if (key === ARROW_DOWN) selectedIndex = this.nextIndex;

    if (key === ARROW_UP) selectedIndex = this.previousIndex;

    this.setState({ selectedIndex, isOpen: true });
  };

  renderOption = (option, index) => {
    const { label, value } = option;
    const { selectedIndex } = this.state;

    const hasFocus = selectedIndex === index;

    return (
      <Option
        value={value}
        index={index}
        onClick={() => this.handleClick(index)}
        onMouseEnter={() => this.handleMouseEnter(index)}
        country={label}
        hasFocus={hasFocus}
        key={value}
      />
    );
  };

  render() {
    const { options } = this.props;
    const { isOpen } = this.state;

    const optionList = options.map(this.renderOption);

    return (
      <div
        className={classNames(
          'Autocomplete',
          { 'is-searching': isOpen },
          'PhoneNumber-menu'
        )}
        onClick={this.handleMenuClick}
        onKeyDown={this.handleKeyDown}
      >
        <span className="Autocomplete-search PhoneNumber-menu-input">`33`</span>
        <Options>{optionList}</Options>
      </div>
    );
  }
}

export default onClickOutside(PrefixSelector);
