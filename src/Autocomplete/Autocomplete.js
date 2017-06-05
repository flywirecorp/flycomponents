import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import onClickOutside from 'react-onclickoutside'
import scrollIntoView from 'dom-scroll-into-view'
import { escape } from './utils'
import Option from './Option'
import Options from './Options'
import Input from '../Input'

const INITIAL_INDEX = -1
const KEYS = [13, 27, 38, 40, 9]
const [ENTER, ESC, ARROW_UP, ARROW_DOWN, TAB] = KEYS

export class Autocomplete extends Component {
  constructor(props) {
    super(props)
    const { options, value } = this.props

    this.state = {
      isOpen: false,
      searchQuery: this.getOptionLabelByValue(options, value),
      selectedIndex: INITIAL_INDEX,
      selectedValue: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      label: nextLabel,
      options: nextOptions,
      value: nextValue
    } = nextProps
    const { label: currentLabel, value: currentValue } = this.props

    if (nextLabel === currentLabel && nextValue === currentValue) {
      return
    }

    this.setState({
      searchQuery: this.getOptionLabelByValue(nextOptions, nextValue)
    })
  }

  handleClickOutside() {
    const { isOpen: wasSearching } = this.state
    const { options } = this.props

    return this.setState(prevState => {
      const { selectedValue } = prevState

      return {
        isOpen: false,
        searchQuery: this.getOptionLabelByValue(options, selectedValue)
      }
    }, wasSearching ? this.sendBlur : null)
  }

  showOptions() {
    const { isOpen, selectedIndex, selectedValue } = this.state
    const { options, readOnly } = this.props

    if (isOpen || readOnly) {
      return
    }
    this.setState(
      {
        isOpen: true,
        selectedIndex: this.getOptionIndexByValue(options, selectedValue)
      },
      this.adjustOffset
    )
  }

  loadOptions() {
    const { options } = this.props
    const searchOff = !this.searchOn()
    const { searchQuery } = this.state

    if (searchOff || !searchQuery) {
      return options
    }

    const escapedSearchQuery = escape(searchQuery)
    const pattern = escapedSearchQuery
      .split(' ')
      .map(t => `(?=.*?${t})`)
      .join('')

    return options.filter(
      option => option.label.toString().search(new RegExp(pattern, 'i')) !== -1
    )
  }

  getOptionLabelByValue(options, value) {
    const NO_LABEL = ''
    const selectedOption = options.find(option => option.value === value)

    return selectedOption ? selectedOption.label.toString() : NO_LABEL
  }

  getOptionIndexByValue(options, value) {
    const selectedOptionIndex = options.findIndex(
      option => option.value === value
    )
    return selectedOptionIndex === -1 ? INITIAL_INDEX : selectedOptionIndex
  }

  handleOptionSelected = value => {
    const { selectedValue: previousSelectedValue } = this.state
    const { options } = this.props

    this.setState(
      () => {
        return {
          isOpen: false,
          searchQuery: this.getOptionLabelByValue(options, value),
          selectedValue: value
        }
      },
      () => {
        this.sendChange(value)
        this.blurSearchInput()
      }
    )
  }

  resetSearchQuery() {
    return this.setState(() => {
      return {
        searchQuery: ''
      }
    })
  }

  handleSearchClick = () => {
    this.resetSearchQuery()
    this.showOptions()
  }

  handleSearchKeyDown = e => {
    if (KEYS.includes(e.keyCode)) {
      e.preventDefault()
    }
    this.showOptions()

    switch (e.keyCode) {
      case ARROW_DOWN:
        return this.moveIndexUp()
      case ARROW_UP:
        return this.moveIndexDown()
      case ENTER:
        return this.selectCurrentOption()
      case TAB:
        return this.selectCurrentOption()
      case ESC:
        return this.hideOptions()
    }
  }

  handleSearchQueryChange = e => {
    const { value } = e.target

    this.setState({
      searchQuery: value,
      selectedIndex: 0
    })
  }

  handleOptionHover(value) {
    const options = this.loadOptions()
    const index = options.findIndex(option => option.value === value)

    return this.setState({ selectedIndex: index })
  }

  hideOptions() {
    const { isOpen } = this.state

    if (isOpen === false) {
      return
    }
    this.setState({ isOpen: false })
  }

  moveIndexDown() {
    this.moveIndex(-1)
  }

  moveIndexUp() {
    this.moveIndex(1)
  }

  moveIndex(offset) {
    const optionsLength = this.loadOptions().length
    const normalize = index => {
      if (index < 0) {
        return optionsLength - 1
      }
      if (index >= optionsLength) {
        return 0
      }
      return index
    }

    this.setState(prevState => {
      return { selectedIndex: normalize(prevState.selectedIndex + offset) }
    }, this.adjustOffset)
  }

  adjustOffset() {
    const { selectedIndex } = this.state
    const optionSelected = findDOMNode(this.refs[`option-${selectedIndex}`])

    if (!optionSelected) return

    const optionList = findDOMNode(this.refs.optionList)

    if (selectedIndex === INITIAL_INDEX) return
    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true })
  }

  selectCurrentOption() {
    const options = this.loadOptions()
    const { selectedIndex } = this.state

    if (selectedIndex === INITIAL_INDEX || !options[selectedIndex]) {
      return
    }

    const { value } = options[selectedIndex]
    return this.handleOptionSelected(value)
  }

  sendBlur() {
    const { name, onBlur } = this.props
    onBlur(name)
  }

  sendChange(value) {
    const { name, onChange } = this.props
    onChange(name, value)
  }

  searchOn() {
    const { minOptionsForSearch, options, readOnly } = this.props

    if (readOnly) return false
    if (minOptionsForSearch === Infinity) {
      return true
    }
    return minOptionsForSearch < options.length
  }

  blurSearchInput() {
    this.searchInput.blur()
  }

  render() {
    const { name, onFocus, placeholder, readOnly } = this.props
    const options = this.loadOptions()
    const searchOn = this.searchOn()
    const { isOpen, searchQuery, selectedIndex, selectedValue } = this.state

    const optionList = options.map((option, i) =>
      <Option
        key={option.value}
        label={option.label.toString()}
        onClick={value => this.handleOptionSelected(value)}
        onMouseEnter={value => this.handleOptionHover(value)}
        hasFocus={selectedIndex === i}
        ref={`option-${i}`}
        searchQuery={searchQuery.toString()}
        selectedValue={new RegExp(`^${selectedValue}$`, 'i').test(option.value)}
        value={option.value}
        highlighText={searchOn}
      />
    )

    return (
      <div
        ref="autocomplete"
        className={classNames(
          'Autocomplete',
          { 'is-searching': isOpen },
          { 'Autocomplete--noReadOnly': !readOnly }
        )}
      >
        <input
          className="Autocomplete-search"
          id={name}
          name={name}
          onChange={this.handleSearchQueryChange}
          onClick={this.handleSearchClick}
          onFocus={onFocus}
          onKeyDown={this.handleSearchKeyDown}
          ref={input => (this.searchInput = input)}
          placeholder={placeholder}
          readOnly={!searchOn}
          type="text"
          value={searchQuery}
        />
        <Options ref="optionList">
          {optionList}
        </Options>
      </div>
    )
  }
}

const { array, bool, func, number, string } = PropTypes

Autocomplete.defaultProps = {
  minOptionsForSearch: Infinity,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {}
}

Autocomplete.propTypes = {
  label: string,
  minOptionsForSearch: number,
  name: string.isRequired,
  onBlur: func,
  onChange: func,
  onFocus: func,
  options: array.isRequired,
  placeholder: string,
  readOnly: bool,
  value: string
}

export const AutocompleteWithClickOutside = onClickOutside(Autocomplete)
