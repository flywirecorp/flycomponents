import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
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

  it('renders an input', () => {
    const name = 'amount';
    const type = 'number';
    const component = new InputComponent({ name, type });

    expect(component.input()).to.have.length(1);

    expect(component.input().prop('name')).to.equal('amount');

    expect(component.input().prop('type')).to.equal('number');
  });

  it('renders a read-only input if the property is set', () => {
    const component = new InputComponent({ readOnly: true });

    expect(component.input().prop('readOnly')).to.be.true;
  });

  context('when value property is given', () => {
    it('sets default value', () => {
      const component = componentWithValue('Something');

      expect(component.input().prop('defaultValue')).to.equal('Something');
    });

    it('never sets value property', () => {
      const component = componentWithValue();

      expect(component.input().prop('value')).to.be.undefined;
    });

    function componentWithValue(value = 'anything') {
      return new InputComponent({ value });
    }
  });
});
