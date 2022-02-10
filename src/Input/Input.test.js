import React from 'react';
import Input from './Input';
import { render, fireEvent } from '@testing-library/react';

describe('Input', () => {
  test('renders an input', () => {
    const name = 'amount';
    const id = 'input';

    const { getByTestId } = render(<Input data-testid={id} name={name} />);

    expect(getByTestId(id)).toBeInTheDocument();
  });

  test('renders an input and change its value', () => {
    const name = 'amount';
    const type = 'number';
    const id = 'input_id';
    const value = '33.33';

    const inputRenderer = render(
      <Input data-testid={id} name={name} type={type} />
    );
    const { getByTestId } = inputRenderer;
    const input = getByTestId(id);
    fireEvent.change(input, { target: { value: value } });

    expect(input).toBeInTheDocument();
    expect(input.value).toBe(value);
  });

  test('renders a read-only input', () => {
    const name = 'text';
    const id = 'input';
    const readOnly = true;

    const { getByTestId } = render(
      <Input data-testid={id} name={name} readOnly={readOnly} />
    );

    expect(getByTestId(id)).toHaveProperty('readOnly', true);
  });

  test('renders input with default Value', () => {
    const name = 'text';
    const id = 'input';
    const value = 'Good Morning';

    const { getByTestId } = render(
      <Input data-testid={id} name={name} value={value} />
    );
    const input = getByTestId(id);

    expect(input).toBeInTheDocument();
    expect(input.value).toBe(value);
  });

  test('renders a disabled input', () => {
    const name = 'amount';
    const id = 'input';

    const { getByTestId } = render(
      <Input data-testid={id} name={name} disabled />
    );

    expect(getByTestId(id)).toBeInTheDocument();
    expect(getByTestId(id)).toBeDisabled();
  });

  test('renders a required input', () => {
    const name = 'amount';
    const id = 'input';

    const { getByTestId } = render(
      <Input data-testid={id} name={name} required />
    );

    expect(getByTestId(id)).toBeInTheDocument();
    expect(getByTestId(id)).toBeRequired();
  });

  test('renders input with error', () => {
    const name = 'amountname';
    const id = 'input';
    const error = 'ups';

    const { getByTestId } = render(
      <Input error={error} data-testid={id} name={name} />
    );

    expect(getByTestId(id)).toBeInvalid();
  });
});
