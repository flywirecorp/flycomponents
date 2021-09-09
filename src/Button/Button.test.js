import React from 'react';
import { render, fireEvent } from 'test-utils';
import Button from './Button';
import { ENTER, SPACE } from 'utils/keycodes';

describe('Button', () => {
  test('events', function() {
    const onClickMock = jest.fn();
    const onMouseDownMock = jest.fn();
    const onKeyDownMock = jest.fn();

    const { getByText } = render(
      <Button
        onClick={onClickMock}
        onMouseDown={onMouseDownMock}
        onKeyDown={onKeyDownMock}
      >
        Press me!
      </Button>
    );

    const button = getByText(/press me/i);

    fireEvent.mouseDown(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onMouseDownMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { keyCode: ENTER });
    expect(onClickMock).toHaveBeenCalledTimes(2);
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { keyCode: SPACE });
    expect(onClickMock).toHaveBeenCalledTimes(3);
  });
});
