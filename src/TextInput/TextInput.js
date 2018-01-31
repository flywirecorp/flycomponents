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

  fieldValue() {
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
    let { name, value } = e.target;

    onChange(name, value);
    this.setState({ value, hasValue: !!value });
  };

  handleFocus = e => {
    const { disabled, readOnly } = this.props;
    if (disabled || readOnly) return false;
    this.setState({ isFocused: true });
  };

  input() {
    const {
      floatingLabel,
      multiline,
      suffix,
      prefix,
      type,
      ...inputAttrs
    } = this.props;

    return (
      <Input
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        type={type}
        value={this.fieldValue()}
      />
    );
  }

  inputGroup() {
    const {
      floatingLabel,
      multiline,
      prefix,
      suffix,
      type,
      ...inputAttrs
    } = this.props;

    return (
      <InputGroup
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        prefix={prefix}
        suffix={suffix}
        type={type}
        value={this.fieldValue()}
      />
    );
  }

  textArea() {
    const {
      floatingLabel,
      multiline,
      prefix,
      suffix,
      ...inputAttrs
    } = this.props;

    return (
      <Textarea
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        value={this.fieldValue()}
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
