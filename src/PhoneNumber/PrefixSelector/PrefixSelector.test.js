import React from 'react';
import { PrefixSelector } from './PrefixSelector';
import debounce from '../../utils/debounce';
import { fireEvent, render } from '@testing-library/react';

jest.mock('../../utils/debounce', () => {
  return jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  });
});

jest.mock('dom-scroll-into-view', () => {
  return jest.fn();
});

afterAll(() => {
  debounce.mockReset();
});

describe('PrefixSelector', () => {
  const defaultProps = {
    name: 'country',
    options: [],
    onFocus: () => {}
  };

  test('has a list with options', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const props = { ...defaultProps, ...{ options } };

    const { queryAllByRole } = render(<PrefixSelector {...props} />);

    expect(queryAllByRole('option')).toHaveLength(2);
  });

  test('displays options when clicking the menu', () => {
    const { container, getByRole } = render(
      <PrefixSelector {...defaultProps} />
    );

    expect(container.firstChild).not.toHaveClass('is-searching');

    fireEvent.click(getByRole('button'));

    expect(container.firstChild).toHaveClass('is-searching');
  });

  test('moves the focus to the next option when pressing key down', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      }
    ];
    const props = { ...defaultProps, ...{ options } };

    const { getByRole, getByLabelText } = render(<PrefixSelector {...props} />);
    fireEvent.click(getByRole('button'));
    fireEvent.keyDown(getByRole('button'), { keyCode: 40 });

    expect(getByLabelText('Spain +34')).toHaveClass('is-active');
  });

  test('moves the focus to the previous option when pressing key up', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const props = { ...defaultProps, ...{ options } };

    const { getByRole, getByLabelText } = render(<PrefixSelector {...props} />);
    fireEvent.click(getByRole('button'));
    fireEvent.keyDown(getByRole('button'), { keyCode: 40 });
    fireEvent.keyDown(getByRole('button'), { keyCode: 40 });
    fireEvent.keyDown(getByRole('button'), { keyCode: 38 });

    expect(getByLabelText('Spain +34')).toHaveClass('is-active');
  });

  test('hides options when pressing the esc key', () => {
    const { getByRole, container } = render(
      <PrefixSelector {...defaultProps} />
    );
    fireEvent.click(getByRole('button'));

    expect(container.firstChild).toHaveClass('is-searching');

    fireEvent.keyDown(getByRole('button'), { keyCode: 27 });

    expect(container.firstChild).not.toHaveClass('is-searching');
  });

  test('selects current option when pressing the enter key', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      }
    ];
    const props = { ...defaultProps, ...{ options } };

    const { getByRole, getByLabelText } = render(<PrefixSelector {...props} />);
    fireEvent.click(getByRole('button'));
    fireEvent.keyDown(getByRole('button'), { keyCode: 40 });
    fireEvent.keyDown(getByRole('button'), { keyCode: 13 });

    expect(getByLabelText('+34')).toBeInTheDocument();
  });

  test('hides options when pressing the enter key', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      }
    ];
    const props = { ...defaultProps, ...{ options } };

    const { getByRole, container } = render(<PrefixSelector {...props} />);
    fireEvent.click(getByRole('button'));
    fireEvent.keyDown(getByRole('button'), { keyCode: 40 });
    fireEvent.keyDown(getByRole('button'), { keyCode: 13 });

    expect(container.firstChild).not.toHaveClass('is-searching');
  });

  test('focus the country when typing', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const props = { ...defaultProps, ...{ options } };

    const { getByRole, getByLabelText } = render(<PrefixSelector {...props} />);
    fireEvent.click(getByRole('button'));
    fireEvent.keyDown(getByRole('button'), { keyCode: 83, code: 'KeyS' });
    fireEvent.keyDown(getByRole('button'), { keyCode: 80, code: 'KeyP' });
    fireEvent.keyDown(getByRole('button'), { keyCode: 65, code: 'KeyA' });

    expect(getByLabelText('Spain +34')).toHaveClass('is-active');
  });

  test('does not open the menu when read-only param is received', () => {
    const options = [
      {
        label: 'Spain',
        value: 'ES',
        dialingCode: '34'
      },
      {
        label: 'United States',
        value: 'US',
        dialingCode: '1'
      }
    ];
    const props = { ...defaultProps, ...{ options }, readOnly: true };

    const { getByRole, container } = render(<PrefixSelector {...props} />);
    fireEvent.click(getByRole('button'));

    expect(container.firstChild).not.toHaveClass('is-searching');
  });

  describe('getA11yStatusMessage', () => {
    test('reports that two result are available', () => {
      const options = [
        {
          label: 'Spain',
          value: 'ES',
          dialingCode: '34'
        },
        {
          label: 'United States',
          value: 'US',
          dialingCode: '1'
        }
      ];
      const props = { ...defaultProps, ...{ options } };

      const { getByRole } = render(<PrefixSelector {...props} />);
      fireEvent.click(getByRole('button'));

      expect(getByRole('status')).toHaveTextContent(
        '2 options are available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.'
      );
    });
  });

  describe('button aria label', () => {
    test('does not show the prefix when a value is not selected', () => {
      const { queryAllByLabelText } = render(
        <PrefixSelector {...defaultProps} />
      );

      expect(queryAllByLabelText('+34')).toHaveLength(0);
    });

    test('shows prefix when value is selected', () => {
      const options = [
        {
          label: 'Spain',
          value: 'ES',
          dialingCode: '34'
        }
      ];
      const props = { ...defaultProps, ...{ options }, value: 'ES' };

      const { getByLabelText } = render(<PrefixSelector {...props} />);

      expect(getByLabelText('+34')).toBeInTheDocument();
    });
  });
});
