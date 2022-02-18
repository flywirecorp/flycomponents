import React from 'react';
import Tab from './Tab';
import { fireEvent, render } from '@testing-library/react';

describe('Tab', () => {
  const option = 'Tab option';

  test('renders link', () => {
    const { container, getByRole } = render(<Tab>{option}</Tab>);

    expect(container.firstChild).toHaveTextContent(option);
    expect(container.firstChild).toHaveClass('Tab-link');
    expect(getByRole('tab')).toBeInTheDocument();
  });

  test('activates link', () => {
    const isActiveClass = 'is-active';

    const { container } = render(<Tab isActive>{option}</Tab>);

    expect(container.firstChild).toHaveClass(isActiveClass);
  });

  test('disables link', () => {
    const disabledClass = 'is-disabled';

    const { container } = render(<Tab isDisabled>{option}</Tab>);

    expect(container.firstChild).toHaveClass(disabledClass);
  });

  test('calls function on select', () => {
    const onSelect = jest.fn();

    const { container } = render(<Tab onSelect={onSelect}>{option}</Tab>);
    fireEvent.click(container.firstChild);

    expect(onSelect).toHaveBeenCalled();
  });

  test('calls function on click', () => {
    const onClick = jest.fn();

    const { container } = render(<Tab onClick={onClick}>{option}</Tab>);
    fireEvent.click(container.firstChild);

    expect(onClick).toHaveBeenCalled();
  });
});
