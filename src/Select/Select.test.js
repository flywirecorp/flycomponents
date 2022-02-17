import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';
import { fireEvent, render } from '@testing-library/react';

describe('Select', () => {
  const onChange = jest.fn();
  const values = [
    { label: 'first', value: 'first_value' },
    { label: 'second', value: 'second_value' }
  ];

  test('renders a select node', () => {
    const { container } = render(<Select values={values} />);

    expect(container.firstChild).toHaveClass('Select');
  });

  test('adds a name to the select node', () => {
    const name = 'a_name';

    const { container } = render(<Select values={values} name={name} />);

    expect(container.firstChild).toHaveProperty('name', name);
  });

  test('adds a class to the select node', () => {
    const aClass = 'a_class';

    const { container } = render(<Select values={values} className={aClass} />);

    expect(container.firstChild).toHaveClass(aClass);
  });

  test('selects a default value', () => {
    const selectedValue = 'second_value';

    const { container } = render(
      <Select
        values={values}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    );

    expect(container.firstChild).toHaveValue(selectedValue);
  });

  test('can be disabled', () => {
    const { container } = render(<Select values={values} disabled />);

    expect(container.firstChild).toBeDisabled();
  });

  test('calls function on change', () => {
    const { container } = render(
      <Select values={values} onChange={onChange} />
    );
    fireEvent.change(container.firstChild);

    expect(onChange).toHaveBeenCalled();
  });

  test('calls function on click', () => {
    const onClick = jest.fn();
    const { container } = render(<Select values={values} onClick={onClick} />);

    fireEvent.click(container.firstChild);

    expect(onClick).toHaveBeenCalled();
  });

  describe('other properties', () => {
    test('can be passed', () => {
      const { container } = render(<Select values={values} aria-required />);

      expect(container.firstChild).toBeRequired();
    });

    test('can override previous ones', () => {
      const { container } = render(
        <Select values={values} required={false} aria-required />
      );

      expect(container.firstChild).toBeRequired();
    });
  });
});
