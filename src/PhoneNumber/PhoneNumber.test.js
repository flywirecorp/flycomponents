import React from 'react';
import { shallow } from 'enzyme';
import PhoneNumber from './PhoneNumber';
import FlagSelector from './FlagSelector';

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

    clickCountry(value) {
      this.component.find(FlagSelector).simulate('change', null, value);
    }

    flagSelector() {
      return this.component.find(FlagSelector);
    }

    selectedCountry() {
      return this.component.find(FlagSelector).prop('value');
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
        dialingCode: '1',
        phonePattern: '+. (...) ...-....'
      }
    ];
    const onChange = jest.fn();
    const name = 'phone';
    const component = new PhoneNumberComponent({ countries, name, onChange });

    component.pressKey('+');

    expect(onChange).toBeCalledWith(name, '+');

    component.pressKey('1');

    expect(onChange).toBeCalledWith(name, '+1');

    component.pressKey('2');

    expect(onChange).toBeCalledWith(name, '+1 (2');
  });

  test('adds the dialingCode on click on a country', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34',
        phonePattern: '+.. ... ... ...'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1',
        phonePattern: '+. (...) ...-....'
      }
    ];
    const component = new PhoneNumberComponent({ countries });
    component.clickCountry('es');

    expect(component.input().prop('value')).toBe('+34');

    component.clickCountry('us');

    expect(component.input().prop('value')).toBe('+1');
  });

  describe('several countries with the same dialing code', () => {
    const countries = [
      {
        label: 'Canada (+1)',
        value: 'ca',
        dialingCode: '1',
        phonePattern: '+.. ... ... ...'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1',
        phonePattern: '+.. ... ... ...'
      }
    ];

    test('fomats the number using the first country that matches', () => {
      const component = new PhoneNumberComponent({ countries });

      component.pressKey('1');
      component.pressKey('2');

      expect(component.selectedCountry()).toBe('ca');

      expect(component.input().prop('value')).toBe('+12');
    });

    test('formats the number using the country selected by the user', () => {
      const component = new PhoneNumberComponent({ countries });

      component.clickCountry('us');
      component.pressKey('2');

      expect(component.selectedCountry()).toBe('us');

      expect(component.input().prop('value')).toBe('+12');
    });
  });

  test('selects a country typing a dialing code', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34',
        phonePattern: '+.. ... ... ...'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1',
        phonePattern: '+. (...) ...-....'
      }
    ];
    const component = new PhoneNumberComponent({ countries });
    component.pressKey('1');

    expect(component.selectedCountry()).toBe('us');

    component.pressKey('delete');
    component.pressKey('3');
    component.pressKey('4');

    expect(component.selectedCountry()).toBe('es');
  });

  test('replaces the dialingCode on country click', () => {
    const value = '+34 666 66 66';
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34',
        phonePattern: '+.. ... ... ...'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1',
        phonePattern: '+. (...) ...-....'
      }
    ];
    const component = new PhoneNumberComponent({ countries, value });

    component.clickCountry('us');

    expect(component.input().prop('value')).toBe('+1 (666) 666-6');
  });

  describe('having read-only property', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34',
        phonePattern: '+.. ... ... ...'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1',
        phonePattern: '+. (...) ...-....'
      }
    ];
    const component = new PhoneNumberComponent({ countries, readOnly: true });

    test('renders a read-only input', () => {
      expect(component.input().prop('readOnly')).toBe(true);
    });

    test('passes read-only property to FlagSelector', () => {
      expect(component.flagSelector().prop('readOnly')).toBe(true);
    });
  });

  describe('having disabled property', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34',
        phonePattern: '+.. ... ... ...'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1',
        phonePattern: '+. (...) ...-....'
      }
    ];
    const component = new PhoneNumberComponent({ countries, disabled: true });

    test('renders a disabled input', () => {
      expect(component.input().prop('disabled')).toBe(true);
    });

    test('passes disabled property to FlagSelector', () => {
      expect(component.flagSelector().prop('disabled')).toBe(true);
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

  describe('moves phone number caret when', () => {
    test('formatter adds characters', () => {
      const countries = [
        {
          label: 'Spain (+34)',
          value: 'es',
          dialingCode: '34',
          phonePattern: '+.. ... ... ...'
        }
      ];

      const component = new PhoneNumberComponent({ countries });
      const setSelectionRange = jest.fn();
      component.mockRefs(setSelectionRange);

      component.clickCountry('es');
      component.pressKey('1', 4);

      expect(component.input().prop('value')).toBe('+34 1');
      expect(setSelectionRange).toBeCalledWith(5, 5);
    });

    test('removing and adding characters', () => {
      const countries = [
        {
          label: 'Spain (+34)',
          value: 'es',
          dialingCode: '34',
          phonePattern: '+.. ... ... ...'
        }
      ];

      const component = new PhoneNumberComponent({ countries });
      const setSelectionRange = jest.fn();
      component.mockRefs(setSelectionRange);

      component.clickCountry('es');
      component.pressKey('1', 4);
      component.pressKey('2', 5);
      component.pressKey('3', 6);
      component.pressKey('4', 7);
      component.pressKey('delete');
      component.pressKey('delete');
      setSelectionRange.mockClear();
      component.pressKey('5', 6);
      component.pressKey('6', 7);
      component.pressKey('7', 8);

      expect(component.input().prop('value')).toBe('+34 125 76');
    });
  });

  test('reformats the number when deleting numbers in the middle', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34',
        phonePattern: '+.. ... ... ...'
      }
    ];

    const component = new PhoneNumberComponent({ countries });
    const setSelectionRange = jest.fn();
    component.mockRefs(setSelectionRange);

    component.clickCountry('es');
    component.pressKey('1', 4);
    component.pressKey('2');
    component.pressKey('3');
    component.pressKey('4');
    component.pressKey('5');
    component.pressKey('6');
    component.pressKey('7');
    component.pressKey('8');
    component.pressKey('9');

    component.pressKey('delete', 8);
    component.pressKey('delete', 8);
    component.pressKey('delete', 8);

    expect(component.input().prop('value')).toBe('+34 123 789');
  });
});
