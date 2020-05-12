import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Highlighter from '../Highlighter';

class Option extends Component {
  render() {
    const {
      hasFocus,
      highlighText,
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
    const highlighedText = highlighText ? (
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
        onMouseEnter={() => onMouseEnter(value)}
        role="option"
        tabIndex={-1}
        value={value}
        ref={forwardRef}
      >
        {typeof template === 'function'
          ? template({ ...option, label: highlighedText })
          : highlighedText}
      </li>
    );
  }
}

Option.propTypes = {
  forwardRef: PropTypes.object,
  hasFocus: PropTypes.bool.isRequired,
  highlighText: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  option: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  searchQuery: PropTypes.string,
  template: PropTypes.func
};

Option.defaultProps = {
  highlighText: true
};

export default Option;
