import React from 'react';
import Switch from './Switch';
import { render } from '@testing-library/react';

describe('Switch', () => {
  const props = { id: 'a_id', name: 'a_name' };

  test('renders a switch', () => {
    const { container } = render(<Switch {...props} />);

    expect(container.firstChild).toHaveClass('Switch');
  });

  test('renders a switch label', () => {
    const label = 'a_lable';
    const { getByLabelText } = render(<Switch {...props} label={label} />);

    expect(getByLabelText(label)).toBeInTheDocument();
  });
});
