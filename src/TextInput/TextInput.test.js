import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';
import InputGroup from '../InputGroup';
import Textarea from '../Textarea';
import Input from '../Input';

describe('TextInput', () => {
  class TextInputComponent {
    constructor(ownProps) {
      const defaultProps = { name: 'name' };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<TextInput {...props} />);
    }

    inputGroup() {
      return this.component.find(InputGroup);
    }

    textarea() {
      return this.component.find(Textarea);
    }

    input() {
      return this.component.find(Input);
    }

    simulateBlur(name) {
      this.input().simulate('blur', {
        target: { name }
      });
    }

    simulateChange(name, value) {
      this.input().simulate('change', {
        target: { name, value }
      });
    }
  }

  test('renders an input text', () => {
    const component = new TextInputComponent();

    expect(component.input()).toHaveLength(1);
  });

  test('renders a textarea', () => {
    const component = new TextInputComponent({ multiline: true });

    expect(component.textarea()).toHaveLength(1);
  });

  test('renders a input group with prefix', () => {
    const component = new TextInputComponent({ prefix: 'PREFIX' });
    const inputGroup = component.inputGroup();

    expect(inputGroup).toHaveLength(1);
    expect(inputGroup.prop('prefix')).toEqual('PREFIX');
  });

  test('renders a input group with sufix', () => {
    const component = new TextInputComponent({ sufix: 'SUFIX' });
    const inputGroup = component.inputGroup();

    expect(inputGroup).toHaveLength(1);
    expect(inputGroup.prop('sufix')).toEqual('SUFIX');
  });

  test('handles on change events in input', () => {
    const onChange = jest.fn();
    const props = { onChange };

    const component = new TextInputComponent(props);

    component.simulateChange('name', 'Dolores');

    expect(onChange).toBeCalledWith('name', 'Dolores');
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const component = new TextInputComponent({ onBlur });

    component.simulateBlur('name');

    expect(onBlur).toBeCalled();
  });
});
