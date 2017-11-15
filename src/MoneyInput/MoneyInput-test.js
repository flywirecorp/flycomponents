import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
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

  it('formats the default value', () => {
    const component = new MoneyInputComponent({ value: 5025 });

    expect(component.input().prop('defaultValue')).to.equal('50.25');
  });

  it('handles on change events in input', () => {
    const onChange = sinon.spy();
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

    expect(onChange.calledWith('amount', 100000)).to.be.true;
  });

  it('handles on blur events in input', () => {
    const onBlur = sinon.spy();
    const component = new MoneyInputComponent({ onBlur });

    component.simulateBlur('amount', 100000);

    expect(onBlur.called).to.be.true;
  });

  it('formats the amount when on blur', () => {
    const component = new MoneyInputComponent();

    component.simulateBlur('amount', 1000);

    expect(component.input().prop('defaultValue')).to.equal('1,000.00');
  });

  it('selects the input value when click', () => {
    const component = new MoneyInputComponent();
    const onClickCallback = sinon.spy();

    component.simulateClick(onClickCallback);

    expect(onClickCallback.called).to.be.true;
  });

  it('renders a read-only money input if the property is set', () => {
    const component = new MoneyInputComponent({ readOnly: true });

    expect(component.input().prop('readOnly')).to.be.true;
  });

  it('is disabled if property is set', () => {
    const component = new MoneyInputComponent({ disabled: true });

    expect(component.input().prop('disabled')).to.exist;
  });
});
