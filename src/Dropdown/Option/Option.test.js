import React from 'react';
import { shallow } from 'enzyme';
import Option from './Option';

describe('Option', () => {
  class OptionComponent {
    constructor(ownProps) {
      const defaultProps = {
        id: 'id',
        label: 'Option',
        value: 'val',
        onClick: () => {}
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Option {...props} />);
    }

    option() {
      return this.component.find('li');
    }
  }

  test('renders an option', () => {
    const component = new OptionComponent();

    expect(component.option()).toHaveLength(1);
  });

  test('renders custom templates', () => {
    const customTemplate = jest.fn();
    // eslint-disable-next-line
    new OptionComponent({
      template: customTemplate
    });

    expect(customTemplate).toBeCalledWith({
      'aria-label': 'Option',
      'aria-selected': false,
      className: 'Dropdown-option',
      'data-label': 'Option',
      id: 'id',
      label: 'Option',
      onClick: expect.any(Function),
      role: 'option',
      tabIndex: -1,
      value: 'val'
    });
  });
});
