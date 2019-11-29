import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import FormGroup from '../../FormGroup';
import { format as formatText } from '../../utils/formatter';
import { getAriaDescribedBy } from '../../utils/aria';

class TextInput extends Component {
  static propTypes = {
    allowedCharacters: PropTypes.instanceOf(RegExp),
    ariaDescribedBy: PropTypes.string,
    ariaRequired: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    format: PropTypes.object,
    hint: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    ariaDescribedBy: '',
    ariaRequired: false,
    disabled: false,
    floatingLabel: true,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    readOnly: false,
    type: 'text',
    value: '',
    required: false
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      value: props.value,
      hasValue: !!props.value,
      isFocused: false,
      caretPosition: 0
    };
  }

  componentDidUpdate() {
    const { caretPosition } = this.state;

    if (this.isFocused) {
      this.inputRef.current.setSelectionRange(caretPosition, caretPosition);
    }
  }

  get isFocused() {
    return document.activeElement === this.inputRef.current;
  }

  fieldValue() {
    return this.state.value;
  }

  handleBlur = e => {
    const { onBlur } = this.props;
    const { name, value } = e.target;
    this.setState({ isFocused: false });

    onBlur(name, value);
  };

  getSeparatorsToPosition = (value, toPosition) => {
    return (value && value.substring(0, toPosition).match(/[^0-9]/g)) || [];
  };

  hasFormatChange = (lengthDiff, separatorsDiff) =>
    lengthDiff >= 0 && separatorsDiff !== 0;

  setCaretPosition = (currentPosition, currentValue, newValue) => {
    const { value } = this.state;
    if (
      currentValue.length < value.length &&
      value.length === newValue.length
    ) {
      currentPosition--;
    } else if (newValue.length > currentValue.length) {
      currentPosition++;
    }

    if (newValue.length > currentValue.length) {
      currentPosition++;
    }

    const currentSeparators = this.getSeparatorsToPosition(
      currentValue,
      currentPosition
    );

    const newSeparators = this.getSeparatorsToPosition(
      newValue,
      currentPosition
    );

    const lengthDiff = newValue.length - currentValue.length;
    const separatorsDiff = newSeparators.length - currentSeparators.length;

    const position = this.hasFormatChange(lengthDiff, separatorsDiff)
      ? currentPosition + (lengthDiff || 1)
      : currentPosition;

    return position;
  };

  handleChange = e => {
    const { onChange, format } = this.props;
    let { name, value: currentValue, selectionStart: caretPosition } = e.target;
    let value = currentValue;

    if (format) {
      value = formatText(currentValue, format);
      caretPosition = this.setCaretPosition(caretPosition, currentValue, value);
    }

    onChange(name, value);
    this.setState({ value, hasValue: !!value, caretPosition });
  };

  handleFocus = e => {
    const { disabled, readOnly, onFocus, name } = this.props;
    if (disabled || readOnly) return false;
    this.setState({ isFocused: true });

    onFocus(name);
  };

  input() {
    const {
      floatingLabel,
      type,
      format,
      name,
      className,
      children,
      disabled,
      error,
      readOnly,
      required,
      ariaDescribedBy,
      ariaRequired,
      ...inputAttrs
    } = this.props;

    return (
      <input
        {...inputAttrs}
        aria-describedby={getAriaDescribedBy(name, ariaDescribedBy)}
        aria-disabled={disabled}
        aria-invalid={!!error}
        aria-labelledby={`${name}-label`}
        aria-readonly={readOnly}
        aria-required={ariaRequired || required}
        name={name}
        id={name}
        ref={this.inputRef}
        className="Input"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        type={type}
        value={this.fieldValue()}
      />
    );
  }

  render() {
    const {
      disabled,
      className,
      error,
      floatingLabel,
      hint,
      label,
      name,
      readOnly,
      required,
      children
    } = this.props;

    const { isFocused, hasValue } = this.state;

    const formGroupClassName = classNames('TextInput', className);

    return (
      <FormGroup
        className={formGroupClassName}
        disabled={disabled}
        error={error}
        floatingLabel={floatingLabel}
        hasValue={hasValue}
        hint={hint}
        isFocused={isFocused}
        label={label}
        name={name}
        readOnly={readOnly}
        required={required}
      >
        {this.input()}
        {children}
      </FormGroup>
    );
  }
}

export default TextInput;
