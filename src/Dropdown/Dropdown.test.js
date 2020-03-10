import React from 'react';
import { mount } from 'enzyme';
import { Dropdown } from './Dropdown';
import debounce from '../utils/debounce';

jest.mock('../utils/debounce', () => {
  return jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  });
});

afterAll(() => {
  debounce.mockReset();
});

describe('Dropdown', () => {
  class DropdownComponent {
    constructor(ownProps) {
      const defaultProps = {
        options: [{ label: '', value: '' }]
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = mount(<Dropdown {...props} />);
    }

    selectedOption() {
      return this.component.find('.Dropdown-selectedOption');
    }

    selectedOptionText() {
      return this.selectedOption().text();
    }

    options() {
      return this.component.find('Option');
    }

    optionsAreVisible() {
      return this.component.find('.Dropdown').hasClass('is-open');
    }

    openDropdown() {
      this.selectedOption().simulate('click', { preventDefault: () => {} });
    }

    findOption(label) {
      return this.component.find(`li[data-label="${label}"]`);
    }

    selectOption(label) {
      this.openDropdown();
      return this.findOption(label).simulate('click');
    }

    isSelected(label) {
      return this.findOption(label);
    }

    showsOptionsUpwards() {
      return this.component.find('.Dropdown--upward').length === 1;
    }

    isAlignedLeft() {
      return this.component.find('.Dropdown-options--upwardLeft').length === 1;
    }

    isAlignedRight() {
      return this.component.find('.Dropdown-options--upwardRight').length === 1;
    }

    get a11yStatusMessage() {
      return this.component.find('#a11y-status-message').text();
    }
  }

  let focusActivatorStub;

  beforeEach(() => {
    focusActivatorStub = jest.spyOn(Dropdown.prototype, 'focusActivator');
  });

  afterEach(() => {
    focusActivatorStub.mockReset();
  });

  test('add className to component', () => {
    const props = {
      className: 'ClassName',
      defaultValue: '',
      options: [{ label: '', value: '' }]
    };
    const wrapper = mount(<Dropdown {...props} />);

    expect(wrapper.hasClass('ClassName')).toBe(true);
  });

  test('adds the selected value as aria-label to the button', () => {
    const props = {
      defaultValue: 'fr',
      options: [{ label: 'a_label', value: 'fr' }]
    };
    const wrapper = mount(<Dropdown {...props} />);

    expect(wrapper.find('button').prop('aria-label')).toEqual('a_label');
  });

  test('pre-selects the default option', () => {
    const component = setupDropdownWithDefaultValueTo('es');

    expect(component.selectedOptionText()).toBe('Spanish');
  });

  test('if default value is not in the options list select the first option value', () => {
    const component = setupDropdownWithDefaultValueTo('fr');

    expect(component.selectedOptionText()).toBe('English');
  });

  test('if no options do not throw on pre-selecting value', () => {
    expect(() => new DropdownComponent({ defaultValue: 'en' })).not.toThrow();
  });

  test('is not case sensitive', () => {
    const component = setupDropdownWithDefaultValueTo('ES');

    expect(component.selectedOptionText()).toBe('Spanish');
  });

  test('renders options', () => {
    const component = setupDropdownWithDefaultValueTo('en');

    expect(component.options()).toHaveLength(1);
  });

  describe('renders options upwards', () => {
    test('aligns options to the right', () => {
      Element.prototype.getBoundingClientRect = () => ({ right: 0 });

      const component = setupUpwardDropdown();

      component.openDropdown();

      expect(component.showsOptionsUpwards()).toBe(true);
      expect(component.isAlignedRight()).toBe(true);
    });

    test('aligns options to the left if there is no space at its right', () => {
      Element.prototype.getBoundingClientRect = () => ({ right: 300 });
      Object.defineProperty(window.document, 'document', {
        documentElement: { clientWidth: 320 }
      });

      const component = setupUpwardDropdown();

      component.openDropdown();

      expect(component.showsOptionsUpwards()).toBe(true);
      expect(component.isAlignedLeft()).toBe(true);
    });

    const setupUpwardDropdown = () => {
      const upward = true;
      const defaultValue = 'en';
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' }
      ];

      return new DropdownComponent({ options, defaultValue, upward });
    };
  });

  test('hides the options by default', () => {
    const component = setupDropdownWithDefaultValueTo('en');

    expect(component.optionsAreVisible()).toBe(false);
  });

  test('shows the options when clicking', () => {
    const component = setupDropdownWithDefaultValueTo('en');
    component.openDropdown();

    expect(component.optionsAreVisible()).toBe(true);
  });

  test('selects an option', () => {
    const component = setupDropdownWithDefaultValueTo('en');
    component.selectOption('Spanish');

    expect(component.selectedOptionText()).toBe('Spanish');
  });

  test('hide the selected option', () => {
    const component = setupDropdownWithDefaultValueTo('en');
    component.selectOption('Spanish');

    expect(component.isSelected('Spanish')).toHaveLength(0);
  });

  test('hides the options after selecting one', () => {
    const component = setupDropdownWithDefaultValueTo('en');
    component.selectOption('Spanish');

    expect(component.optionsAreVisible()).toBe(false);
  });

  test('executes on change callback', () => {
    const options = [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' }
    ];
    const defaultValue = 'en';
    const onChange = jest.fn();
    const component = new DropdownComponent({
      options,
      defaultValue,
      onChange
    });

    component.selectOption('Spanish');

    expect(onChange).toBeCalledWith('es');
  });

  describe('getA11yStatusMessage', () => {
    test('reports that one result is available', () => {
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' }
      ];
      const component = new DropdownComponent({ options, defaultValue: 'en' });
      component.openDropdown();

      expect(component.a11yStatusMessage).toBe(
        '1 option is available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });

    test('reports that two results ara available', () => {
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' }
      ];
      const component = new DropdownComponent({ options, defaultValue: 'en' });
      component.openDropdown();

      expect(component.a11yStatusMessage).toBe(
        '2 options are available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });

    test('reports selected option', () => {
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' }
      ];
      const component = new DropdownComponent({ options, defaultValue: 'en' });
      component.openDropdown();
      component.selectOption('Spanish');

      expect(component.a11yStatusMessage).toBe('Spanish is selected.');
    });
  });

  const setupDropdownWithDefaultValueTo = defaultValue => {
    const options = [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' }
    ];

    return new DropdownComponent({ options, defaultValue });
  };
});
