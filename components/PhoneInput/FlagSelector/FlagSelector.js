import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import onClickOutside from 'react-onclickoutside'
import classNames from 'classnames'
import scrollIntoView from 'dom-scroll-into-view'
import Option from './Option'
import Options from './Options'

const INITIAL_INDEX = -1
const KEYS = [13, 27, 38, 40]
const [ENTER, ESC, ARROW_UP, ARROW_DOWN] = KEYS

export class FlagSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      selectedIndex: INITIAL_INDEX,
      typedQuery: ''
    }

    this.typedQueryTimer = 0
  }

  adjustOffet () {
    const { selectedIndex } = this.state
    const optionSelected = findDOMNode(this.refs[`option-${selectedIndex}`])
    const optionList = findDOMNode(this.refs.optionList)

    if (selectedIndex === INITIAL_INDEX) return
    scrollIntoView(optionSelected, optionList, { onlyScrollIfNeeded: true })
  }

  handleClickOutside (e) {
    const { value } = this.props
    const selectedIndex = this.getOptionIndexByValue(value)
    this.setState(() => {
      return { isOpen: false, selectedIndex }
    })
  }

  getOptionIndexByValue (value) {
    const { options } = this.props
    return options.findIndex(option => option.value === value)
  }

  handleMenuKeydown = (e) => {
    if (KEYS.includes(e.keyCode)) { e.preventDefault() }
    this.showOptions()

    switch (e.keyCode) {
      case ARROW_DOWN: return this.moveIndexUp()
      case ARROW_UP: return this.moveIndexDown()
      case ENTER: return this.selectCurrentOption()
      case ESC: return this.hideOptions()
      default: return this.handleTypedChar(e.keyCode)
    }
  }

  handleTypedChar (keyCode) {
    const newChar = String.fromCharCode(keyCode).toLowerCase()
    clearTimeout(this.typedQueryTimer)

    this.setState((prevState) => {
      return { typedQuery: prevState.typedQuery.concat(newChar) }
    }, this.searchTypedCountry)

    this.typedQueryTimer = setTimeout(() => {
      this.setState({
        typedQuery: ''
      })
    }, 2000)
  }

  searchTypedCountry () {
    const { options } = this.props
    const { typedQuery } = this.state

    const searchedOptionIndex = options.findIndex(
      (option) => option.label.toLowerCase().startsWith(typedQuery)
    )
    this.setState({
      selectedIndex: searchedOptionIndex
    }, this.adjustOffet)
  }

  handleOptionSelected = (value) => {
    const selectedIndex = this.getOptionIndexByValue(value)
    this.hideOptions()
    this.setState(() => {
      return {
        isOpen: false,
        selectedIndex
      }
    }, this.sendChange(value))
  }

  handleMenuClick = () => {
    const { onFocus, readOnly } = this.props
    if (readOnly) return false
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen }
    }, onFocus)
  }

  handleOptionHover (value) {
    const selectedIndex = this.getOptionIndexByValue(value)
    return this.setState({ selectedIndex })
  }

  hideOptions () {
    this.setState({ isOpen: false })
  }

  moveIndexDown () {
    this.moveIndex(-1)
  }

  moveIndexUp () {
    this.moveIndex(1)
  }

  moveIndex (offset) {
    const { options } = this.props
    const optionsLength = options.length
    const normalize = (index) => {
      if (index < 0) { return optionsLength - 1 }
      if (index >= optionsLength) { return 0 }
      return index
    }

    this.setState((prevState) => {
      return { selectedIndex: normalize(prevState.selectedIndex + offset) }
    }, this.adjustOffet)
  }

  showOptions () {
    const { readOnly } = this.props
    if (readOnly) return false

    this.setState({ isOpen: true })
  }

  selectCurrentOption () {
    const { options } = this.props
    const { selectedIndex } = this.state

    if (selectedIndex === INITIAL_INDEX) { return }

    const { value } = options[selectedIndex]
    return this.handleOptionSelected(value)
  }

  sendChange (value) {
    const { name, onChange } = this.props

    if (typeof onChange === 'function') { onChange(name, value) }
  }

  render () {
    const { value = '' } = this.props
    const { options } = this.props
    const { isOpen, selectedIndex } = this.state

    const optionList = options.map((option, i) =>
      <Option
        country={option.label}
        dialingCode={option.dialingCode}
        hasFocus={selectedIndex === i}
        key={option.value}
        onClick={(value) => this.handleOptionSelected(value)}
        onMouseEnter={(value) => this.handleOptionHover(value)}
        ref={`option-${i}`}
        value={option.value}
      />
    )

    return (
      <div ref='phoneInput' className={classNames('Autocomplete', {'is-searching': isOpen}, 'PhoneNumber-menu')}>
        <span
          className='Autocomplete-search PhoneNumber-menu-input'
        >
          { value
              ? <span className={classNames('Flag', {[`Flag--${value.toLowerCase()}`]: value})} />
              : null
          }
        </span>
        <input
          autoComplete={false}
          className='PhoneNumber-menu-fakeInput'
          onClick={this.handleMenuClick}
          onKeyDown={this.handleMenuKeydown}
          type='text'
        />

        <Options ref='optionList'>
          {optionList}
        </Options>
      </div>
    )
  }
}

const { array, bool, func, string } = PropTypes

FlagSelector.propTypes = {
  label: string,
  name: string.isRequired,
  onChange: func,
  onFocus: func,
  options: array.isRequired,
  readOnly: bool,
  value: string
}

export default onClickOutside(FlagSelector)
