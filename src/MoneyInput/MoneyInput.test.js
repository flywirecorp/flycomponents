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
  }

  test('formats the default value', () => {
    const component = new MoneyInputComponent({ value: 5025 });

    expect(component.input().prop('defaultValue')).toBe('50.25');
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
});
