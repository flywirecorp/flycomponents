import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('renders its children', () => {
    const wrapper = shallow(
      <Header>
        <div className="div" />
      </Header>
    );

    expect(wrapper.find('.div').length).toEqual(1);
  });

  it('executes setActive when click', () => {
    const setActive = jest.fn();
    const wrapper = shallow(<Header setActive={setActive} />);

    wrapper.find('header').simulate('click');

    expect(setActive).toBeCalled();
  });
});
