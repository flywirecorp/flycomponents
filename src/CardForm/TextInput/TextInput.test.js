import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './TextInput';

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

  test('renders an input field with the provided className', () => {
    const props = { name: 'a_name', className: 'a_className' };
    const { container } = render(<TextInput {...props} />);

    expect(container.firstChild.classList.contains('a_className')).toBe(true);
  });

  test('renders the provided children', () => {
    const ChildrenComponent = () => <div data-testid="child" />;
    const { getAllByTestId } = render(
      <TextInput name="a_name">
        <ChildrenComponent />
      </TextInput>
    );

    expect(getAllByTestId('child')).toHaveLength(1);
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

  describe('when format is provided', () => {
    const onChange = jest.fn();
    userEvent.setup();
    const format = {
      pattern: '..-../..',
      shouldAddSeparatorBeforeTyping: true,
      allowedCharacters: /\d/g
    };
    const name = 'a_name';

    test('formats the input value on change if format is provided', () => {
      const value = '123456';
      const formattedValue = '12-34/56';
      const event = { target: { value } };

      const props = { ...defaultProps, name, onChange, format };
      const { getByTestId } = render(<TextInput {...props} />);

      fireEvent.input(getByTestId(defaultProps['data-testid']), event);

      expect(getByTestId(defaultProps['data-testid']).value).toEqual(
        formattedValue
      );
    });

    test('calls onChange callback with name and formatted value', () => {
      const value = '123456';
      const onChange = jest.fn();
      const formattedValue = '12-34/56';
      const event = { target: { name, value } };

      const props = { ...defaultProps, name, onChange, format };
      const { getByTestId } = render(<TextInput {...props} />);

      fireEvent.input(getByTestId(defaultProps['data-testid']), event);

      expect(onChange).toHaveBeenCalledWith(name, formattedValue);
    });
  });
});
