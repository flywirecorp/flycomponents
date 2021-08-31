import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

describe('Input', () => {
  class InputComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'name',
        type: 'text'
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Input {...props} />);
    }

    input() {
      return this.component.find('input');
    }
  }

  test('renders an input', () => {
    const name = 'amount';
    const type = 'number';
    const component = new InputComponent({ name, type });

    expect(component.input()).toHaveLength(1);

    expect(component.input().prop('name')).toBe('amount');

    expect(component.input().prop('type')).toBe('number');
  });

  test('renders a read-only input if the property is set', () => {
    const component = new InputComponent({ readOnly: true });

    expect(component.input().prop('readOnly')).toBe(true);
  });

  describe('when value property is given', () => {
    test('sets default value', () => {
      const component = componentWithValue('Something');

      expect(component.input().prop('defaultValue')).toBe('Something');
    });

    test('never sets value property', () => {
      const component = componentWithValue();

      expect(component.input().prop('value')).toBeUndefined();
    });

    function componentWithValue(value = 'anything') {
      return new InputComponent({ value });
    }
  });

  describe('aria-describedby attribute', () => {
    expect(
      new InputComponent({
        name: 'name'
      })
        .input()
        .prop('aria-describedby')
    ).toBeUndefined();

    expect(
      new InputComponent({
        name: 'name',
        error: 'ups'
      })
        .input()
        .prop('aria-describedby')
    ).toEqual('name-error-msg');

    expect(
      new InputComponent({
        name: 'name',
        hint: 'hint'
      })
        .input()
        .prop('aria-describedby')
    ).toEqual('name-hint-msg');

    expect(
      new InputComponent({
        name: 'name',
        hint: 'hint',
        ariaDescribedBy: 'wadus',
      })
        .input()
        .prop('aria-describedby')
    ).toEqual('name-hint-msg wadus');
  });
});
