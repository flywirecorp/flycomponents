import React from 'react';
import { Dropdown } from './Dropdown';
import debounce from '../utils/debounce';
import { fireEvent, render } from '@testing-library/react';

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
    const { container } = render(<Dropdown {...props} />);

    expect(container.firstChild).toHaveClass(props.className);
  });

  test('adds the selected value as aria-label to the button', () => {
    const props = {
      defaultValue: 'fr',
      options: [{ label: 'a_label', value: 'fr' }]
    };
    const { getByLabelText } = render(<Dropdown {...props} />);

    expect(getByLabelText(props.options[0].label)).toBeInTheDocument();
  });

  test('pre-selects the default option', () => {
    const { getByLabelText } = setupDropdownWithDefaultValueTo('es');

    expect(getByLabelText('Spanish')).toBeInTheDocument();
  });

  test('if default value is not in the options list select the first option value', () => {
    const { container, getAllByLabelText } = setupDropdownWithDefaultValueTo(
      'fr'
    );

    expect(container.firstChild.firstChild).toHaveTextContent('English');
    expect(getAllByLabelText('English')).toHaveLength(2);
  });

  test('with an option do not throw on pre-selecting value', () => {
    expect(() =>
      render(
        <Dropdown options={[{ label: '', value: '' }]} defaultValue="en" />
      )
    ).not.toThrow();
  });

  test('is not case sensitive', () => {
    const { getByLabelText } = setupDropdownWithDefaultValueTo('ES');

    expect(getByLabelText('Spanish')).toBeInTheDocument();
  });

  test('renders options', () => {
    const { getAllByRole } = setupDropdownWithDefaultValueTo('en');

    expect(getAllByRole('option')).toHaveLength(1);
  });

  describe('renders options upwards', () => {
    test('aligns options to the right', () => {
      Element.prototype.getBoundingClientRect = () => ({ right: 0 });

      const { container, getByRole } = setupUpwardDropdown();
      fireEvent.click(container.firstChild.firstChild);

      expect(container.firstChild).toHaveClass('is-open');
      expect(getByRole('listbox')).toHaveClass(
        'Dropdown--upward Dropdown-options--upwardRight'
      );
    });

    test('aligns options to the left if there is no space at its right', () => {
      Element.prototype.getBoundingClientRect = () => ({ right: 300 });
      Object.defineProperty(window.document, 'document', {
        documentElement: { clientWidth: 320 }
      });

      const { container, getByRole } = setupUpwardDropdown();
      fireEvent.click(container.firstChild.firstChild);

      expect(container.firstChild).toHaveClass('is-open');
      expect(getByRole('listbox')).toHaveClass(
        'Dropdown--upward Dropdown-options--upwardLeft'
      );
    });

    const setupUpwardDropdown = () => {
      const upward = true;
      const defaultValue = 'en';
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' }
      ];

      return render(
        <Dropdown
          options={options}
          defaultValue={defaultValue}
          upward={upward}
        />
      );
    };
  });

  test('hides the options by default', () => {
    const { container } = setupDropdownWithDefaultValueTo('en');

    expect(container.firstChild).not.toHaveClass('is-open');
  });

  test('shows the options when clicking', () => {
    const { container } = setupDropdownWithDefaultValueTo('en');
    fireEvent.click(container.firstChild.firstChild);

    expect(container.firstChild).toHaveClass('is-open');
  });

  test('selects an option', () => {
    const { container, getByLabelText } = setupDropdownWithDefaultValueTo('en');
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(getByLabelText('Spanish'));

    expect(container.firstChild.firstChild).toHaveTextContent('Spanish');
  });

  test('hide the selected option', () => {
    const {
      container,
      getByLabelText,
      getAllByRole,
      getByRole
    } = setupDropdownWithDefaultValueTo('en');
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(getByLabelText('Spanish'));

    expect(getAllByRole('option')).toHaveLength(1);
    expect(getByRole('option')).toHaveTextContent('English');
  });

  test('hides the options after selecting one', () => {
    const { container, getByLabelText } = setupDropdownWithDefaultValueTo('en');
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(getByLabelText('Spanish'));

    expect(container.firstChild).not.toHaveClass('is-open');
  });

  test('executes on change callback', () => {
    const options = [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' }
    ];
    const defaultValue = 'en';
    const onChange = jest.fn();
    const { container, getByLabelText } = render(
      <Dropdown
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
    fireEvent.click(container.firstChild.firstChild);
    fireEvent.click(getByLabelText('Spanish'));

    expect(onChange).toBeCalledWith('es');
  });

  test('click outside closes dropdown', () => {
    const map = {};

    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const { container } = setupDropdownWithDefaultValueTo('es');

    expect(container.firstChild).not.toHaveClass('is-open');

    fireEvent.click(container.firstChild.firstChild);

    expect(container.firstChild).toHaveClass('is-open');

    map.mousedown({ target: document.body });
    fireEvent.click(document);

    expect(container.firstChild).not.toHaveClass('is-open');
  });

  describe('getA11yStatusMessage', () => {
    test('reports that one result is available', () => {
      const { container, getByRole } = setupDropdownWithDefaultValueTo('en');
      fireEvent.click(container.firstChild.firstChild);

      expect(container.firstChild).toHaveClass('is-open');
      expect(getByRole('status')).toHaveTextContent(
        '1 option is available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });

    test('reports that two results ara available', () => {
      const defaultValue = 'en';
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' }
      ];

      const { container, getByRole } = render(
        <Dropdown options={options} defaultValue={defaultValue} />
      );
      fireEvent.click(container.firstChild.firstChild);

      expect(getByRole('status')).toHaveTextContent(
        '2 options are available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });

    test('reports selected option', () => {
      const defaultValue = 'en';
      const options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' }
      ];

      const { container, getByRole, getByLabelText } = render(
        <Dropdown options={options} defaultValue={defaultValue} />
      );
      fireEvent.click(container.firstChild.firstChild);
      fireEvent.click(getByLabelText('Spanish'));

      expect(getByRole('status')).toHaveTextContent(
        'You have selected Spanish'
      );
    });
  });

  const setupDropdownWithDefaultValueTo = defaultValue => {
    const options = [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' }
    ];

    return render(<Dropdown options={options} defaultValue={defaultValue} />);
  };
});
