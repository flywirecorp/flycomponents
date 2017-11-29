import React from 'react';
import { shallow } from 'enzyme';
import Section from './Section';

describe('Section', () => {
  test('renders its children', () => {
    const wrapper = shallow(
      <Section>
        <div className="unique" />
      </Section>
    );

    expect(wrapper.contains(<div className="unique" success={false} />)).toBe(
      true
    );
  });

  test('shares props with children', () => {
    shallow(
      <Section isActive>
        {({ isActive }) => {
          expect(isActive).toBe(true);
          return null;
        }}
      </Section>
    );
  });

  test('has a is-active class', () => {
    const wrapper = shallow(<Section isActive />);

    expect(wrapper.find('section.is-active')).toHaveLength(1);
  });

  test('has a has-success class', () => {
    const wrapper = shallow(<Section success />);

    expect(wrapper.find('section.has-success')).toHaveLength(1);
  });
});
