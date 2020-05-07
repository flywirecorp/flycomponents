import React from 'react';
import { shallow } from 'enzyme';
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

    disabledText() {
      return this.component.find('.is-disabled').text();
    }

    get error() {
      return this.component.find('.FormGroup-feedback');
    }

    errorText() {
      return this.error.text();
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

  test('renders children passed in', () => {
    const children = <div className="unique" />;
    const component = new FormGroupComponent({ children });

    expect(component.find('.unique')).toHaveLength(1);
  });

  test('renders a label', () => {
    const label = 'A label';
    const component = new FormGroupComponent({ label });

    expect(component.label()).toHaveLength(1);
  });

  test('renders an error message', () => {
    const error = 'must be greater or equal to 5000';
    const component = new FormGroupComponent({ error });

    expect(component.errorText()).toBe('must be greater or equal to 5000');
  });

  test('renders an error message', () => {
    const error = true;
    const component = new FormGroupComponent({ error });

    expect(component.error.length).toBe(1);
    expect(component.errorText()).toBe('');
  });

  test('renders a hint message', () => {
    const hint = 'Amount you want to send in USD';
    const component = new FormGroupComponent({ hint });

    expect(component.hintText()).toBe('Amount you want to send in USD');
  });

  test('can add disabled class to component', () => {
    const children = <div className="wadus" />;
    const component = new FormGroupComponent({ children, disabled: true });

    expect(component.find('.FormGroup.is-disabled')).toHaveLength(1);
  });

  test('can add read only class to component', () => {
    const children = <div className="wadus" />;
    const component = new FormGroupComponent({ children, readOnly: true });

    expect(component.find('.FormGroup.is-readOnly')).toHaveLength(1);
  });
});
