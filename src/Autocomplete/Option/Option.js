import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Highlighter from '../Highlighter';

class Option extends Component {
  static defaultProps = {
    highlighText: true
  };

  static propTypes = {
    hasFocus: PropTypes.bool.isRequired,
    highlighText: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    option: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    searchQuery: PropTypes.string,
    template: PropTypes.func
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
      template
    } = this.props;

    const text = label.toString();
    const highlighedText = highlighText ? (
      <Highlighter text={text} subString={searchQuery} />
    ) : (
      text
    );

    return (
      <li
        className={classNames('Autocomplete-option', { 'is-active': hasFocus })}
        onClick={() => onClick(value)}
        onMouseEnter={() => onMouseEnter(value)}
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
