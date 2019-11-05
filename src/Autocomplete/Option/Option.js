import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Highlighter from '../Highlighter';

class Option extends Component {
  static propTypes = {
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

  static defaultProps = {
    highlighText: true
  };

  render() {
    const {
      hasFocus,
      highlighText,
      onClick,
      onMouseEnter,
      option,
      option: { label, value },
      searchQuery,
      template,
      id
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
      >
        {typeof template === 'function'
          ? template({ ...option, label: highlighedText })
          : highlighedText}
      </li>
    );
  }
}

export default Option;
