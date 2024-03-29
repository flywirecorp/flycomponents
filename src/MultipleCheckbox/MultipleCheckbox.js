import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import FormGroup from '../FormGroup';

class MultipleCheckbox extends Component {
  state = {
    checked: this.props.checked
  };

  handleChange = ({ value }) => {
    const { name, onChange } = this.props;
    const { checked } = this.state;
    let newChecked;

    if (checked.includes(value)) {
      const index = checked.indexOf(value);
      newChecked = [...checked.slice(0, index), ...checked.slice(index + 1)];
    } else {
      newChecked = [...checked, value];
    }

    this.setState(
      () => {
        return { checked: newChecked };
      },
      () => onChange({ name, checked: newChecked })
    );
  };

  render() {
    const {
      disabled,
      error,
      hint,
      label,
      name,
      options,
      required
    } = this.props;
    const { checked } = this.state;
    const checkboxes = options.map(option => (
      <Checkbox
        checked={checked.includes(option.value)}
        disabled={disabled}
        required={required}
        id={`${name}-${option.value}`}
        key={option.value}
        label={option.label}
        name={name}
        onChange={() => this.handleChange(option)}
        value={option.value}
      />
    ));

    return (
      <FormGroup
        error={error}
        floatingLabel={false}
        hint={hint}
        label={label}
        name={name}
        required={required}
      >
        <fieldset aria-labelledby={`${name}-label`}>{checkboxes}</fieldset>
      </FormGroup>
    );
  }
}

MultipleCheckbox.propTypes = {
  checked: PropTypes.array,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  required: PropTypes.bool
};

MultipleCheckbox.defaultProps = {
  checked: [],
  disabled: false,
  onChange: () => {},
  options: [],
  required: false
};

export default MultipleCheckbox;
