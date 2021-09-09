import React from 'react';
import { render, fireEvent } from 'test-utils';
import Button from './Button';
import { ENTER, SPACE } from 'utils/keycodes';

describe('Button', () => {
  test('onClick event', function() {
    const onClickMock = jest.fn();

    const { getByText } = render(
      <Button onClick={onClickMock}>Press me!</Button>
    );

    const button = getByText(/press me/i);

    fireEvent.mouseDown(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { keyCode: ENTER });
    expect(onClickMock).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(button, { keyCode: SPACE });
    expect(onClickMock).toHaveBeenCalledTimes(3);
  });

  test('onMouseDown event', function() {
    const onMouseDownMock = jest.fn();

    const { getByText } = render(
      <Button onMouseDown={onMouseDownMock}>Press me!</Button>
    );

    const button = getByText(/press me/i);

    fireEvent.mouseDown(button);
    expect(onMouseDownMock).toHaveBeenCalledTimes(1);
  });

  test('onKeyDown event', function() {
    const onKeyDownMock = jest.fn();

    const { getByText } = render(
      <Button onKeyDown={onKeyDownMock}>Press me!</Button>
    );

    const button = getByText(/press me/i);

    fireEvent.keyDown(button, { keyCode: ENTER });
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button, { keyCode: SPACE });
    expect(onKeyDownMock).toHaveBeenCalledTimes(2);
  });
});
