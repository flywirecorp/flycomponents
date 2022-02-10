import React from 'react';
import { FileInput } from './FileInput';
import { render, fireEvent } from '@testing-library/react';

describe('FileInput', () => {
  describe('renders elements texts', () => {
    test('renders submit button text', () => {
      const buttonText = 'a_text';
      const expectedTestId = 'submitButton';
      const { getByTestId, getByText } = render(
        <FileInput buttonText={buttonText} />
      );

      expect(getByTestId(expectedTestId)).toBeInTheDocument();
      expect(getByText(buttonText)).toBeInTheDocument();
    });

    test('renders a hint', () => {
      const hint = 'a_hint';
      const hintTestId = 'hint';

      const { getByTestId, getByText } = render(<FileInput hint={hint} />);

      expect(getByTestId(hintTestId)).toBeInTheDocument();
      expect(getByText(hint)).toBeInTheDocument();
    });
  });

  test('handles on change events', () => {
    const id = 'fileInput';
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const onChange = jest.fn();

    const { getByTestId } = render(<FileInput onChange={onChange} />);
    fireEvent.change(getByTestId(id), { target: { file: file } });

    expect(onChange).toBeCalled();
  });

  test('accepts accepted extensions', async () => {
    const id = 'fileInput';
    const expectedExtension = '.jpg';

    const { getByTestId } = render(<FileInput accepts={expectedExtension} />);

    expect(getByTestId(id)).toHaveProperty('accept', expectedExtension);
  });

  test('accepts multiple files', () => {
    const { getByTestId } = render(<FileInput multiple />);

    expect(getByTestId('fileInput')).toHaveProperty('multiple');
  });

  test('renders a spinner animation while uploading', () => {
    const animationClass = 'FileInput--uploading';

    const { getByTestId } = render(<FileInput uploading />);

    expect(getByTestId('submitButton')).toHaveClass(animationClass);
  });

  test('renders disabled while uploading', () => {
    const { getByTestId } = render(<FileInput uploading />);

    expect(getByTestId('submitButton')).toBeDisabled();
  });
});
