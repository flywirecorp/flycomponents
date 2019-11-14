import PropTypes from 'prop-types';
import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import classNames from 'classnames';
import Option from './Option';
import sameValue from '../utils/sameValue';
import debounce from '../utils/debounce';

const DOWN = -1;
const EMPTY_STRING = '';
const INITIAL_INDEX = -1;
const KEYS = [13, 27, 38, 40, 32];
const LEFT = 'Left';
const RIGHT = 'Right';
const UP = 1;
const WAIT_TIME = 200;
const [ENTER, ESC, ARROW_UP, ARROW_DOWN, SPACE] = KEYS;
const getA11yStatusMessage = ({
  isOpen,
  options = [],
  selectedOption = {}
}) => {
  const isClosed = !isOpen;
  const { label: selectedLabel } = selectedOption;

  if (isClosed) {
    return `${selectedLabel} is selected.`;
  }

  const resultCount = options.length;

  return `${resultCount} ${
    resultCount === 1 ? 'option is' : 'options are'
  } available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.`;
};

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a11yStatusMessage: EMPTY_STRING,
      selectedIndex: INITIAL_INDEX,
      selectedValue: this.props.defaultValue,
      isOpen: false,
      upward: this.props.upward,
      lineUp: RIGHT
    };

    this.activatorRef = React.createRef();
    this.dropdownRef = React.createRef();
    this.optionsRef = React.createRef();
  }

  componentDidMount() {
    this.updateA11yMessage();
  }

  get optionsExceptSelected() {
    const { options } = this.props;
    const { selectedValue } = this.state;
    const notSelected = option => !sameValue(option.value, selectedValue);

    return options.filter(notSelected);
  }

  get selectedOption() {
    const { options } = this.props;
    const { selectedValue } = this.state;
    const selected = option => sameValue(option.value, selectedValue);

    return options.find(selected);
  }

  get selectedLabel() {
    const { options } = this.props;
    const { selectedValue } = this.state;
    const selected = option => sameValue(option.value, selectedValue);
    const selectedOption = options.find(selected);

    if (selectedOption) return selectedOption.label;
    if (options.length > 0) return options[0].label;
  }

  focusActivator() {
    this.activatorRef.current.focus();
  }

  closeOptions() {
    this.setState(() => {
      return { isOpen: false };
    }, this.updateA11yMessage);
  }

  handleClickOutside() {
    this.closeOptions();
  }

  handleOptionClick = value => {
    const { onChange } = this.props;

    this.setState(
      { isOpen: false, selectedValue: value, selectedIndex: INITIAL_INDEX },
      () => {
        onChange(value);
        this.focusActivator();
        this.updateA11yMessage();
      }
    );
  };

  selectCurrentOption = () => {
    const { onChange } = this.props;
    const { selectedIndex } = this.state;
    const options = this.optionsExceptSelected;
    const selectedOption = options[selectedIndex];

    if (selectedOption) {
      this.setState(
        () => ({
          selectedValue: selectedOption.value,
          selectedIndex: INITIAL_INDEX
        }),
        () => {
          onChange(selectedOption.value);
          this.focusActivator();
        }
      );
    }

    this.closeOptions();
  };

  moveIndex(offset) {
    const optionsCount = this.optionsExceptSelected.length;
    const normalize = index => {
      if (index < 0) {
        return 0;
      }

      if (index >= optionsCount) {
        return index - 1;
      }

      return index;
    };

    this.setState(prevState => ({
      selectedIndex: normalize(prevState.selectedIndex + offset)
    }));
  }

  handleKeyDown = evt => {
    switch (evt.keyCode) {
      case ARROW_UP:
        evt.preventDefault();
        this.moveIndex(DOWN);
        break;
      case ARROW_DOWN:
        evt.preventDefault();
        this.moveIndex(UP);
        break;
      case SPACE:
        this.toggleOptions();
        break;
      case ENTER:
        evt.preventDefault();
        const { isOpen } = this.state;
        isOpen ? this.selectCurrentOption() : this.toggleOptions();
        break;
      case ESC:
        this.closeOptions();
        break;
    }
  };

  toggleOptions = () => {
    this.setState(prevState => {
      const isOpen = !prevState.isOpen;
      const lineUp = this.selectLineUp();

      return { isOpen, lineUp };
    }, this.updateA11yMessage);
  };

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

  updateA11yMessage = debounce(() => {
    const { isOpen } = this.state;
    const options = this.optionsExceptSelected;
    const selectedOption = this.selectedOption;

    const a11yStatusMessage = this.props.getA11yStatusMessage({
      isOpen,
      options,
      selectedOption
    });

    this.setState({ a11yStatusMessage });
  }, WAIT_TIME);

  render() {
    const { name, className, label, template } = this.props;
    const {
      isOpen,
      upward,
      lineUp,
      a11yStatusMessage,
      selectedIndex
    } = this.state;
    const options = this.optionsExceptSelected;

    return (
      <div
        className={classNames('Dropdown', { 'is-open': isOpen }, className)}
        ref={this.dropdownRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-owns={`${name}-options`}
      >
        <button
          aria-activedescendant={`${name}-option-${selectedIndex}`}
          aria-controls={`${name}-options`}
          aria-label={label}
          className="Dropdown-selectedOption"
          onClick={evt => {
            evt.preventDefault();
            this.toggleOptions();
          }}
          onKeyDown={this.handleKeyDown}
          ref={this.activatorRef}
        >
          {this.selectedLabel}
        </button>
        <ul
          className={classNames('Dropdown-options', {
            'Dropdown--upward': upward,
            [`Dropdown-options--upward${lineUp}`]: upward
          })}
          id={`${name}-options`}
          ref={this.optionsRef}
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <Option
              data-label={option.label}
              id={`${name}-option-${index}`}
              isActive={index === selectedIndex}
              template={template}
              key={`option-${index}`}
              onClick={() => this.handleOptionClick(option.value)}
              {...option}
            />
          ))}
        </ul>
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
    );
  }
}

Dropdown.defaultProps = {
  className: '',
  getA11yStatusMessage: getA11yStatusMessage,
  name: 'dropdown',
  onChange: () => {},
  upward: false
};

const { arrayOf, func, shape, string, bool } = PropTypes;

Dropdown.propTypes = {
  className: string,
  defaultValue: string.isRequired,
  getA11yStatusMessage: func,
  label: string,
  name: string,
  onChange: func,
  options: arrayOf(
    shape({ label: string.isRequired, value: string.isRequired })
  ).isRequired,
  template: func,
  upward: bool
};

export default onClickOutside(Dropdown);
