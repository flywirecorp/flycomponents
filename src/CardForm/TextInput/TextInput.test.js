import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

describe('TextInput', () => {
  class TextInputComponent {
    constructor(ownProps) {
      const defaultProps = { name: 'name' };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<TextInput {...props} />);
      this.mockRefs();
    }

    input() {
      return this.component.find('input');
    }

    simulateBlur(name, value) {
      this.simulate('blur', {
        target: { name, value }
      });
    }

    simulateChange(name, value) {
      this.simulate('change', {
        target: { name, value }
      });
    }

    simulate(eventName, event) {
      this.input().simulate(eventName, event);
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

  test('renders an input field with the provided className', () => {
    const className = 'a_className';
    const component = new TextInputComponent({ className }).component;

    expect(component.hasClass('a_className')).toEqual(true);
  });

  test('renders the provided children', () => {
    const ChildrenComponent = () => <div />;
    const wrapper = shallow(
      <TextInput name="a_name">
        <ChildrenComponent />
      </TextInput>
    );

    expect(wrapper.find(ChildrenComponent)).toHaveLength(1);
  });

  describe('componentDidUpdate', () => {
    test('sets the input caret position with the position in the state when it is focused', () => {
      const wrapper = new TextInputComponent();
      const setSelectionRange = jest.fn();
      Object.defineProperty(wrapper.component.instance(), 'isFocused', {
        get: () => true
      });
      wrapper.mockRefs(setSelectionRange);

      wrapper.component.setState({ caretPosition: 2 });

      expect(setSelectionRange).toHaveBeenCalledWith(2, 2);
    });

    test('does not set the input caret position when it is not focused', () => {
      const wrapper = new TextInputComponent();
      Object.defineProperty(wrapper.component.instance(), 'isFocused', {
        get: () => false
      });
      const setSelectionRange = jest.fn();
      wrapper.mockRefs(setSelectionRange);

      wrapper.component.setState({ caretPosition: 2 });

      expect(setSelectionRange).not.toHaveBeenCalled();
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
        shouldAddSeparatorBeforeTyping: true,
        allowedCharacters: /\d/g
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

    component.simulateBlur('name', 'a_value');

    expect(onBlur).toBeCalledWith('name', 'a_value');
  });

  test('renders an input with type password', () => {
    const type = 'password';
    const component = new TextInputComponent({ type });

    expect(component.input().prop('type')).toEqual('password');
  });

  describe('onFocus', () => {
    test('calls the onFocus callback when on focus', () => {
      const name = 'a_name';
      const onFocus = jest.fn();
      const component = new TextInputComponent({ name, onFocus });

      component.simulate('focus');

      expect(onFocus).toHaveBeenCalledWith(name);
    });
  });
});
