import React from 'react';
import Textarea from './Textarea';
import { render } from '@testing-library/react';

describe('Textarea', () => {
  const defaultProps = {
    name: 'a_name',
    'data-testid': 'a_test_id'
  };

  test('renders a textarea', () => {
    const { getByTestId } = render(<Textarea {...defaultProps} />);

    expect(getByTestId(defaultProps['data-testid'])).toBeInTheDocument();
    expect(getByTestId(defaultProps['data-testid'])).toHaveProperty(
      'name',
      defaultProps.name
    );
  });

  test('renders a read-only textarea if the property is set', () => {
    const { getByTestId } = render(<Textarea {...defaultProps} readOnly />);

    expect(getByTestId(defaultProps['data-testid'])).toHaveProperty(
      'readOnly',
      true
    );
  });

  test('when value property is given sets it as default value', () => {
    const value = 'a_value';

    const { getByTestId } = render(
      <Textarea {...defaultProps} value={value} />
    );

    expect(getByTestId(defaultProps['data-testid'])).toHaveValue(value);
    expect(getByTestId(defaultProps['data-testid'])).toHaveProperty(
      'defaultValue',
      value
    );
  });
});
