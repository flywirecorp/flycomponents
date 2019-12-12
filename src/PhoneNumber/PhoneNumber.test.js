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

  describe('set class name according to the length of the prefix', () => {
    const defaultProps = {
      countries: [
        {
          label: 'American Samoa',
          value: 'as',
          dialingCode: '1684'
        },
        {
          label: 'Spain',
          value: 'es',
          dialingCode: '34'
        }
      ],
      label: 'Phone',
      name: 'phone'
    };

    test('when no prefix value', () => {
      const phoneNumber = shallow(<PhoneNumber {...defaultProps} />);

      expect(phoneNumber.hasClass('width-0')).toBe(true);
    });

    test('when prefix length is 2', () => {
      const ownProps = {
        value: '+34 666666666'
      };
      const props = { ...defaultProps, ...ownProps };

      const phoneNumber = shallow(<PhoneNumber {...props} />);

      expect(phoneNumber.hasClass('width-2')).toBe(true);
    });

    test('when prefix length is 4', () => {
      const ownProps = {
        value: '+1684 155555555'
      };
      const props = { ...defaultProps, ...ownProps };

      const phoneNumber = shallow(<PhoneNumber {...props} />);

      expect(phoneNumber.hasClass('width-4')).toBe(true);
    });
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

  describe('ignores invalid countries', () => {
    test('ignores invalid options', () => {
      const countries = [
        {
          label: 'Spain',
          value: 'ES',
          dialingCode: '34'
        },
        {
          label: 'United States',
          value: 'US',
          dialingCode: null
        },
        {
          label: 'Canada',
          value: 'CA',
          dialingCode: undefined
        }
      ];
      const component = new PhoneNumberComponent({ countries });
      expect(component.prefixSelector().prop('options')).toHaveLength(1);
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

  describe('when changing prefix selector', () => {
    test('if formatted number then saves the prefix appended with the formatted number as phone number', () => {
      const onChange = jest.fn();
      const name = 'phone';
      const prefix = '34';
      const formattedNumber = '666666666';
      const expectedPhoneNumber = '+34 666666666';
      const value = prefix;
      const component = new PhoneNumberComponent({ name, onChange });

      const prefixSelector = component.prefixSelector();
      component.component.setState({ formattedNumber });
      prefixSelector.simulate('change', name, value);

      expect(onChange).toHaveBeenCalledWith(name, expectedPhoneNumber);
    });

    test('if no formatted number then saves the prefix as phone number', () => {
      const onChange = jest.fn();
      const name = 'phone';
      const prefix = '34';
      const expectedPhoneNumber = '+34 ';
      const value = prefix;
      const component = new PhoneNumberComponent({ name, onChange });

      const prefixSelector = component.prefixSelector();

      prefixSelector.simulate('change', name, value);

      expect(onChange).toHaveBeenCalledWith(name, expectedPhoneNumber);
    });
  });

  describe('passes other properties to the inner input field', () => {
    const component = new PhoneNumberComponent({ 'aria-required': true });

    const input = component.input();

    expect(input.prop('aria-required')).toBe(true);
  });
});
