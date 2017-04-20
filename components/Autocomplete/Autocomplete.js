import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import onClickOutside from 'react-onclickoutside'
import scrollIntoView from 'dom-scroll-into-view'
import { escape } from './utils'
import Option from './Option'
import Options from './Options'
import Input from '../Input'

const INITIAL_INDEX = -1
const KEYS = [13, 27, 38, 40]
const [ENTER, ESC, ARROW_UP, ARROW_DOWN] = KEYS

export class Autocomplete extends Component {
  constructor (props) {
    super(props)
    const { options, value } = this.props

    this.state = {
      isOpen: false,
      searchQuery: this.getOptionLabelByValue(options, value),
      selectedIndex: INITIAL_INDEX,
      selectedValue: props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    const { label: nextLabel, options: nextOptions, value: nextValue } = nextProps
    const { label: currentLabel, value: currentValue } = this.props

    if (nextLabel === currentLabel && nextValue === currentValue) { return }

    this.setState({
      searchQuery: this.getOptionLabelByValue(nextOptions, nextValue) }
    )
  }

  handleClickOutside () {
    const { isOpen: wasSearching } = this.state
    const { options } = this.props

    return this.setState((prevState) => {
      const { selectedValue } = prevState

      return {
        isOpen: false,
        searchQuery: this.getOptionLabelByValue(options, selectedValue)
      }
    }, wasSearching ? this.sendBlur : null)
  }

  showOptions () {
    const { isOpen } = this.state
    const { readOnly } = this.props

    if (isOpen || readOnly) { return }
    this.setState({ isOpen: true })
  }

  loadOptions () {
    const { options } = this.props
    const searchOff = !this.searchOn()
    const { searchQuery } = this.state

    if (searchOff || !searchQuery) { return options }

    const escapedSearchQuery = escape(searchQuery)
    const pattern = escapedSearchQuery.split(' ').map(t => `(?=.*?${t})`).join('')

    return options.filter(option =>
      option.label.toString().search(new RegExp(pattern, 'i')) !== -1
    )
  }

  getOptionLabelByValue (options, value) {
    const NO_LABEL = ''
    const selectedOption = options.find(option => option.value === value)

    return selectedOption ? selectedOption.label.toString() : NO_LABEL
  }

  handleOptionSelected = (value) => {
    const { selectedValue: previousSelectedValue } = this.state
    const { options } = this.props

    if (previousSelectedValue === value) {
      return this.hideOptions()
    }

    this.setState(() => {
      return {
        isOpen: false,
        searchQuery: this.getOptionLabelByValue(options, value),
        selectedIndex: INITIAL_INDEX,
        selectedValue: value
      }
    }, this.sendChange(value))
  }

  handleSearchClick = () => {
    this.showOptions()
  }

  handleSearchKeyDown = (e) => {
    if (KEYS.includes(e.keyCode)) { e.preventDefault() }
    this.showOptions()

    switch (e.keyCode) {
      case ARROW_DOWN: return this.moveIndexUp()
      case ARROW_UP: return this.moveIndexDown()
      case ENTER: return this.selectCurrentOption()
      case ESC: return this.hideOptions()
    }
  }

  handleSearchQueryChange = (e) => {
    const { value } = e.target

    this.setState({
      searchQuery: value,
      selectedIndex: 0
    })
  }

  handleOptionHover (value) {
    const options = this.loadOptions()
    const index = options.findIndex(option =>
      option.value === value
    )

    return this.setState({ selectedIndex: index })
  }

  hideOptions () {
    const { isOpen } = this.state

    if (isOpen === false) { return }
    this.setState({ isOpen: false })
  }

  moveIndexDown () {
    this.moveIndex(-1)
  }

  moveIndexUp () {
    this.moveIndex(1)
  }

  moveIndex (offset) {
    const optionsLength = this.loadOptions().length
    const normalize = (index) => {
      if (index < 0) { return optionsLength - 1 }
      if (index >= optionsLength) { return 0 }
      return index
    }

    this.setState((prevState) => {
      return { selectedIndex: normalize(prevState.selectedIndex + offset) }
    }, this.adjustOffet)
  }

  adjustOffet () {
    const { selectedIndex } = this.state
    const optionSelected = findDOMNode(this.refs[`option-${selectedIndex}`])
    const optionList = findDOMNode(this.refs.optionList)

    if (selectedIndex === INITIAL_INDEX) return
    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true })
  }

  selectCurrentOption () {
    const options = this.loadOptions()
    const { selectedIndex } = this.state

    if (selectedIndex === INITIAL_INDEX || options.length === 0) { return }

    const { value } = options[selectedIndex]
    return this.handleOptionSelected(value)
  }

  sendBlur () {
    const { name, onBlur } = this.props

    if (typeof onBlur === 'function') { onBlur(name) }
  }

  sendChange (value) {
    const { name, onChange } = this.props

    if (typeof onChange === 'function') { onChange(name, value) }
  }

  searchOn () {
    const { minOptionsForSearch, options, readOnly } = this.props

    if (readOnly) return false
    if (minOptionsForSearch === Infinity) { return true }
    return minOptionsForSearch < options.length
  }

  render () {
    const { name, placeholder, readOnly } = this.props
    const options = this.loadOptions()
    const searchOn = this.searchOn()
    const {
      isOpen,
      searchQuery,
      selectedIndex,
      selectedValue
    } = this.state

    const optionList = options.map((option, i) =>
      <Option
        key={option.value}
        label={option.label.toString()}
        onClick={(value) => this.handleOptionSelected(value)}
        onMouseEnter={(value) => this.handleOptionHover(value)}
        hasFocus={selectedIndex === i}
        ref={`option-${i}`}
        searchQuery={searchQuery.toString()}
        selectedValue={new RegExp(`^${selectedValue}$`, 'i').test(option.value)}
        value={option.value}
        highlighText={searchOn}
      />
    )

    return (
      <div ref='autocomplete' className={classNames('Autocomplete', {'is-searching': isOpen}, {'Autocomplete--noReadOnly': !readOnly})}>
        <Input
          className='Autocomplete-search'
          name={name}
          onChange={this.handleSearchQueryChange}
          onClick={this.handleSearchClick}
          onFocus={this.props.onFocus}
          onKeyDown={this.handleSearchKeyDown}
          placeholder={placeholder}
          readOnly={!searchOn}
          type='text'
          value={searchQuery}
        />
        <Options ref='optionList'>
          {optionList}
        </Options>
      </div>
    )
  }
}

const { array, bool, func, number, string } = PropTypes

Autocomplete.defaultProps = {
  minOptionsForSearch: Infinity
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
