import React from 'react';
import { shallow } from 'enzyme';
import Highlighter from '../Highlighter';
import Option from './Option';

describe('Option', () => {
  class OptionComponent {
    constructor(ownProps) {
      const defaultProps = {
        hasFocus: false,
        highlighText: true,
        onClick: () => {},
        onMouseEnter: () => {},
        option: { label: 'Option', value: 'opt' },
        searchQuery: null
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Option {...props} />);
    }

    option() {
      return this.component.find('li');
    }

    simulateClick() {
      this.component.simulate('click');
    }

    doMouseEnter() {
      this.option().simulate('mouseEnter');
    }

    highlighText() {
      return this.option().find(Highlighter);
    }
  }

  test('renders an option', () => {
    const component = new OptionComponent();

    expect(component.option()).toHaveLength(1);
  });

  test('has an active status when focus', () => {
    const hasFocus = true;
    const component = new OptionComponent({ hasFocus });

    expect(component.option().prop('className')).toContain('is-active');
  });

  test('simulates click events', () => {
    const onClick = jest.fn();
    const option = { label: 'Option', value: 'opt' };
    const component = new OptionComponent({ onClick, option });

    component.simulateClick();

    expect(onClick).toBeCalledWith('opt');
  });

  test('simulates mouse enter events', () => {
    const onMouseEnter = jest.fn();
    const option = { label: 'Option', value: 'opt' };
    const component = new OptionComponent({ onMouseEnter, option });

    component.doMouseEnter();

    expect(onMouseEnter).toBeCalledWith('opt');
  });

  test('highlighs texts', () => {
    const option = { label: 'Hello World!', value: 'hw' };
    const searchQuery = 'World';
    const component = new OptionComponent({ option, searchQuery });
    const highlighText = component.highlighText();

    expect(highlighText).toHaveLength(1);
    expect(highlighText.prop('text')).toBe(option.label);
    expect(highlighText.prop('subString')).toBe(searchQuery);
  });

  test('disables highligh text', () => {
    const highlighText = false;
    const component = new OptionComponent({ highlighText });

    expect(component.highlighText()).toHaveLength(0);
  });

  test('renders custom templates', () => {
    const customTemplate = jest.fn();
    // eslint-disable-next-line
    new OptionComponent({
      template: customTemplate
    });

    expect(customTemplate).toBeCalled();
  });
});
