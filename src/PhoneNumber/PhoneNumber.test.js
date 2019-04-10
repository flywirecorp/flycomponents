import React from 'react';
import { shallow } from 'enzyme';
import PhoneNumber from './PhoneNumber';
import PrefixSelector from './PrefixSelector';

describe('PhoneNumber', () => {
  class PhoneNumberComponent {
    constructor(ownProps) {
      const defaultProps = {
        countries: [],
        label: 'Phone',
        name: 'phone'
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<PhoneNumber {...props} />);

      this.mockRefs();
    }

    input() {
      return this.component.find('input');
    }

    simulateBlur(name) {
      this.input().simulate('blur', {
        target: { name }
      });
    }

    pressKey(key, caretPosition = 0) {
      const prevValue = this.input().prop('value');
      const nextValue =
        key === 'delete'
          ? this.deleteKey(prevValue, caretPosition)
          : this.addKey(prevValue, key, caretPosition);

      this.input().simulate('change', {
        target: { value: nextValue, selectionStart: caretPosition }
      });
    }

    addKey(prevValue, key, caretPosition) {
      return caretPosition === 0
        ? `${prevValue}${key}`
        : `${prevValue.slice(0, caretPosition)}${key}${prevValue.slice(
            caretPosition
          )}`;
    }

    deleteKey(prevValue, caretPosition) {
      return caretPosition === 0
        ? prevValue.slice(0, -1)
        : `${prevValue.slice(0, caretPosition)}${prevValue.slice(
            caretPosition + 1
          )}`;
    }

    prefixSelector() {
      return this.component.find(PrefixSelector);
    }

    mockRefs(mock = () => {}) {
      this.component.instance().numberInputRef.current = {
        setSelectionRange: mock
      };
    }
  }

  test('renders an input text', () => {
    const component = new PhoneNumberComponent();

    expect(component.input()).toHaveLength(1);
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const component = new PhoneNumberComponent({ onBlur });

    component.simulateBlur('phone');

    expect(onBlur).toBeCalled();
  });

  test('handles on change event in input', () => {
    const countries = [
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const onChange = jest.fn();
    const name = 'phone';
    const component = new PhoneNumberComponent({ countries, name, onChange });

    component.pressKey('1');

    expect(onChange).toBeCalledWith(name, '1');

    component.pressKey('2');

    expect(onChange).toBeCalledWith(name, '12');
  });

  test('handles on change event in input', () => {
    const countries = [
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const onChange = jest.fn();
    const name = 'phone';

    const component = new PhoneNumberComponent({ countries, name, onChange });
    component.pressKey('1');

    expect(onChange).toBeCalledWith(name, '1');

    component.pressKey('2');

    expect(onChange).toBeCalledWith(name, '12');
  });

  describe('having read-only property', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const component = new PhoneNumberComponent({ countries, readOnly: true });

    test('renders a read-only input', () => {
      expect(component.input().prop('readOnly')).toBe(true);
    });

    test('passes read-only property to PrefixSelector', () => {
      expect(component.prefixSelector().prop('readOnly')).toBe(true);
    });
  });

  describe('having disabled property', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const component = new PhoneNumberComponent({ countries, disabled: true });

    test('renders a disabled input', () => {
      expect(component.input().prop('disabled')).toBe(true);
    });

    test('passes disabled property to PrefixSelector', () => {
      expect(component.prefixSelector().prop('disabled')).toBe(true);
    });
  });

  test('renders a custom attribute', () => {
    const ownProps = { custom_prop: 'a_data' };

    const component = new PhoneNumberComponent(ownProps);

    expect(component.component.find('[custom_prop="a_data"]')).toHaveLength(1);
  });

  test('does not render unused component attributes', () => {
    const ownProps = { onBlur: () => {} };

    const component = new PhoneNumberComponent(ownProps);

    expect(
      component.component
        .find('.PhoneNumber')
        .first()
        .prop('onBlur')
    ).toBe(undefined);
  });
});
