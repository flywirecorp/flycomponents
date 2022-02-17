import React from 'react';
import InputGroup from '../InputGroup';
import { render } from '@testing-library/react';

describe('InputGroup', () => {
  const name = 'name';
  const type = 'text';

  test('renders an input', () => {
    const testId = 'input_test_id';

    const { getByTestId } = render(
      <InputGroup name={name} type={type} data-testid={testId} />
    );
    const input = getByTestId(testId);

    expect(input).toHaveProperty('name', 'name');
    expect(input).toHaveProperty('type', 'text');
  });

  test('renders a prefix', () => {
    const prefix = '$';

    const { getByText } = render(
      <InputGroup name={name} type={type} prefix={prefix} />
    );

    expect(getByText(prefix)).toBeInTheDocument();
    expect(getByText(prefix)).toHaveClass('InputGroup-context');
  });

  test('renders a suffix', () => {
    const suffix = '.00';

    const { getByText } = render(
      <InputGroup name={name} type={type} suffix={suffix} />
    );

    expect(getByText(suffix)).toBeInTheDocument();
    expect(getByText(suffix)).toHaveClass('InputGroup-context');
  });
});
