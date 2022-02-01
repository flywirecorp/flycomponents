import React from 'react';
import Button from './Button';
import { fireEvent, render } from '@testing-library/react';

describe('Button', () => {
  test('renders a button with "Submit" text by default', () => {
    const { getByText } = render(<Button />);

    expect(getByText(/submit/i)).toBeInTheDocument();
  });

  test('renders children in Button', () => {
    const children = 'Save';

    const { getByText } = render(<Button>{children}</Button>);

    expect(getByText(children)).toBeInTheDocument();
  });

  test('calls function onClick when click', () => {
    const onClick = jest.fn();

    const { getByText } = render(<Button onClick={onClick} />);
    fireEvent.click(getByText(/submit/i));

    expect(onClick).toHaveBeenCalled();
  });

  test('accepts other properties', () => {
    const { getByText } = render(<Button disabled />);

    expect(getByText(/submit/i)).toBeDisabled();
  });
});
