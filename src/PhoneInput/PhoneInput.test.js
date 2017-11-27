import React from 'react';
import { shallow } from 'enzyme';
import PhoneInput from './PhoneInput';
import FlagSelector from './FlagSelector';

describe('PhoneInput', () => {
  class PhoneInputComponent {
    constructor(ownProps) {
      const defaultProps = {
        countries: [],
        label: 'Phone',
        name: 'phone'
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<PhoneInput {...props} />);
    }

    input() {
      return this.component.find('input');
    }

    simulateBlur(name) {
      this.input().simulate('blur', {
        target: { name }
      });
    }

    pressKey(key) {
      const prevValue = this.input().prop('value');
      const nextValue =
        key === 'delete' ? prevValue.slice(0, -1) : `${prevValue}${key}`;

      this.input().simulate('change', { target: { value: nextValue } });
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
  }

  test('renders an input text', () => {
    const component = new PhoneInputComponent();

    expect(component.input()).toHaveLength(1);
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const component = new PhoneInputComponent({ onBlur });

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
    const component = new PhoneInputComponent({ countries, name, onChange });

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
    const component = new PhoneInputComponent({ countries });
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
      const component = new PhoneInputComponent({ countries });

      component.pressKey('1');
      component.pressKey('2');

      expect(component.selectedCountry()).toBe('ca');

      expect(component.input().prop('value')).toBe('+12');
    });

    test('formats the number using the country selected by the user', () => {
      const component = new PhoneInputComponent({ countries });

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
    const component = new PhoneInputComponent({ countries });
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
    const component = new PhoneInputComponent({ countries, value });

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
    const component = new PhoneInputComponent({ countries, readOnly: true });

    test('renders a read-only input', () => {
      expect(component.input().prop('readOnly')).toBe(true);
    });

    test('passes read-only property to FlagSelector', () => {
      expect(component.flagSelector().prop('readOnly')).toBe(true);
    });
  });
});
