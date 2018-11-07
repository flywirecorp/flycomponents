import React from 'react';
import { shallow } from 'enzyme';
import Switch from './Switch';

describe('Switch', () => {
  class SwitchComponent {
    constructor(props) {
      this.component = shallow(<Switch {...props} />);
    }

    label(name) {
      return this.component.find(`label[htmlFor="${name}"]`).length;
    }
  }
  const props = { id: 'a_id', name: 'a_name' };

  test('renders a switch', () => {
    const wrapper = shallow(<Switch {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  test('renders a switch label', () => {
    const component = new SwitchComponent(props);

    expect(component.label('a_id')).toEqual(1);
  });
});
