import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';
import InputGroup from '../InputGroup';

describe('InputGroup', () => {
  class InputComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'name',
        type: 'text'
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<InputGroup {...props} />);
    }

    input() {
      return this.component.find(Input);
    }

    prefixText() {
      return this.component.find('span').text();
    }

    suffixText() {
      return this.component.find('span').text();
    }
  }

  test('renders an input', () => {
    const name = 'amount';
    const type = 'number';
    const component = new InputComponent({ name, type });

    expect(component.input()).toHaveLength(1);

    expect(component.input().prop('name')).toBe('amount');

    expect(component.input().prop('type')).toBe('number');
  });

  test('renders a prefix', () => {
    const component = new InputComponent({ prefix: '$' });

    expect(component.prefixText()).toBe('$');
  });

  test('renders a suffix', () => {
    const component = new InputComponent({ suffix: '.00' });

    expect(component.suffixText()).toBe('.00');
  });
});
