import React from 'react';
import { shallow } from 'enzyme';
import MoneyInput from './MoneyInput';
import InputGroup from '../InputGroup';
import { fireEvent, render } from '@testing-library/react';

describe('MoneyInput', () => {
  const testId = 'money_input_id';
  const defaultProps = {
    currencySymbol: '$',
    decimalMark: '.',
    maxLength: 10,
    name: 'name',
    onChange: () => {},
    subunitToUnit: 100,
    thousandsSeparator: ','
  };
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
    const value = 5025;

    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} value={value} />
    );

    expect(getByTestId(testId)).toHaveProperty('value', '50.25');
  });

  test('formats the value on mouse out', () => {
    const value = 5500;

    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} value={value} />
    );
    fireEvent.mouseOut(getByTestId(testId), { target: { value: 33 } });

    expect(getByTestId(testId)).toHaveProperty('value', '33.00');
  });

  test('formats the value on blur', () => {
    const value = 5500;

    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} value={value} />
    );
    fireEvent.blur(getByTestId(testId), { target: { value: 33 } });

    expect(getByTestId(testId)).toHaveProperty('value', '33.00');
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
    const propsForTest = { ...defaultProps, ...props };

    const { getByTestId } = render(
      <MoneyInput {...propsForTest} data-testid={testId} />
    );

    fireEvent.change(getByTestId(testId), {
      target: { name: 'amount', value: '€1.000' }
    });

    expect(onChange).toBeCalledWith('amount', 100000);
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();

    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} onBlur={onBlur} />
    );
    fireEvent.blur(getByTestId(testId), {
      target: { name: 'amount', value: 100000 }
    });

    expect(onBlur).toBeCalled();
  });

  test('formats the amount when on blur', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    fireEvent.blur(getByTestId(testId), {
      target: { name: 'amount', value: 1000 }
    });

    expect(getByTestId(testId)).toHaveProperty('value', '1,000.00');
  });

  test('formats the amount when on mouse out', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    fireEvent.mouseOut(getByTestId(testId), {
      target: { name: 'amount', value: 1000 }
    });

    expect(getByTestId(testId)).toHaveProperty('value', '1,000.00');
  });

  test('selects the input value when click', () => {
    const onClickCallback = jest.fn();

    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    fireEvent.click(getByTestId(testId), {
      target: { value: '', setSelectionRange: onClickCallback }
    });

    expect(onClickCallback).toBeCalled();
  });

  test('renders a read-only money input if the property is set', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} readOnly />
    );

    expect(getByTestId(testId)).toHaveProperty('readOnly', true);
  });

  test('is disabled if property is set', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} disabled />
    );

    expect(getByTestId(testId)).toBeDisabled();
  });

  test('allows key shortcut to copy amount', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    const isPrevented = fireEvent.keyDown(getByTestId(testId), {
      ctrlKey: true,
      keyCode: 67
    });

    expect(isPrevented).toBe(true);
  });

  test('allows key shortcut to cut amount', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    const isPrevented = fireEvent.keyDown(getByTestId(testId), {
      ctrlKey: true,
      keyCode: 88
    });

    expect(isPrevented).toBe(true);
  });

  test('allows key shortcut to paste amount', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    const isPrevented = fireEvent.keyDown(getByTestId(testId), {
      ctrlKey: true,
      keyCode: 86
    });

    expect(isPrevented).toBe(true);
  });

  test('ignores not allowed keys', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} />
    );
    const isPrevented = fireEvent.keyDown(getByTestId(testId), { keyCode: 10 });

    expect(isPrevented).toBe(false);
  });

  test('passes other properties to the inner input field', () => {
    const { getByTestId } = render(
      <MoneyInput {...defaultProps} data-testid={testId} aria-required />
    );

    expect(getByTestId(testId)).toBeRequired();
  });
});
