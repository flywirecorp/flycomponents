import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from './Modal';
import { fireEvent, render } from '@testing-library/react';

describe('Modal', () => {
  const dummyContent = (
    <form data-testid="form_id">
      <input type="text" name="fname" />
      <input type="submit" value="Submit" />
    </form>
  );

  test('renders children', () => {
    const { getByTestId } = render(<Modal>{dummyContent}</Modal>);

    expect(getByTestId('form_id')).toBeInTheDocument();
  });

  test('traps the focus', () => {
    render(<Modal>{dummyContent}</Modal>);

    expect(document.body).toHaveFocus();
  });

  test('starts open', () => {
    const { getAllByRole } = render(<Modal>{dummyContent}</Modal>);

    expect(getAllByRole('presentation')).toHaveLength(1);
  });

  test('renders with specified size', () => {
    const size = 'medium';

    const { getByTestId } = render(<Modal size={size}>{dummyContent}</Modal>);

    expect(getByTestId('Modal')).toHaveClass('Modal--medium');
  });

  test('starts closed', () => {
    const { queryByRole } = render(
      <Modal defaultIsOpen={false}>{dummyContent}</Modal>
    );

    expect(queryByRole('presentation')).toBe(null);
  });

  test('executes callback when opens', () => {
    const onOpen = jest.fn();

    render(
      <Modal onOpen={onOpen} isOpen>
        {dummyContent}
      </Modal>
    );

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('does not execute callback if closed', () => {
    const onOpen = jest.fn();

    render(
      <Modal onOpen={onOpen} isOpen={false}>
        {dummyContent}
      </Modal>
    );

    expect(onOpen).toHaveBeenCalledTimes(0);
  });

  test('executes callback when closed', () => {
    const onClose = jest.fn();

    const { getByLabelText } = render(
      <Modal onClose={onClose}>{dummyContent}</Modal>
    );
    fireEvent.click(getByLabelText('Close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('merges content class sent with its default class', () => {
    const className = 'customClass';

    const { getByTestId } = render(
      <Modal className={className}>{dummyContent}</Modal>
    );

    expect(getByTestId('Modal')).toHaveClass(className);
  });

  describe('when closing is allowed', () => {
    test('closes clicking the close button', () => {
      const { getByLabelText, queryByRole } = render(
        <Modal>{dummyContent}</Modal>
      );
      fireEvent.click(getByLabelText('Close'));

      expect(queryByRole('presentation')).toBe(null);
    });

    test('closes clicking the ESC key', () => {
      const { queryByRole, container } = render(<Modal>{dummyContent}</Modal>);
      fireEvent.keyDown(container, { keyCode: 27 });

      expect(queryByRole('presentation')).toBe(null);
    });

    describe('clicking outside the modal', () => {
      test('closes clicking the mouse left button on $browser browsers', () => {
        const { queryByRole, getByTestId } = render(
          <Modal>{dummyContent}</Modal>
        );
        fireEvent.mouseDown(getByTestId('Modal'));

        expect(queryByRole('presentation')).toBe(null);
      });
    });
  });

  describe('when closing is not allowed', () => {
    test('does not show a close button', () => {
      const { queryByLabelText } = render(
        <Modal allowClosing={false}>{dummyContent}</Modal>
      );

      expect(queryByLabelText('Close')).toBe(null);
    });

    test('does not close clicking the ESC key', () => {
      const { getByRole, container } = render(
        <Modal allowClosing={false}>{dummyContent}</Modal>
      );
      fireEvent.keyDown(container, { keyCode: 27 });

      expect(getByRole('presentation')).toBeInTheDocument();
    });

    test('does not close clicking outside the modal', () => {
      const { getByRole, getByTestId } = render(
        <Modal allowClosing={false}>{dummyContent}</Modal>
      );
      fireEvent.mouseDown(getByTestId('Modal'));

      expect(getByRole('presentation')).toBeInTheDocument();
    });
  });

  describe('as controlled component', () => {
    test('handles status outside the component', () => {
      let isOpen = true;

      const { getByLabelText } = render(
        <Modal isOpen={isOpen} onClose={() => (isOpen = false)}>
          {dummyContent}
        </Modal>
      );

      fireEvent.click(getByLabelText('Close'));

      expect(isOpen).toBe(false);
    });
  });
});
