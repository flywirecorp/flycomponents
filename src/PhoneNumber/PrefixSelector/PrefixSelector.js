import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import scrollIntoView from 'dom-scroll-into-view';
import Option from './Option';
import Options from './Options';
import { getA11yStatusMessage } from '../../utils/a11y';
import debounce from '../../utils/debounce';
import { ENTER, ESC, ARROW_UP, ARROW_DOWN, TAB } from '../../utils/keycodes';

const INITIAL_INDEX = -1;
const WAIT_TIME = 200;
const EMPTY_STRING = '';

const getOptionIndexByValue = (value, options) => {
  return options.findIndex(option => option.value === value);
};

const getDialingCodeByValue = (index, options) => {
  const dialingCode = index === INITIAL_INDEX ? '' : options[index].dialingCode;

  return dialingCode;
};

export const PrefixSelector = ({
  disabled,
  getA11yStatusMessage,
  label,
  name,
  onChange,
  onFocus,
  options,
  readOnly,
  value
}) => {
  const [a11yStatusMessage, setA11yStatusMessage] = useState(EMPTY_STRING);
  const [selectedIndex, setSelectedIndex] = useState(
    value ? getOptionIndexByValue(value, options) : INITIAL_INDEX
  );
  const [dialingCode, setDialingCode] = useState(
    value ? getDialingCodeByValue(selectedIndex, options) : ''
  );
  const [isOpen, setIsOpen] = useState(false);
  const [typedQuery, setTypedQuery] = useState('');

  const clickOutsideHandler = event => {
    if (
      (optionListRef.current && optionListRef.current.contains(event.target)) ||
      (buttonRef.current && buttonRef.current.contains(event.target))
    ) {
      return;
    }

    const selectedIndex = getOptionIndexByValue(value, options);

    setIsOpen(false);
    setSelectedIndex(selectedIndex);
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [clickOutsideHandler]);

  const updateA11yMessage = debounce(() => {
    const message = getA11yStatusMessage({
      isOpen,
      options,
      selectedOption: dialingCode
    });

    setA11yStatusMessage(message);
  }, WAIT_TIME);

  useEffect(() => {
    updateA11yMessage();
  }, [isOpen, dialingCode]);

  let typedQueryTimer = 0;
  const optionListRef = React.useRef();
  const buttonRef = React.useRef();
  const optionRefs = Array.from({ length: options.length }, () =>
    React.useRef()
  );

  const adjustOffset = () => {
    if (selectedIndex === INITIAL_INDEX) return;

    const optionSelected = optionRefs[selectedIndex].current;
    const optionList = optionListRef.current;

    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true });
  };

  const handleMenuClick = () => {
    if (readOnly) return false;
    setIsOpen(isOpen => !isOpen);
    onFocus();
  };

  const handleMenuKeydown = e => {
    let shouldOpenOptions = true;

    switch (e.keyCode) {
      case ARROW_DOWN: {
        e.preventDefault();
        return moveIndex(1);
      }
      case ARROW_UP: {
        e.preventDefault();
        return moveIndex(-1);
      }
      case ENTER: {
        e.preventDefault();
        if (isOpen) {
          shouldOpenOptions = false;
        }

        selectCurrentOption();
        break;
      }
      case TAB: {
        shouldOpenOptions = false;
        selectCurrentOption();
        setIsOpen(false);
        break;
      }
      case ESC: {
        e.preventDefault();
        shouldOpenOptions = false;
        setIsOpen(false);
        break;
      }
      default: {
        return handleTypedChar(e.keyCode);
      }
    }

    if (shouldOpenOptions && !readOnly) setIsOpen(true);
  };

  const handleOptionHover = value => {
    const selectedIndex = getOptionIndexByValue(value, options);
    setSelectedIndex(selectedIndex);
  };

  const handleOptionSelected = value => {
    const selectedIndex = getOptionIndexByValue(value, options);
    const dialingCode = getDialingCodeByValue(selectedIndex, options);

    setIsOpen(false);
    setSelectedIndex(selectedIndex);
    setDialingCode(dialingCode);
    sendChange(dialingCode);
  };

  const handleTypedChar = keyCode => {
    const newChar = String.fromCharCode(keyCode).toLowerCase();
    clearTimeout(typedQueryTimer);

    setTypedQuery(typedQuery.concat(newChar));
    searchTypedCountry();

    typedQueryTimer = setTimeout(() => {
      setTypedQuery('');
    }, 2000);
  };

  const moveIndex = offset => {
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

    setSelectedIndex(normalize(selectedIndex + offset));
    adjustOffset();
  };

  const searchTypedCountry = () => {
    const searchedOptionIndex = options.findIndex(option =>
      option.label.toLowerCase().startsWith(typedQuery)
    );

    setSelectedIndex(searchedOptionIndex);
    adjustOffset();
  };

  const sendChange = value => {
    if (typeof onChange === 'function') {
      onChange(name, value);
    }
  };

  const selectCurrentOption = () => {
    if (selectedIndex === INITIAL_INDEX) {
      setIsOpen(false);
    }

    const value = options[selectedIndex].value;
    return handleOptionSelected(value);
  };

  const renderOption = (option, index) => {
    const { label, value, dialingCode } = option;
    const hasFocus = selectedIndex === index;

    return (
      <Option
        country={label}
        dialingCode={dialingCode}
        hasFocus={hasFocus}
        key={value}
        onClick={value => handleOptionSelected(value)}
        onMouseEnter={value => handleOptionHover(value)}
        onMouseOver={value => handleOptionHover(value)}
        forwardRef={optionRefs[index]}
        value={value}
        id={`${name}-option-${index}`}
      />
    );
  };

  const optionList = options.map(renderOption);

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
        onKeyDown={handleMenuKeydown}
        onClick={handleMenuClick}
        readOnly={readOnly}
        type="button"
        role="listbox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="phoneNumber-menu-options"
        aria-activedescendant={
          selectedIndex === INITIAL_INDEX
            ? undefined
            : `${name}-option-${selectedIndex}`
        }
        aria-label={dialingCode && `+${dialingCode}`}
        ref={buttonRef}
      >
        {dialingCode && `+ ${dialingCode}`}
      </button>
      <Options forwardRef={optionListRef}>{optionList}</Options>
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
};

PrefixSelector.defaultProps = {
  getA11yStatusMessage: getA11yStatusMessage
};

PrefixSelector.propTypes = {
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

export default PrefixSelector;
