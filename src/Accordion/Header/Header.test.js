import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import Heading from '../../Heading';

describe('Header', () => {
  it('renders its children', () => {
    const wrapper = shallow(<Header>A text</Header>);

    expect(wrapper.find(Heading).prop('text')).toEqual('A text');
  });

  it('executes setActive when click', () => {
    const setActive = jest.fn();
    const wrapper = shallow(<Header setActive={setActive} />);

    wrapper.find('header').simulate('click');

    expect(setActive).toBeCalled();
  });
});
