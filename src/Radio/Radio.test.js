import React from 'react';
import { shallow } from 'enzyme';
import Radio from './Radio';

describe('Radio', () => {
  class RadioComponent {
    constructor(props) {
      this.component = shallow(<Radio {...props} />);
    }

    label(name) {
      return this.component.find(`label[htmlFor="${name}"]`).length;
    }

    errorMsg() {
      return this.component.find(`.FormGroup-feedback`).length;
    }
  }
  const props = { id: 'a_id', name: 'a_name' };

  test('renders a radio', () => {
    const wrapper = shallow(<Radio {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  test('renders a radio label', () => {
    const component = new RadioComponent(props);

    expect(component.label('a_id')).toEqual(1);
  });

  test('renders a radio with error', () => {
    const props = { error: 'a_error', name: 'a_name' };
    const component = new RadioComponent(props);

    expect(component.errorMsg()).toEqual(1);
  });
});
