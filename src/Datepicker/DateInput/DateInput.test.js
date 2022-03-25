import React from 'react';
import DateInput from './DateInput';
import { parseDate } from '../../utils/date';
import { fireEvent, render } from '@testing-library/react';

describe('DateInput', () => {
  const defaultProps = {
    name: 'name',
    onCalendarIconClick: () => {},
    onFocus: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    toggleCalendar: () => {}
  };

  test('sets the state value while writing', () => {
    const onKeyDown = jest.fn();
    const props = { ...defaultProps, onKeyDown };

    const { getByRole } = render(<DateInput {...props} />);
    fireEvent.keyDown(getByRole('textbox'), {
      key: '0',
      keyCode: 48
    });

    expect(onKeyDown).toBeCalledWith('0');
  });

  test('removes the last character when pressing delete key', () => {
    const onKeyDown = jest.fn();
    const defaultValue = parseDate('05/12/2016');
    const props = { ...defaultProps, defaultValue, onKeyDown };

    const { getByRole } = render(<DateInput {...props} />);
    fireEvent.keyDown(getByRole('textbox'), {
      key: 'Backspace',
      keyCode: 8
    });

    expect(onKeyDown).toBeCalledWith('05/12/201');
  });

  test('does not change input field if readOnly prop is passed in', () => {
    const onKeyDown = jest.fn();
    const props = { ...defaultProps, onKeyDown, readOnly: true };

    const { getByRole } = render(<DateInput {...props} />);
    fireEvent.keyDown(getByRole('textbox'), {
      key: '0',
      keyCode: 48
    });

    expect(onKeyDown).not.toBeCalled();
  });

  test('toggles calendar when Enter key pressed', () => {
    const toggleCalendar = jest.fn();
    const props = { ...defaultProps, toggleCalendar };

    const { getByRole } = render(<DateInput {...props} />);
    fireEvent.keyDown(getByRole('textbox'), {
      key: 'Enter',
      keyCode: 13
    });

    expect(toggleCalendar).toBeCalledWith();
  });

  test('pass other properties to the inner input field', () => {
    const props = { ...defaultProps, 'data-testid': 'dateinput_id' };

    const { getByTestId } = render(<DateInput {...props} />);

    expect(getByTestId('dateinput_id')).toBeInTheDocument();
  });
});
