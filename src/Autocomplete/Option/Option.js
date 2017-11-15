import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import Highlighter from '../Highlighter'

class Option extends Component {
  render() {
    const {
      hasFocus,
      highlighText,
      label,
      onClick,
      onMouseEnter,
      searchQuery,
      value
    } = this.props

    return (
      <li
        className={classNames('Autocomplete-option', { 'is-active': hasFocus })}
        onClick={() => onClick(value)}
        onMouseEnter={() => onMouseEnter(value)}
        value={value}
      >
        {highlighText ? (
          <Highlighter text={label} subString={searchQuery} />
        ) : (
          label
        )}
      </li>
    )
  }
}

const { bool, func, string } = PropTypes

Option.defaultProps = {
  highlighText: true
}

Option.propTypes = {
  hasFocus: bool.isRequired,
  highlighText: bool,
  label: string.isRequired,
  onClick: func.isRequired,
  onMouseEnter: func.isRequired,
  searchQuery: string,
  value: string.isRequired
}

export default Option
