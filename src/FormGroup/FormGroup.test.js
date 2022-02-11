import React from 'react';
import FormGroup from './FormGroup';
import { render } from '@testing-library/react';

describe('FormGroup', () => {
  const name = 'name';
  const childrenTestId = 'children_id';
  const children = <div data-testid={childrenTestId} />;

  test('renders children passed in', () => {
    const { getByTestId } = render(
      <FormGroup name={name}>{children}</FormGroup>
    );

    expect(getByTestId(childrenTestId)).toBeInTheDocument();
  });

  test('renders a label', () => {
    const label = 'A label';

    const { getByText } = render(
      <FormGroup label={label} name={name}>
        {children}
      </FormGroup>
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(label)).toHaveClass('Label');
  });

  test('renders an error message', () => {
    const errorTestId = `${name}-error-msg`;
    const error = 'must be greater or equal to 5000';

    const { getByTestId } = render(
      <FormGroup error={error} name={name}>
        {children}
      </FormGroup>
    );

    expect(getByTestId(errorTestId)).toContainHTML(error);
  });

  test('renders a hint message', () => {
    const hintTestId = `${name}-hint-msg`;
    const hint = 'Amount you want to send in USD';

    const { getByTestId } = render(
      <FormGroup hint={hint} name={name}>
        {children}
      </FormGroup>
    );

    expect(getByTestId(hintTestId)).toContainHTML(hint);
  });

  test('can add disabled class to component', () => {
    const { container } = render(
      <FormGroup name={name} disabled>
        {children}
      </FormGroup>
    );

    expect(container.firstChild).toHaveClass('is-disabled');
  });

  test('can add read only class to component', () => {
    const { container } = render(
      <FormGroup name={name} readOnly>
        {children}
      </FormGroup>
    );

    expect(container.firstChild).toHaveClass('is-readOnly');
  });
});
