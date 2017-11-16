import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputGroup from '../InputGroup';
import Textarea from '../Textarea';
import Input from '../Input';
import FormGroup from '../FormGroup';

class TextInput extends Component {
  static propTypes = {
    error: PropTypes.string,
    hint: PropTypes.string,
    label: PropTypes.string,
    multiline: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    prefix: PropTypes.string,
    required: PropTypes.bool,
    sufix: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    multiline: false,
    onBlur: () => {},
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  fieldValue() {
    return this.state.value;
  }

  handleBlur = e => {
    const { onBlur } = this.props;
    const { name } = e.target;

    onBlur(name);
  };

  handleChange = e => {
    const { onChange } = this.props;
    let { name, value } = e.target;

    onChange(name, value);
    this.setState({ value });
  };

  input() {
    const { multiline, sufix, prefix, ...inputAttrs } = this.props;

    return (
      <Input
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        type="text"
        value={this.fieldValue()}
      />
    );
  }

  inputGroup() {
    const { multiline, prefix, sufix, ...inputAttrs } = this.props;

    return (
      <InputGroup
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        prefix={prefix}
        sufix={sufix}
        type="text"
        value={this.fieldValue()}
      />
    );
  }

  textArea() {
    const { multiline, prefix, sufix, ...inputAttrs } = this.props;

    return (
      <Textarea
        {...inputAttrs}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        value={this.fieldValue()}
      />
    );
  }

  renderElement() {
    const { multiline, prefix, sufix } = this.props;

    if (multiline) {
      return this.textArea();
    }

    if (sufix || prefix) {
      return this.inputGroup();
    } else {
      return this.input();
    }
  }

  render() {
    const { error, hint, label, name, required } = this.props;

    return (
      <FormGroup
        error={error}
        hint={hint}
        label={label}
        name={name}
        required={required}
      >
        {this.renderElement()}
      </FormGroup>
    );
  }
}

export default TextInput;
