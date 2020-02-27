import React from 'react';
import { shallow } from 'enzyme';
import { PrefixSelector } from './PrefixSelector';
import Options from './Options';
import debounce from '../../utils/debounce';

jest.mock('../../utils/debounce', () => {
  return jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  });
});

afterAll(() => {
  debounce.mockReset();
});

describe('PrefixSelector', () => {
  class PrefixSelectorComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'country',
        options: [],
        onFocus: () => {}
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<PrefixSelector {...props} />);
    }

    menu() {
      return this.component.find('.PhoneNumber-menu-input');
    }

    options() {
      return this.component.find(Options).children();
    }

    state(key) {
      return this.component.state(key);
    }

    selectedOption() {
      return this.options().filterWhere(option => option.prop('hasFocus'));
    }

    simulateKeyPress(keyCode) {
      this.menu().simulate('keyDown', { keyCode, preventDefault: () => {} });
    }

    simulateMenuClick() {
      this.menu().simulate('click');
    }

    pressArrowDownKey() {
      this.simulateKeyPress(40);
    }

    pressArrowUpKey() {
      this.simulateKeyPress(38);
    }

    pressEscKey() {
      this.simulateKeyPress(27);
    }

    pressEnterKey() {
      this.simulateKeyPress(13);
    }

    typeSpa() {
      this.simulateKeyPress(83);
      this.simulateKeyPress(80);
      this.simulateKeyPress(65);
    }

    update() {
      this.component.update();
    }

    get a11yStatusMessage() {
      return this.component.find('div[role="status"]').text();
    }

    get buttonAriaLabel() {
      return this.component.find('button').prop('aria-label');
    }
  }

  let adjustOffetStub;

  beforeEach(() => {
    adjustOffetStub = jest.spyOn(PrefixSelector.prototype, 'adjustOffet');
  });

  afterEach(() => {
    adjustOffetStub.mockReset();
  });

  test('has a list with options', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    expect(component.options()).toHaveLength(2);
  });

  test('displays options when clicking the menu', () => {
    const component = new PrefixSelectorComponent();

    expect(component.state('isOpen')).toBe(false);

    component.simulateMenuClick();

    expect(component.state('isOpen')).toBe(true);
  });

  test('moves the focus to the next option when pressing key down', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    component.simulateMenuClick();
    component.pressArrowDownKey();

    expect(component.selectedOption().prop('value')).toBe('ES');
  });

  test('moves the focus to the previous option when pressing key up', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    component.simulateMenuClick();
    component.pressArrowDownKey();
    component.pressArrowDownKey();
    component.pressArrowUpKey();

    expect(component.selectedOption().prop('value')).toBe('ES');
  });

  test('hides options when pressing the esc key', () => {
    const component = new PrefixSelectorComponent();

    component.simulateMenuClick();
    component.pressEscKey();

    expect(component.state('isOpen')).toBe(false);
  });

  test('selects current option when pressing the enter key', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    component.simulateMenuClick();
    component.pressArrowDownKey();
    component.pressEnterKey();

    expect(component.selectedOption().prop('value')).toBe('ES');
  });

  test('hides options when pressing the enter key', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    component.simulateMenuClick();
    component.pressArrowDownKey();
    component.pressEnterKey();

    expect(component.state('isOpen')).toBe(false);
  });

  test('focus the country when typing', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    component.simulateMenuClick();
    component.typeSpa();

    expect(component.selectedOption().prop('value')).toBe('ES');
  });

  test('does not open the menu when read-only param is received', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const component = new PrefixSelectorComponent({ options, readOnly: true });

    component.simulateMenuClick();

    expect(component.state('isOpen')).toBe(false);
  });

  describe('getA11yStatusMessage', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const component = new PrefixSelectorComponent({ options });

    test('reports that two result are available', () => {
      component.simulateMenuClick();
      component.update();

      expect(component.a11yStatusMessage).toBe(
        '2 results are available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });
  });

  describe('button aria label', () => {
    test('does not show the prefix when a value is not selected', () => {
      const component = new PrefixSelectorComponent();

      expect(component.buttonAriaLabel).toEqual(undefined);
    });

    test('shows prefix when value is selected', () => {
      const component = new PrefixSelectorComponent({ value: '34' });

      expect(component.buttonAriaLabel).toEqual('+34');
    });
  });
});
