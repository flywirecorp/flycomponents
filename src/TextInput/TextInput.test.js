import React from 'react';
import TextInput from './TextInput';
import { fireEvent, render } from '@testing-library/react';

describe('TextInput', () => {
  const defaultProps = {
    name: 'a_name',
    'data-testid': 'a_test_id'
  };

  test('renders an input text', () => {
    const { getByTestId } = render(<TextInput {...defaultProps} />);

    expect(getByTestId(defaultProps['data-testid'])).toBeInTheDocument();
    expect(getByTestId(defaultProps['data-testid'])).toHaveProperty(
      'type',
      'text'
    );
  });

  test('renders a textarea', () => {
    const { getByTestId } = render(<TextInput {...defaultProps} multiline />);

    expect(getByTestId(defaultProps['data-testid'])).toHaveClass('Textarea');
  });

  test('renders a input group with prefix', () => {
    const prefix = 'PREFIX';
    const props = { ...defaultProps, prefix };

    const { getByText, container } = render(<TextInput {...props} />);

    expect(getByText(prefix)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('FormGroup--hasPrefix');
  });

  test('renders a input group with suffix', () => {
    const suffix = 'SUFFIX';
    const props = { ...defaultProps, suffix };

    const { getByText, container } = render(<TextInput {...props} />);

    expect(getByText(suffix)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('FormGroup--hasSuffix');
  });

  test('handles on change events in input', () => {
    const onChange = jest.fn();
    const props = { ...defaultProps, onChange };

    const { getByTestId } = render(<TextInput {...props} />);

    fireEvent.change(getByTestId(defaultProps['data-testid']), {
      target: { name: 'name', value: 'Dolores' }
    });

    expect(onChange).toBeCalledWith('name', 'Dolores');
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const props = { ...defaultProps, onBlur };

    const { getByTestId } = render(<TextInput {...props} />);

    fireEvent.blur(getByTestId(defaultProps['data-testid']), {
      target: { name: 'name' }
    });

    expect(onBlur).toBeCalled();
  });

  test('handles on focus events', () => {
    const onFocus = jest.fn();
    const props = { ...defaultProps, onFocus };

    const { getByTestId } = render(<TextInput {...props} />);
    fireEvent.focusIn(getByTestId(defaultProps['data-testid']));

    expect(onFocus).toBeCalled();
  });

  test('renders an input with type password', () => {
    const type = 'password';
    const props = { ...defaultProps, type };

    const { getByTestId } = render(<TextInput {...props} />);

    expect(getByTestId(defaultProps['data-testid'])).toHaveProperty(
      'type',
      'password'
    );
  });

  test('renders an input group with type password', () => {
    const type = 'password';
    const suffix = 'suffix';
    const props = { ...defaultProps, type, suffix };

    const { getByTestId, getByText, container } = render(
      <TextInput {...props} />
    );

    expect(getByText(suffix)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('FormGroup--hasSuffix');
    expect(getByTestId(defaultProps['data-testid'])).toHaveProperty(
      'type',
      'password'
    );
  });
});
