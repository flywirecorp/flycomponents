import React from 'react';
import Drawer from './Drawer';
import { render, fireEvent } from '@testing-library/react';

jest.mock('focus-trap-react', () => ({ children }) => (
  <div data-testid="FocusTrap">{children}</div>
));

describe('Drawer', () => {
  const dummyContent = (
    <form>
      <input type="submit" value="Submit" />
    </form>
  );

  test('render drawer children', () => {
    const { getByRole, getByText } = render(
      <Drawer isOpen>{dummyContent}</Drawer>
    );

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('trap the focus when open', () => {
    const { getByTestId } = render(<Drawer isOpen>{dummyContent}</Drawer>);

    expect(getByTestId('FocusTrap')).toBeInTheDocument();
  });

  test('close drawer using the X button', () => {
    const onCloseMock = jest.fn();

    const { getByLabelText } = render(
      <Drawer onClose={onCloseMock} isOpen>
        {dummyContent}
      </Drawer>
    );
    fireEvent.click(getByLabelText('Close'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('close drawer using ESC key', () => {
    const onCloseMock = jest.fn();

    const { getByRole } = render(
      <Drawer onClose={onCloseMock} isOpen>
        {dummyContent}
      </Drawer>
    );
    fireEvent.keyDown(getByRole('dialog'), { keyCode: 27 });

    expect(onCloseMock).toHaveBeenCalled();
  });

  test('close drawer clicking on close button text', () => {
    const onCloseMock = jest.fn();
    const closeButtonText = 'Close drawer';

    const { getByText } = render(
      <Drawer onClose={onCloseMock} closeButtonText={closeButtonText} isOpen>
        {dummyContent}
      </Drawer>
    );
    fireEvent.click(getByText(closeButtonText));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
