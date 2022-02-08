import React from 'react';
import Checkbox from './Checkbox';
import { render } from '@testing-library/react';

describe('Checkbox', () => {
  test('renders a checkbox', () => {
    const props = { 'data-testid': 'a_id', name: 'a_name' };

    const { getByTestId } = render(<Checkbox {...props} />);

    expect(getByTestId(props['data-testid'])).toBeInTheDocument();
  });

  test('renders a checkbox label', () => {
    const props = { label: 'a_label', name: 'a_name_labelled' };

    const { getByText } = render(<Checkbox {...props} />);

    expect(getByText(props.label)).toBeInTheDocument();
  });

  test('renders a checkbox with error', () => {
    const props = { error: 'a_error', name: 'a_name', id: 'a_id' };

    const { getByTestId } = render(<Checkbox {...props} />);

    expect(getByTestId(`${props.id}-error-msg`)).toBeInTheDocument();
  });
});
