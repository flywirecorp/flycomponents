import React from 'react';
import { shallow } from 'enzyme';
import { Autocomplete } from './Autocomplete';
import Options from './Options';
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

describe('Autocomplete', () => {
  class AutocompleteComponent {
    constructor(ownProps) {
      const defaultProps = {
        name: 'country',
        options: [
          { label: 'Spain', value: 'ES' },
          { label: 'United States', value: 'US' },
          { label: 'China', value: 'CN' }
        ]
      };
      const props = { ...defaultProps, ...ownProps };

      this.component = shallow(<Autocomplete {...props} />);
    }

    searchField() {
      return this.component.find('input');
    }

    spanField() {
      return this.component.find('span');
    }

    get a11yStatusMessage() {
      return this.component.find('#a11y-status-message').text();
    }

    options() {
      return this.component.find(Options).children();
    }

    optionsListIsVisible() {
      return this.component.find('.Autocomplete').hasClass('is-searching');
    }

    focusedOption() {
      const options = this.options();
      return options.filterWhere(option => option.prop('hasFocus'));
    }

    selectedOption() {
      const options = this.options();
      return options.filterWhere(option => option.prop('selectedValue'));
    }

    filterOption(token) {
      this.searchField().simulate('change', { target: { value: token } });
    }

    selectedIndex() {
      return this.component.state('selectedIndex');
    }

    simulateClick() {
      this.searchField().simulate('click');
    }

    simulateFocus() {
      this.searchField().simulate('focus');
    }

    pressArrowDownKey() {
      this.simulateKeyDown(40);
    }

    pressArrowUpKey() {
      this.simulateKeyDown(38);
    }

    pressEscKey() {
      this.simulateKeyDown(27);
    }

    pressEnterKey() {
      this.simulateKeyDown(13);
    }

    pressShiftKey() {
      this.simulateKeyDown(16);
    }

    simulateKeyDown(keyCode) {
      this.searchField().simulate('keyDown', {
        keyCode,
        preventDefault: () => {}
      });
    }
  }

  let adjustOffsetStub, focusSearchInputStub;

  beforeEach(() => {
    adjustOffsetStub = jest.spyOn(Autocomplete.prototype, 'adjustOffset');
    focusSearchInputStub = jest.spyOn(
      Autocomplete.prototype,
      'focusSearchInput'
    );
  });

  afterEach(() => {
    adjustOffsetStub.mockReset();
    focusSearchInputStub.mockReset();
  });

  test('has a search input', () => {
    const component = new AutocompleteComponent();

    expect(component.searchField()).toHaveLength(1);
  });

  test('has a list with options', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent({ options });

    expect(component.options()).toHaveLength(3);
  });

  test('shows options when clicking the search input', () => {
    const component = new AutocompleteComponent();

    component.simulateClick();

    expect(component.optionsListIsVisible()).toBe(true);
  });

  test('closes options when Enter key pressed twice', () => {
    const component = new AutocompleteComponent();

    component.simulateFocus();

    component.pressEnterKey();
    expect(component.optionsListIsVisible()).toBe(true);

    component.pressEnterKey();
    expect(component.optionsListIsVisible()).toBe(false);
  });

  test('filters options based on the search value', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent({ options });

    component.filterOption('st united');

    expect(component.options()).toHaveLength(1);

    expect(component.options().prop('option').label).toBe('United States');
  });

  test('filters options ignoring special characters', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'Japán', value: 'CN' }
    ];
    const component = new AutocompleteComponent({ options });

    component.filterOption('Japan');
    expect(component.options()).toHaveLength(1);
    expect(component.options().prop('option').label).toBe('Japán');

    component.filterOption('Japán');
    expect(component.options()).toHaveLength(1);
    expect(component.options().prop('option').label).toBe('Japán');
  });

  test('sorts options', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'China', value: 'CN' }
    ];

    const component = new AutocompleteComponent({ options, shouldSort: true });
    const renderedOptions = component
      .options()
      .map(o => o.prop('option').label);

    expect(renderedOptions).toEqual(['China', 'Spain']);
  });

  test('moves the focus to the next option when pressing key down', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' }
    ];
    const component = new AutocompleteComponent({ options });

    component.simulateClick();
    component.pressArrowDownKey();
    component.pressArrowDownKey();

    expect(component.focusedOption().prop('option').value).toBe('US');
  });

  test('moves the focus to the previous option when pressing key up', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' }
    ];
    const component = new AutocompleteComponent({ options });

    component.simulateClick();
    component.pressArrowDownKey();
    component.pressArrowDownKey();
    component.pressArrowUpKey();

    expect(component.focusedOption().prop('option').value).toBe('ES');
  });

  test('hides options when pressing the esc key', () => {
    const component = new AutocompleteComponent();

    component.simulateClick();
    component.pressEscKey();

    expect(component.optionsListIsVisible()).toBe(false);
  });

  test('gives focus to an option when mouse enters', () => {
    const options = [
      { label: 'United States', value: 'US' },
      { label: 'United States Minor Outlying Islands', value: 'UM' }
    ];
    const component = new AutocompleteComponent({ options });

    component.filterOption('States');

    const firstOption = component.options().first();
    firstOption.simulate('mouseEnter', 'US');

    expect(component.selectedIndex()).toBe(0);

    const secondOption = component.options().last();
    secondOption.simulate('mouseEnter', 'UM');

    expect(component.selectedIndex()).toBe(1);
  });

  test('selects current option when pressing the enter key', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' }
    ];
    const component = new AutocompleteComponent({ options });

    component.simulateClick();
    component.pressArrowDownKey();
    component.pressEnterKey();

    expect(component.selectedOption().prop('option').value).toBe('ES');
  });

  test('shows the options when pressing the enter key in the search input', () => {
    const component = new AutocompleteComponent();

    component.pressEnterKey();

    expect(component.optionsListIsVisible()).toBe(true);
  });

  test('hides options when pressing the enter key in a option', () => {
    const component = new AutocompleteComponent();

    component.simulateClick();
    component.pressArrowDownKey();
    component.pressEnterKey();

    expect(component.optionsListIsVisible()).toBe(false);
  });

  test('does not show options when pressing Shift key', () => {
    const component = new AutocompleteComponent();

    component.pressShiftKey();

    expect(component.optionsListIsVisible()).toBe(false);
  });

  test('disables search according to the minimun options for search', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const minOptionsForSearch = 4;
    const component = new AutocompleteComponent({
      minOptionsForSearch,
      options
    });

    expect(component.searchField().prop('readOnly')).toBe(true);
  });

  test('shows all options if one is selected', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent(options);

    component.simulateClick();
    component.pressArrowDownKey();
    component.pressEnterKey();
    component.simulateClick();

    expect(component.options().length).toBe(options.length);
  });

  test('focus the last selected option', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent(options);

    component.simulateClick();
    component.filterOption('China');
    component.pressEnterKey();
    component.simulateClick();

    expect(component.selectedIndex()).toBe(2);
  });

  test('focuss the search field when an option is selected', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent(options);

    component.simulateClick();
    component.filterOption('China');
    component.pressEnterKey();

    expect(focusSearchInputStub).toBeCalled();
  });

  describe('having read-only property', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent({ readOnly: true, options });

    test('renders a read-only autocomplete search input', () => {
      expect(component.searchField().prop('readOnly')).toBe(true);
    });

    test('does not show the options menu', () => {
      component.simulateClick();
      expect(component.optionsListIsVisible()).toBe(false);
    });
  });

  describe('having disabled property', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];
    const component = new AutocompleteComponent({ disabled: true, options });

    test('renders a disabled autocomplete search input', () => {
      expect(component.searchField().prop('disabled')).toBe(true);
    });

    test('does not show the options menu', () => {
      component.simulateClick();
      expect(component.optionsListIsVisible()).toBe(false);
    });
  });

  describe('getA11yStatusMessage', () => {
    const options = [
      { label: 'Spain', value: 'ES' },
      { label: 'United States', value: 'US' },
      { label: 'China', value: 'CN' }
    ];

    const component = new AutocompleteComponent({ options });
    component.simulateClick();

    test('reports that no results are available', () => {
      component.filterOption('Andorra');

      expect(component.a11yStatusMessage).toBe('No results are available');
    });

    test('reports that one result is available', () => {
      component.filterOption('Spain');

      expect(component.a11yStatusMessage).toBe(
        '1 result is available, use up and down arrow keys to navigate. Press Enter key to select.'
      );
    });

    test('reports that two results ara available', () => {
      component.filterOption('in');

      expect(component.a11yStatusMessage).toBe(
        '2 results are available, use up and down arrow keys to navigate. Press Enter key to select.'
      );
    });

    test('reports selected option', () => {
      component.filterOption('China');
      component.pressEnterKey();

      expect(component.a11yStatusMessage).toBe('You have selected China');
    });
  });
});
