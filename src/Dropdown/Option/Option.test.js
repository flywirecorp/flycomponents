import React from 'react';
import Option from './Option';
import { render } from '@testing-library/react';

describe('Option', () => {
  const defaultProps = {
    id: 'id',
    label: 'Option',
    value: 'val',
    onClick: jest.fn()
  };

  test('renders an option', () => {
    const { getByLabelText, getByText } = render(<Option {...defaultProps} />);

    expect(getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(getByText(defaultProps.label)).toBeInTheDocument();
  });

  test('renders custom templates', () => {
    const customTemplate = jest.fn(() => <div />);

    render(<Option {...defaultProps} template={customTemplate} />);

    expect(customTemplate).toBeCalledWith({
      'aria-label': 'Option',
      'aria-selected': false,
      className: 'Dropdown-option',
      'data-label': 'Option',
      id: 'id',
      label: 'Option',
      onClick: expect.any(Function),
      role: 'option',
      tabIndex: -1,
      value: 'val'
    });
  });
});
