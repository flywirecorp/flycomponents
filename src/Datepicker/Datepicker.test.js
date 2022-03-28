import React from 'react';
import Datepicker from './Datepicker';
import { fireEvent, render } from '@testing-library/react';

jest.mock('focus-trap-react', () => ({ children }) => (
  <div data-testid="FocusTrap">{children}</div>
));

describe('Datepicker', () => {
  const defaultProps = {
    error: '',
    label: 'Your birthday',
    name: 'birthday',
    onBlur: () => {},
    onChange: () => {},
    required: false,
    value: '04/21/1979'
  };

  test('has a date input', () => {
    const { getByRole } = render(<Datepicker {...defaultProps} />);

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('textbox')).toHaveClass('Input Input InputGroup-input');
  });

  test('has a calendar', () => {
    const { container } = render(<Datepicker {...defaultProps} />);

    expect(container.firstChild.childNodes[1].lastChild).toHaveClass(
      'Calendar Datepicker-calendar'
    );
  });

  test('hiddes the calendar by default', () => {
    const { container, queryAllByTestId } = render(
      <Datepicker {...defaultProps} />
    );

    expect(queryAllByTestId('FocusTrap')).toHaveLength(0);
    expect(container.firstChild).not.toHaveClass('is-focused');
  });

  test('shows the calendar when clicking the calendar icon', () => {
    const { container, getByTestId, getByLabelText } = render(
      <Datepicker {...defaultProps} />
    );
    fireEvent.click(getByLabelText('Show calendar'));

    expect(getByTestId('FocusTrap')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('is-focused');
  });

  test('hides the calendar when click outside the component', () => {
    const { container, queryAllByTestId, getByLabelText } = render(
      <Datepicker {...defaultProps} />
    );
    fireEvent.click(getByLabelText('Show calendar'));
    fireEvent.click(document.body);

    expect(queryAllByTestId('FocusTrap')).toHaveLength(0);
    expect(container.firstChild).not.toHaveClass('is-focused');
  });

  test('moves calendar one month back', () => {
    const value = '11/22/2016';
    const onChange = jest.fn();
    const props = { ...defaultProps, value, onChange };

    const { getByRole, getByLabelText } = render(<Datepicker {...props} />);
    fireEvent.click(getByLabelText('Go to previous month'));

    expect(getByRole('textbox')).toHaveProperty('value', '10/22/2016');
    expect(onChange).toHaveBeenCalledWith('birthday', '10/22/2016');
  });

  test('moves calendar one month ahead', () => {
    const value = '11/22/2016';
    const onChange = jest.fn();
    const props = { ...defaultProps, value, onChange };

    const { getByRole, getByLabelText } = render(<Datepicker {...props} />);
    fireEvent.click(getByLabelText('Go to next month'));

    expect(getByRole('textbox')).toHaveProperty('value', '12/22/2016');
    expect(onChange).toHaveBeenCalledWith('birthday', '12/22/2016');
  });

  test('moves calendar to selected month', () => {
    const JANUARY = 0;
    const value = '11/22/2016';
    const onChange = jest.fn();
    const props = { ...defaultProps, value, onChange };

    const { getByLabelText, getByRole } = render(<Datepicker {...props} />);
    fireEvent.change(getByLabelText('Select month'), {
      target: { value: JANUARY }
    });

    expect(getByRole('textbox')).toHaveProperty('value', '01/22/2016');
    expect(onChange).toHaveBeenCalledWith('birthday', '01/22/2016');
  });

  test('moves calendar to selected year', () => {
    const value = '11/22/2016';
    const onChange = jest.fn();
    const props = { ...defaultProps, value, onChange };

    const { getByLabelText, getByRole } = render(<Datepicker {...props} />);
    fireEvent.change(getByLabelText('Select year'), {
      target: { value: 2017 }
    });

    expect(getByRole('textbox')).toHaveProperty('value', '11/22/2017');
    expect(onChange).toHaveBeenCalledWith('birthday', '11/22/2017');
  });

  test('selects date clicking a day', () => {
    const value = '11/22/2016';
    const onChange = jest.fn();
    const props = { ...defaultProps, value, onChange };

    const { getByRole, getByText } = render(<Datepicker {...props} />);
    fireEvent.click(getByText('4'));

    expect(getByRole('textbox')).toHaveProperty('value', '11/04/2016');
    expect(onChange).toHaveBeenCalledWith('birthday', '11/04/2016');
  });

  describe('shows the calendar on the correct position', () => {
    test('shows the calendar below', () => {
      const { getByLabelText, container } = render(
        <Datepicker {...defaultProps} />
      );
      fireEvent.click(getByLabelText('Show calendar'));

      expect(container.firstChild.childNodes[1]).not.toHaveClass('is-reverse');
    });

    test('shows the calendar above when it does not fit below', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
          top: 1200
        };
      });

      const { getByLabelText, container } = render(
        <Datepicker {...defaultProps} />
      );
      fireEvent.click(getByLabelText('Show calendar'));

      expect(container.firstChild.childNodes[1]).toHaveClass('is-reverse');
    });

    test('shows the calendar below when it does not fit above', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
          top: 100
        };
      });

      const { getByLabelText, container } = render(
        <Datepicker {...defaultProps} />
      );
      fireEvent.click(getByLabelText('Show calendar'));

      expect(container.firstChild.childNodes[1]).not.toHaveClass('is-reverse');
    });
  });

  test('passes other properties to the inner DateInput component', () => {
    const ownProps = { 'data-testid': 'datapicker_id' };
    const props = { ...defaultProps, ...ownProps };

    const { getByTestId } = render(<Datepicker {...props} />);

    expect(getByTestId('datapicker_id')).toBeInTheDocument();
    expect(getByTestId('datapicker_id')).toHaveClass('Input');
  });

  describe('having read-only property', () => {
    const ownProps = { readOnly: true };
    const props = { ...defaultProps, ...ownProps };

    test('renders a read-only input', () => {
      const { getByRole } = render(<Datepicker {...props} />);

      expect(getByRole('textbox')).toHaveProperty('readOnly', true);
    });

    test('does not open the calendar clicking the calendar icon', () => {
      const { getByLabelText, queryAllByTestId, container } = render(
        <Datepicker {...props} />
      );
      fireEvent.click(getByLabelText('Show calendar'));

      expect(queryAllByTestId('FocusTrap')).toHaveLength(0);
      expect(container.firstChild).not.toHaveClass('is-focused');
    });
  });

  describe('having disabled property', () => {
    const ownProps = { disabled: true };
    const props = { ...defaultProps, ...ownProps };

    test('renders a diisabled input', () => {
      const { getByRole } = render(<Datepicker {...props} />);

      expect(getByRole('textbox')).toBeDisabled();
    });

    test('does not open the calendar clicking the calendar icon', () => {
      const { getByLabelText, queryAllByTestId, container } = render(
        <Datepicker {...props} />
      );
      fireEvent.click(getByLabelText('Show calendar'));

      expect(queryAllByTestId('FocusTrap')).toHaveLength(0);
      expect(container.firstChild).not.toHaveClass('is-focused');
    });
  });
});
