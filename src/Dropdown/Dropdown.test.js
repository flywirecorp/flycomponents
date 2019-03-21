import React from 'react';
import { shallow, mount } from 'enzyme';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  class DropdownComponent {
    constructor(ownProps, renderMethod = shallow) {
      const defaultProps = {
        options: []
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = renderMethod(<Dropdown {...props} />);
    }

    selectedOption() {
      return this.component.find('.Dropdown-selectedOption');
    }

    selectedOptionText() {
      return this.selectedOption().text();
    }

    options() {
      return this.component.find('.Dropdown-option');
    }

    optionsAreVisible() {
      return this.component.find('.Dropdown').hasClass('is-open');
    }

    openDropdown() {
      this.selectedOption().simulate('click');
    }

    findOption(label) {
      return this.component.find(`[data-label='${label}']`);
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
  }

  test('add className to component', () => {
    const props = {
      className: 'ClassName',
      defaultValue: '',
      options: [{ label: '', value: '' }]
    };
    const wrapper = shallow(<Dropdown {...props} />);

    expect(wrapper.hasClass('ClassName')).toBe(true);
  });

  test('pre-selects the default option', () => {
    const component = setupDropdownWithDefaultValueTo('es');

    expect(component.selectedOptionText()).toBe('Spanish');
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

      return new DropdownComponent({ options, defaultValue, upward }, mount);
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

  const setupDropdownWithDefaultValueTo = defaultValue => {
    const options = [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' }
    ];

    return new DropdownComponent({ options, defaultValue });
  };
});
