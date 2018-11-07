import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  class ButtonComponent {
    constructor({ children, ...ownProps }) {
      const defaultProps = {};
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(
        <Button {...props}>{children || 'a message'}</Button>
      );
    }

    find(ele) {
      return this.component.find(ele);
    }

    container() {
      return this.component.find('.Button');
    }
  }

  test('renders a button', () => {
    const props = { type: 'button' };
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  test('renders children passed in', () => {
    const children = <div className="unique" />;
    const component = new ButtonComponent({ children });

    expect(component.find('.unique')).toHaveLength(1);
  });
});
