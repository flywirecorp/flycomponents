import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
  const options = [
    { label: 'Spain', value: 'ES' },
    { label: 'United States', value: 'US' },
    { label: 'China', value: 'CN' }
  ];
  const defaultProps = {
    name: 'country',
    options
  };

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
      return this.component.find('#country-a11y-status-message').text();
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

  test('renders a search input', () => {
    const { getByTestId } = render(<Autocomplete {...defaultProps} />);

    expect(getByTestId('searchInput')).toBeTruthy();
  });

  test('renders an options list', () => {
    const { getByText } = render(<Autocomplete {...defaultProps} />);

    options.map(option => {
      expect(getByText(option.label)).toBeTruthy();
    });
  });

  test('shows options when clicking the search input', () => {
    const { getByTestId } = render(<Autocomplete {...defaultProps} />);
    const autocomplete = getByTestId('autocomplete');

    expect(autocomplete).not.toHaveClass('is-searching');

    const searchInput = getByTestId('searchInput');
    fireEvent.click(searchInput);

    expect(autocomplete).toHaveClass('is-searching');
  });

  test('click outside closes autocomplete', () => {
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const { getByTestId } = render(<Autocomplete {...defaultProps} />);
    const autocomplete = getByTestId('autocomplete');
    const searchInput = getByTestId('searchInput');
    fireEvent.click(searchInput);

    expect(autocomplete).toHaveClass('is-searching');

    map.mousedown({ target: document.body });

    expect(autocomplete).not.toHaveClass('is-searching');
  });

  test('pressing Enter twice closes options', () => {
    const { getByTestId } = render(<Autocomplete {...defaultProps} />);
    const searchInput = getByTestId('searchInput');
    const autocomplete = getByTestId('autocomplete');
    fireEvent.keyDown(searchInput, { keyCode: 13 });

    expect(autocomplete).toHaveClass('is-searching');

    fireEvent.keyDown(searchInput, { keyCode: 13 });

    expect(autocomplete).not.toHaveClass('is-searching');
  });

  test('filters options based on the search value', () => {
    const { getByTestId, queryByText } = render(
      <Autocomplete {...defaultProps} />
    );
    const searchInput = getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'st united' } });

    expect(queryByText(/united states/i)).toBeInTheDocument();
    expect(queryByText(/spain/i)).not.toBeInTheDocument();
    expect(queryByText(/china/i)).not.toBeInTheDocument();
  });

  test('filters options ignoring special characters', () => {
    const options = [
      { label: 'España', value: 'ES' },
      { label: 'Estados Unidos', value: 'US' },
      { label: 'Japón', value: 'JP' }
    ];
    const ownProps = { ...defaultProps, options };

    const { getByTestId, queryByText } = render(<Autocomplete {...ownProps} />);
    const searchInput = getByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'Japón' } });

    expect(queryByText(/japón/i)).toBeInTheDocument();
    expect(queryByText(/estados unidos/i)).not.toBeInTheDocument();
    expect(queryByText(/españa/i)).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Japon' } });

    expect(queryByText(/japón/i)).toBeInTheDocument();
    expect(queryByText(/estados unidos/i)).not.toBeInTheDocument();
    expect(queryByText(/españa/i)).not.toBeInTheDocument();
  });

  test('sorts options', () => {
    const shouldSort = true;
    const ownProps = { ...defaultProps, shouldSort };

    const { getByTestId, queryAllByTestId } = render(
      <Autocomplete {...ownProps} />
    );
    const searchInput = getByTestId('searchInput');
    fireEvent.focus(searchInput);
    const optionsList = queryAllByTestId('option');

    expect(optionsList[0]).toHaveTextContent('China')
    expect(optionsList[1]).toHaveTextContent('Spain')
    expect(optionsList[2]).toHaveTextContent('United States')
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

  test('focus the search field when an option is selected', () => {
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

    test('reports that no options are available', () => {
      component.filterOption('Andorra');

      expect(component.a11yStatusMessage).toBe('No options are available');
    });

    test('reports that one option is available', () => {
      component.filterOption('Spain');

      expect(component.a11yStatusMessage).toBe(
        '1 option is available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });

    test('reports that two options ara available', () => {
      component.filterOption('in');

      expect(component.a11yStatusMessage).toBe(
        '2 options are available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });

    test('reports selected option', () => {
      component.filterOption('China');
      component.pressEnterKey();

      expect(component.a11yStatusMessage).toBe('You have selected China');
    });

    test('selected index is set with default value', () => {
      const options = [
        { label: 'United States', value: 'US' },
        { label: 'United States Minor Outlying Islands', value: 'UM' }
      ];
      const component = new AutocompleteComponent({ options, value: 'UM' });

      expect(component.selectedIndex()).toBe(1);
    });
  });
});
