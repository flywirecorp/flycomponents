import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  class CheckboxComponent {
    constructor(props) {
      this.component = shallow(<Checkbox {...props} />);
    }

    label(name) {
      return this.component.find(`label[htmlFor="${name}"]`).length;
    }

    errorMsg() {
      return this.component.find(`.FormGroup-feedback`).length;
    }
  }
  const props = { id: 'a_id', name: 'a_name' };

  test('renders a checkbox', () => {
    const wrapper = shallow(<Checkbox {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  test('renders a checkbox label', () => {
    const component = new CheckboxComponent(props);

    expect(component.label('a_id')).toEqual(1);
  });

  test('renders a checkbox with error', () => {
    const props = { error: 'a_error', name: 'a_name' };
    const component = new CheckboxComponent(props);

    expect(component.errorMsg()).toEqual(1);
  });
});
