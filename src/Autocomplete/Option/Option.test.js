import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Option from './Option';

describe('Option', () => {
  const defaultProps = {
    hasFocus: false,
    onClick: () => {},
    onMouseEnter: () => {},
    option: { label: 'Option', value: 'opt' }
  };

  test('renders an option', () => {
    const { getByText } = render(<Option {...defaultProps} />);

    expect(getByText(/option/i)).toBeTruthy();
  });

  describe('when has focus', () => {
    const hasFocus = true;

    test('has an active status', () => {
      const ownProps = { ...defaultProps, hasFocus };

      const { getByTestId } = render(<Option {...ownProps} />);
      const option = getByTestId(/option/i);

      expect(option).toHaveClass('is-active');
    });
  });

  test('simulates click events', () => {
    const onClick = jest.fn();
    const ownProps = { ...defaultProps, onClick };

    const { getByTestId } = render(<Option {...ownProps} />);
    const option = getByTestId(/option/i);
    fireEvent.click(option);

    expect(onClick).toHaveBeenCalledWith('opt');
  });

  test('simulates mouse enter events', () => {
    const onMouseEnter = jest.fn();
    const ownProps = { ...defaultProps, onMouseEnter };

    const { getByTestId } = render(<Option {...ownProps} />);
    const option = getByTestId(/option/i);
    fireEvent.mouseEnter(option);

    expect(onMouseEnter).toHaveBeenCalledWith('opt');
  });

  test('highlight text is activated by default', () => {
    const option = { label: 'Hello World!', value: 'hw' };
    const searchQuery = 'World';
    const ownProps = { ...defaultProps, option, searchQuery };

    const { getByTestId } = render(<Option {...ownProps} />);
    const highlightedText = getByTestId('highlightedText');

    expect(highlightedText).toBeTruthy();
  });

  test('highlight text can be deactivated', () => {
    const highlightText = false;
    const option = { label: 'Hello World!', value: 'hw' };
    const searchQuery = 'World';
    const ownProps = { ...defaultProps, highlightText, option, searchQuery };

    const { queryByTestId } = render(<Option {...ownProps} />);

    expect(queryByTestId('highlightedText')).toBeFalsy();
  });

  test('renders custom templates', () => {
    const customTemplate = jest.fn();
    const ownProps = { ...defaultProps, template: customTemplate };

    render(<Option {...ownProps} />);

    expect(customTemplate).toHaveBeenCalled();
  });
});
