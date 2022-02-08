import React from 'react';
import Alert from './Alert';
import { render } from '@testing-library/react';

describe('Alert', () => {
  test('renders children passed in', () => {
    const testId = 'paragraph_test_id';
    const paragraphString = 'Inner paragraph';
    const children = <p data-testid={testId}>{paragraphString}</p>;

    const { getByTestId, getByText } = render(<Alert>{children}</Alert>);

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByText(paragraphString)).toBeInTheDocument();
  });

  test('renders Alert with custom role', () => {
    const role = 'custom_role';
    const children = <p>Inner paragraph</p>;

    const { getByRole } = render(<Alert role={role}>{children}</Alert>);

    expect(getByRole(role)).toBeInTheDocument();
  });

  test('renders diferent warning levels', () => {
    const types = ['danger', 'warning', 'info', 'success'];
    const children = <p>Inner paragraph</p>;

    for (let i = 0; i < types.length; i++) {
      const { getByTestId } = render(
        <Alert type={types[i]} data-testid={`id_${types[i]}`}>
          {children}
        </Alert>
      );

      expect(getByTestId(`id_${types[i]}`)).toHaveClass(`Alert--${types[i]}`);
    }
  });
});
