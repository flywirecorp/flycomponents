import PropTypes from 'prop-types';
import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';

const LEFT = 'Left';
const RIGHT = 'Right';

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.defaultValue,
      isOpen: false,
      upward: this.props.upward,
      lineUp: RIGHT
    };
    this.dropdownRef = React.createRef();
    this.optionsRef = React.createRef();
  }

  getSelectedLabel() {
    const { options } = this.props;
    const { selectedValue } = this.state;
    const selectedOption = options.find(option => {
      return this.sameValue(option.value, selectedValue);
    });
    return selectedOption.label;
  }

  handleClickOutside() {
    this.setState({ isOpen: false });
  }

  handleOptionClick = value => {
    const { onChange } = this.props;
    this.setState({ isOpen: false, selectedValue: value }, () => {
      onChange(value);
    });
  };

  sameValue(value, otherValue) {
    return value.toUpperCase() === otherValue.toUpperCase();
  }

  toggleOptions() {
    this.setState(prevState => {
      const isOpen = !prevState.isOpen;
      const lineUp = this.selectLineUp();

      return { isOpen, lineUp };
    });
  }

  selectLineUp() {
    if (!this.dropdownRef.current || !this.optionsRef.current) return;

    const dropdownlabelEnd = this.dropdownRef.current.getBoundingClientRect()
      .right;
    const optionsWidth = this.optionsRef.current.clientWidth;
    const screenWidth = document.documentElement.clientWidth;

    const spaceToTheRight = screenWidth - dropdownlabelEnd - optionsWidth;
    const spaceToTheLeft = dropdownlabelEnd - optionsWidth;

    const isLinedLeft = spaceToTheRight < 0 && spaceToTheLeft > spaceToTheRight;

    return isLinedLeft ? LEFT : RIGHT;
  }

  renderOption = option => {
    const { label, value } = option;
    const { selectedValue } = this.state;
    const isSelected = this.sameValue(value, selectedValue);

    return (
      !isSelected && (
        <li
          className="Dropdown-option"
          data-label={label}
          key={value}
          onClick={() => this.handleOptionClick(value)}
        >
          {label}
        </li>
      )
    );
  };

  render() {
    const { className, options } = this.props;
    const { isOpen, upward, lineUp } = this.state;

    return (
      <div
        className={classNames('Dropdown', { 'is-open': isOpen }, className)}
        ref={this.dropdownRef}
      >
        <span
          className="Dropdown-selectedOption"
          onClick={() => this.toggleOptions()}
        >
          {this.getSelectedLabel()}
        </span>
        <ul
          className={classNames('Dropdown-options', {
            'Dropdown--upward': upward,
            [`Dropdown-options--upward${lineUp}`]: upward
          })}
          ref={this.optionsRef}
        >
          {options.map(this.renderOption)}
        </ul>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  className: '',
  onChange: () => {},
  upward: false
};

const { arrayOf, func, shape, string, bool } = PropTypes;

Dropdown.propTypes = {
  className: string,
  defaultValue: string.isRequired,
  onChange: func,
  options: arrayOf(
    shape({ label: string.isRequired, value: string.isRequired })
  ).isRequired,
  upward: bool
};

export default onClickOutside(Dropdown);
