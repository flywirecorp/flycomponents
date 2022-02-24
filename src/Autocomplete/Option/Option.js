import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Highlighter from '../Highlighter';
import { ENTER } from '../../utils/keycodes';

class Option extends Component {
  render() {
    const {
      hasFocus,
      highlightText,
      id,
      onClick,
      onMouseEnter,
      option,
      option: { label, value },
      searchQuery,
      template,
      forwardRef
    } = this.props;

    const text = label.toString();
    const highlightedText = highlightText ? (
      <Highlighter text={text} subString={searchQuery} />
    ) : (
      text
    );

    return (
      <li
        aria-label={label}
        aria-selected={hasFocus}
        className={classNames('Autocomplete-option', { 'is-active': hasFocus })}
        id={id}
        onClick={() => onClick(value)}
        onKeyDown={evt => ENTER === evt.keyCode && onClick(value)}
        onMouseEnter={() => onMouseEnter(value)}
        role="option"
        tabIndex={-1}
        value={value}
        ref={forwardRef}
        data-testid="option"
      >
        {typeof template === 'function'
          ? template({ ...option, label: highlightedText })
          : highlightedText}
      </li>
    );
  }
}

Option.propTypes = {
  forwardRef: PropTypes.object,
  hasFocus: PropTypes.bool.isRequired,
  highlightText: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  option: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.string.isRequired
  }),
  searchQuery: PropTypes.string,
  template: PropTypes.func
};

Option.defaultProps = {
  highlightText: true
};

export default Option;
