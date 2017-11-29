import React from 'react';
import { shallow } from 'enzyme';
import Content from './Content';

describe('Content', () => {
  it('renders its children', () => {
    const wrapper = shallow(
      <Content>
        <div className="unique" />
      </Content>
    );

    expect(wrapper.contains(<div className="unique" />)).toBe(true);
  });
});
