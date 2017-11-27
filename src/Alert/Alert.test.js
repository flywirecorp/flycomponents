import React from 'react';
import { shallow } from 'enzyme';
import Alert from './Alert';

describe('Alert', () => {
  class AlertComponent {
    constructor({ children, ...ownProps }) {
      const defaultProps = {};
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(
        <Alert {...props}>{children || 'a message'}</Alert>
      );
    }

    find(ele) {
      return this.component.find(ele);
    }

    container() {
      return this.component.find('.Alert');
    }
  }

  test('renders children passed in', () => {
    const children = <div className="unique" />;
    const component = new AlertComponent({ children });

    expect(component.find('.unique')).toHaveLength(1);
  });

  test('renders diferent warning levels', () => {
    const type = 'danger';
    const component = new AlertComponent({ type });

    expect(component.container().hasClass('Alert--danger')).toBe(true);
  });
});
