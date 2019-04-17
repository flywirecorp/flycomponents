import React from 'react';
import { shallow } from 'enzyme';
import CardForm from './CardForm';

describe('CardForm', () => {
  test('renders a form', () => {
    const wrapper = shallow(<CardForm />);

    expect(wrapper.find('form')).toHaveLength(1);
  });
});
