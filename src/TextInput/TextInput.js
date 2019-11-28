import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputGroup from '../InputGroup';
import Textarea from '../Textarea';
import Input from '../Input';
import FormGroup from '../FormGroup';

class TextInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    hint: PropTypes.string,
    label: PropTypes.string,
    multiline: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    prefix: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    suffix: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    floatingLabel: true,
    multiline: false,
    onBlur: () => {},
    onChange: () => {},
    readOnly: false,
    type: 'text'
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      hasValue: !!props.value,
      isFocused: false
    };
  }

  get fieldValue() {
    return this.state.value;
  }

  handleBlur = e => {
    const { onBlur } = this.props;
    const { name } = e.target;
    this.setState({ isFocused: false });

    onBlur(name);
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { name, value } = e.target;

    onChange(name, value);
    this.setState({ value, hasValue: !!value });
  };

  handleFocus = e => {
    const { disabled, readOnly } = this.props;
    if (disabled || readOnly) return false;
    this.setState({ isFocused: true });
  };

  get inputAttrs() {
    const {
      floatingLabel: _floatingLabel,
      multiline: _multiline,
      hint: _hint,
      label: _label,
      onBlur: _onBlur,
      onChange: _onChange,
      type,
      disabled,
      error,
      name,
      readOnly,
      required,
      ...other
    } = this.props;

    return {
      type,
      disabled,
      error,
      name,
      readOnly,
      required,
      value: this.fieldValue,
      ...other
    };
  }

  input() {
    return (
      <Input
        {...this.inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
      />
    );
  }

  inputGroup() {
    const { prefix, suffix } = this.props;

    return (
      <InputGroup
        {...this.inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        prefix={prefix}
        suffix={suffix}
      />
    );
  }

  textArea() {
    const { type: _type, name, ...inputAttrs } = this.inputAttrs;

    return (
      <Textarea
        {...inputAttrs}
        aria-describedby={`${name}-error-msg`}
        aria-labelledby={`${name}-label-msg`}
        name={name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
      />
    );
  }

  renderElement() {
    const { multiline, prefix, suffix } = this.props;

    if (multiline) {
      return this.textArea();
    }

    if (suffix || prefix) {
      return this.inputGroup();
    } else {
      return this.input();
    }
  }

  render() {
    const {
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      name,
      prefix,
      readOnly,
      required,
      suffix
    } = this.props;

    const { isFocused, hasValue } = this.state;

    return (
      <FormGroup
        className="TextInput"
        disabled={disabled}
        error={error}
        floatingLabel={floatingLabel}
        hasPrefix={!!prefix}
        hasSuffix={!!suffix}
        hasValue={hasValue}
        hint={hint}
        isFocused={isFocused}
        label={label}
        name={name}
        readOnly={readOnly}
        required={required}
      >
        {this.renderElement()}
      </FormGroup>
    );
  }
}

export default TextInput;
