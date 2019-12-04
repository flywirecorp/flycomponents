import React from 'react';
import { shallow } from 'enzyme';
import MoneyInput from './MoneyInput';
import InputGroup from '../InputGroup';

describe('MoneyInput', () => {
  class MoneyInputComponent {
    constructor(ownProps) {
      const defaultProps = {
        currencySymbol: '$',
        decimalMark: '.',
        maxLength: 10,
        name: 'name',
        onChange: () => {},
        subunitToUnit: 100,
        thousandsSeparator: ','
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<MoneyInput {...props} />);
    }

    input() {
      return this.component.find(InputGroup);
    }

    simulateBlur(name, value) {
      this.input().simulate('blur', {
        target: { name, value }
      });
    }

    simulateChange(name, value) {
      this.input().simulate('change', {
        target: { name, value }
      });
    }

    simulateClick(callback = () => {}) {
      this.input().simulate('click', {
        target: { value: '', setSelectionRange: callback }
      });
    }

    simulateKeyDown(e) {
      this.input().simulate('keydown', e);
    }

    simulateMouseOut(name, value) {
      this.input().simulate('mouseout', {
        target: { name, value }
      });
    }
  }

  test('formats the default value', () => {
    const component = new MoneyInputComponent({ value: 5025 });

    expect(component.input().prop('defaultValue')).toBe('50.25');
  });

  test('formats the value on mouse out', () => {
    const component = new MoneyInputComponent({ value: 5500 });
    const e = { target: { value: 33 } };

    component.input().simulate('mouseout', e);

    expect(e.target.value).toBe('33.00');
  });

  test('formats the value on blur', () => {
    const component = new MoneyInputComponent({ value: 5500 });
    const e = { target: { value: 33 } };

    component.input().simulate('blur', e);

    expect(e.target.value).toBe('33.00');
  });

  test('handles on change events in input', () => {
    const onChange = jest.fn();
    const props = {
      decimalMark: ',',
      onChange,
      subunitToUnit: 100,
      currencySymbol: '€',
      symbolFirst: true,
      thousandsSeparator: '.'
    };

    const component = new MoneyInputComponent(props);

    component.simulateChange('amount', '€1.000');

    expect(onChange).toBeCalledWith('amount', 100000);
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const component = new MoneyInputComponent({ onBlur });

    component.simulateBlur('amount', 100000);

    expect(onBlur).toBeCalled();
  });

  test('formats the amount when on blur', () => {
    const component = new MoneyInputComponent();

    component.simulateBlur('amount', 1000);

    expect(component.input().prop('defaultValue')).toBe('1,000.00');
  });

  test('formats the amount when on mouse out', () => {
    const component = new MoneyInputComponent();

    component.simulateMouseOut('amount', 1000);

    expect(component.input().prop('defaultValue')).toBe('1,000.00');
  });

  test('selects the input value when click', () => {
    const component = new MoneyInputComponent();
    const onClickCallback = jest.fn();

    component.simulateClick(onClickCallback);

    expect(onClickCallback).toBeCalled();
  });

  test('renders a read-only money input if the property is set', () => {
    const component = new MoneyInputComponent({ readOnly: true });

    expect(component.input().prop('readOnly')).toBe(true);
  });

  test('is disabled if property is set', () => {
    const component = new MoneyInputComponent({ disabled: true });

    expect(component.input().prop('disabled')).toBeDefined();
  });

  test('allows key shortcut to copy amount', () => {
    const component = new MoneyInputComponent();
    const preventDefault = jest.fn();
    const keyEvent = { ctrlKey: true, keyCode: 67, preventDefault };

    component.simulateKeyDown(keyEvent);

    expect(preventDefault).not.toHaveBeenCalled();
  });

  test('allows key shortcut to cut amount', () => {
    const component = new MoneyInputComponent();
    const preventDefault = jest.fn();
    const keyEvent = { ctrlKey: true, keyCode: 88, preventDefault };

    component.simulateKeyDown(keyEvent);

    expect(preventDefault).not.toHaveBeenCalled();
  });

  test('allows key shortcut to paste amount', () => {
    const component = new MoneyInputComponent();
    const preventDefault = jest.fn();
    const keyEvent = { ctrlKey: true, keyCode: 86, preventDefault };

    component.simulateKeyDown(keyEvent);

    expect(preventDefault).not.toHaveBeenCalled();
  });

  test('ignores not allowed keys', () => {
    const component = new MoneyInputComponent();
    const preventDefault = jest.fn();
    const keyEvent = { keyCode: 10, preventDefault };

    component.simulateKeyDown(keyEvent);

    expect(preventDefault).toHaveBeenCalled();
  });

  test('passes other properties to the inner input field', () => {
    const component = new MoneyInputComponent({ 'aria-required': true });

    const input = component.input();

    expect(input.prop('aria-required')).toBe(true);
  });
});
