import React from 'react';
import MultipleCheckbox from './MultipleCheckbox';
import { fireEvent, render } from '@testing-library/react';

describe('MultipleCheckbox', () => {
  const defaultProps = {
    name: 'name',
    options: [
      { label: 'Foo', value: 'foo' },
      { label: 'Bar', value: 'bar' }
    ]
  };

  test('renders as many checkboxes as options we have', () => {
    const { getByText } = render(<MultipleCheckbox {...defaultProps} />);

    defaultProps.options.forEach(option => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  test('sets checked attributes of checkboxes', () => {
    const checked = ['foo'];

    const { getByText } = render(
      <MultipleCheckbox {...defaultProps} checked={checked} />
    );

    defaultProps.options.forEach(option => {
      option.label === checked[0]
        ? expect(getByText(option.label)).toBeChecked()
        : expect(getByText(option.label)).not.toBeChecked();
    });
  });

  test('executes a callback when checkbox changes', () => {
    const onChange = jest.fn();

    const { getByText } = render(
      <MultipleCheckbox {...defaultProps} onChange={onChange} />
    );

    fireEvent.click(getByText(defaultProps.options[0].label));

    expect(onChange).toBeCalledWith({
      name: defaultProps.name,
      checked: [defaultProps.options[0].value]
    });

    fireEvent.click(getByText(defaultProps.options[0].label));

    expect(onChange).toBeCalledWith({
      name: defaultProps.name,
      checked: []
    });
  });
});
