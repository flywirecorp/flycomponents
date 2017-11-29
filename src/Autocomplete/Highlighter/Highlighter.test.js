import React from 'react';
import { shallow } from 'enzyme';
import Highlighter from './Highlighter';

describe('Highlighter', () => {
  class HighlighterComponent {
    constructor(ownProps) {
      const defaultProps = {
        text: '',
        subString: ''
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Highlighter {...props} />);
    }

    html() {
      return this.component.find('span').prop('dangerouslySetInnerHTML').__html;
    }
  }

  test('highlights a substring in string', () => {
    const text = 'Hello World!';
    const subString = 'World';
    const component = new HighlighterComponent({ text, subString });

    expect(component.html()).toBe(
      "Hello <span class='is-highlighted'>World</span>!"
    );
  });
});
