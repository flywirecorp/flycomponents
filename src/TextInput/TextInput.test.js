import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';
import InputGroup from '../InputGroup';
import Textarea from '../Textarea';

describe('TextInput', () => {
  class TextInputComponent {
    constructor(ownProps) {
      const defaultProps = { name: 'name' };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<TextInput {...props} />);
      this.mockRefs();
    }

    inputGroup() {
      return this.component.find(InputGroup);
    }

    textarea() {
      return this.component.find(Textarea);
    }

    input() {
      return this.component.find('input');
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

    mockRefs(mock = () => {}) {
      this.component.instance().inputRef.current = {
        setSelectionRange: mock
      };
    }
  }

  test('renders an input text', () => {
    const component = new TextInputComponent();

    expect(component.input()).toHaveLength(1);
    expect(component.input().prop('type')).toEqual('text');
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

  test('renders a input group with suffix', () => {
    const component = new TextInputComponent({ suffix: 'suffix' });
    const inputGroup = component.inputGroup();

    expect(inputGroup).toHaveLength(1);
    expect(inputGroup.prop('suffix')).toEqual('suffix');
  });

  describe('componentDidUpdate', () => {
    test('sets the input caret position with the position in the state', () => {
      const wrapper = new TextInputComponent();
      const setSelectionRange = jest.fn();
      wrapper.mockRefs(setSelectionRange);

      wrapper.component.setState({ caretPosition: 2 });

      expect(setSelectionRange).toHaveBeenCalledWith(2, 2);
    });
  });

  describe('onChange', () => {
    test('handles on change events in input', () => {
      const onChange = jest.fn();
      const props = { onChange };

      const component = new TextInputComponent(props);

      component.simulateChange('name', 'Dolores');

      expect(onChange).toBeCalledWith('name', 'Dolores');
    });

    describe('when format is not provided', () => {
      test('saves in the state the value and caret position', () => {
        const value = 'a_value';
        const caretPosition = 2;
        const name = 'a_name';
        const event = {
          target: { name, value, selectionStart: caretPosition }
        };
        const wrapper = new TextInputComponent();

        const input = wrapper.input();
        input.simulate('change', event);

        const {
          value: stateValue,
          caretPosition: stateCaretPosition
        } = wrapper.component.state();
        expect(stateValue).toEqual(value);
        expect(stateCaretPosition).toEqual(caretPosition);
      });

      test('calls onChange callback with name and value', () => {
        const onChange = jest.fn();
        const value = 'a_value';
        const name = 'a_name';
        const event = { target: { name, value } };
        const wrapper = new TextInputComponent({ name, onChange });

        const input = wrapper.input();
        input.simulate('change', event);

        expect(onChange).toHaveBeenCalledWith(name, value);
      });
    });

    describe('when format is provided', () => {
      const onChange = jest.fn();
      const format = {
        pattern: '..-../..',
        options: { shouldAddSeparatorBeforeTyping: true }
      };

      test('formats the input value on change if format is provnameed', () => {
        const value = '123456';
        const formattedValue = '12-34/56';
        const event = { target: { value } };
        const name = 'a_name';
        const wrapper = new TextInputComponent({ name, onChange, format });

        let input = wrapper.input();
        input.simulate('change', event);

        input = wrapper.input();
        expect(input.prop('value')).toEqual(formattedValue);
      });

      test('calls onChange callback with name and formatted value', () => {
        const value = '123456';
        const name = 'a_name';
        const onChange = jest.fn();
        const formattedValue = '12-34/56';
        const event = { target: { name, value } };
        const wrapper = new TextInputComponent({ name, onChange, format });

        const input = wrapper.input();
        input.simulate('change', event);

        expect(onChange).toHaveBeenCalledWith(name, formattedValue);
      });

      describe('sets input caret position', () => {
        test('does not modifies the caret position if no format changes have been applied', () => {
          const value = '1';
          const caretPosition = 1;
          const event = { target: { value, selectionStart: caretPosition } };
          const name = 'a_name';
          const wrapper = new TextInputComponent({ name, format });

          const input = wrapper.input();
          input.simulate('change', event);

          const {
            caretPosition: stateCaretPosition
          } = wrapper.component.state();

          expect(stateCaretPosition).toEqual(caretPosition);
        });

        test('increases the caret position if a separator is added by the formatting', () => {
          const value = '12';
          const caretPosition = 2;
          const event = { target: { value, selectionStart: caretPosition } };
          const name = 'a_name';
          const wrapper = new TextInputComponent({ name, format });

          const input = wrapper.input();
          input.simulate('change', event);

          const {
            caretPosition: stateCaretPosition
          } = wrapper.component.state();

          expect(stateCaretPosition).toBeGreaterThan(caretPosition);
        });

        test('does not increases the caret position by formatting if user is deleting', () => {
          const value = '12-';
          const caretPosition = 2;
          const event = { target: { value, selectionStart: caretPosition } };
          const name = 'a_name';
          const wrapper = new TextInputComponent({ name, format });

          wrapper.component.setState({ value: '12-' });
          const input = wrapper.input();
          input.simulate('change', event);

          const {
            caretPosition: stateCaretPosition
          } = wrapper.component.state();

          expect(stateCaretPosition).toEqual(caretPosition);
        });
      });
    });
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const component = new TextInputComponent({ onBlur });

    component.simulateBlur('name');

    expect(onBlur).toBeCalled();
  });

  test('renders an input with type password', () => {
    const type = 'password';
    const component = new TextInputComponent({ type });

    expect(component.input().prop('type')).toEqual('password');
  });

  test('renders an input group with type password', () => {
    const type = 'password';
    const suffix = 'suffix';
    const component = new TextInputComponent({ type, suffix });

    expect(component.inputGroup().prop('type')).toEqual('password');
  });
});
