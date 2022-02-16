import React from 'react';
import Radio from './Radio';
import { render } from '@testing-library/react';

describe('Radio', () => {
  const props = { 'data-testid': 'a_test_id', id: 'a_id', name: 'a_name' };

  test('renders a radio', () => {
    const { getByTestId } = render(<Radio {...props} />);

    expect(getByTestId(props['data-testid'])).toBeInTheDocument();
  });

  test('renders a radio label', () => {
    const label = 'a_label';

    const { getByText } = render(<Radio {...props} label={label} />);

    expect(getByText(label)).toBeInTheDocument();
  });

  test('renders a radio with error', () => {
    const error = 'a_error';

    const { getByText, getByTestId } = render(
      <Radio {...props} error={error} />
    );

    expect(getByTestId(`${props.id}-error-msg`)).toBeInTheDocument();
    expect(getByText(error)).toBeInTheDocument();
  });
});
