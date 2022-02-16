import React from 'react';
import { Rating } from './Rating';
import { fireEvent, render } from '@testing-library/react';

describe('Rating', () => {
  const props = {
    rating: '3'
  };

  test('renders the stars', () => {
    const { queryAllByText } = render(<Rating {...props} />);

    expect(queryAllByText('☆')).toHaveLength(5);
  });

  test('displays received errors', () => {
    const ownProps = { ...props, errorText: 'An error' };

    const { queryAllByText } = render(<Rating {...ownProps} />);

    expect(queryAllByText('☆')[0]).toHaveClass('error');
  });

  test('doest not display an error if no error received', () => {
    const { queryAllByText } = render(<Rating {...props} />);

    expect(queryAllByText('☆')[0]).not.toHaveClass('error');
  });

  test('calls onclick with the star value', async () => {
    const onClick = jest.fn();
    const ownProps = { ...props, onClick };

    const { queryAllByText } = render(<Rating {...ownProps} />);
    fireEvent.click(queryAllByText('☆')[1]);

    expect(onClick).toHaveBeenCalledWith('4');
  });
});
