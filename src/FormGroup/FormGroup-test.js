import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FormGroup from './FormGroup';
import Label from '../Label';

describe('FormGroup', () => {
  class FormGroupComponent {
    constructor({ children, ...ownProps } = {}) {
      const defaultProps = { name: 'name' };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(
        <FormGroup {...props}>{children || <span>children</span>}</FormGroup>
      );
    }

    errorText() {
      return this.component.find('.FormGroup-feedback').text();
    }

    find(ele) {
      return this.component.find(ele);
    }

    hintText() {
      return this.component.find('.FormGroup-hint').text();
    }

    label() {
      return this.component.find(Label);
    }
  }

  it('renders children passed in', () => {
    const children = <div className="unique" />;
    const component = new FormGroupComponent({ children });

    expect(component.find('.unique')).to.have.length(1);
  });

  it('renders a label', () => {
    const label = 'A label';
    const component = new FormGroupComponent({ label });

    expect(component.label()).to.have.length(1);
  });

  it('renders an error message', () => {
    const error = 'must be greater or equal to 5000';
    const component = new FormGroupComponent({ error });

    expect(component.errorText()).to.equal('must be greater or equal to 5000');
  });

  it('renders a hint message', () => {
    const hint = 'Amount you want to send in USD';
    const component = new FormGroupComponent({ hint });

    expect(component.hintText()).to.equal('Amount you want to send in USD');
  });
});
