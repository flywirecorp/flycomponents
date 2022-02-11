import React from 'react';
import Label from './Label';
import { render } from '@testing-library/react';

describe('Label', () => {
  test('renders a label', () => {
    const props = { htmlFor: 'amount_for', value: 'Amount', id: 'amount_id' };

    const { getByText } = render(<Label {...props} />);

    expect(getByText(props.value)).toBeInTheDocument;
  });

  test('renders a required label', () => {
    const props = {
      htmlFor: 'amount_for',
      value: 'Amount',
      id: 'amount_id',
      required: true
    };

    const { getByText } = render(<Label {...props} />);

    expect(getByText(props.value)).toBeInTheDocument();
    expect(getByText('*')).toBeInTheDocument;
  });
});
