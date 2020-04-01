import React from 'react';
import { shallow } from 'enzyme';
import Textarea from './Textarea';

describe('Textarea', () => {
  class TextareaComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'name'
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Textarea {...props} />);
    }

    textarea() {
      return this.component.find('textarea');
    }
  }

  test('renders a textarea', () => {
    const name = 'address';
    const component = new TextareaComponent({ name });

    expect(component.textarea()).toHaveLength(1);

    expect(component.textarea().prop('name')).toBe('address');
  });

  test('renders a read-only textarea if the property is set', () => {
    const component = new TextareaComponent({ readOnly: true });

    expect(component.textarea().prop('readOnly')).toBe(true);
  });

  test('when value property is given sets it as default value', () => {
    const component = new TextareaComponent({ value: 'a_value' });

    expect(component.textarea().prop('defaultValue')).toBe('a_value');
  });
});
