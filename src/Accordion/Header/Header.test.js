import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('renders its children', () => {
    const wrapper = shallow(
      <Header>
        <div className="unique" />
      </Header>
    );

    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });

  it('executes setActive when click', () => {
    const setActive = jest.fn();
    const wrapper = shallow(<Header setActive={setActive} />);

    wrapper.find('header').simulate('click');

    expect(setActive).toBeCalled();
  });
});
