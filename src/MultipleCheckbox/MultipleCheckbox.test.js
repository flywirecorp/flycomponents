import React from 'react';
import { shallow } from 'enzyme';
import MultipleCheckbox from './MultipleCheckbox';

describe('MultipleCheckbox', () => {
  class MultipleCheckboxComponent {
    constructor(ownProps) {
      const defaultProps = { name: 'name' };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<MultipleCheckbox {...props} />);
    }

    get checkboxes() {
      return this.component.find('Checkbox');
    }
  }

  test('renders as many checkboxes as options we have', () => {
    const options = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' }
    ];

    const component = new MultipleCheckboxComponent({ options });

    expect(component.checkboxes).toHaveLength(2);
  });

  test('sets checked attributes of checkboxes', () => {
    const options = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' }
    ];

    const checked = ['foo'];
    const component = new MultipleCheckboxComponent({ checked, options });
    const checkboxes = component.checkboxes;
    const firstCheckbox = checkboxes.first();
    const secondCheckbox = checkboxes.last();

    expect(firstCheckbox.prop('checked')).toBe(true);
    expect(secondCheckbox.prop('checked')).toBe(false);
  });

  test('executes a callback when checkbox changes', () => {
    const name = 'name';
    const options = [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' }
    ];

    const onChange = jest.fn();
    const component = new MultipleCheckboxComponent({ options, onChange });
    const firstCheckbox = component.checkboxes.first();

    firstCheckbox.simulate('change');

    expect(onChange).toBeCalledWith({ name, checked: ['foo'] });

    firstCheckbox.simulate('change');

    expect(onChange).toBeCalledWith({ name, checked: [] });
  });
});
