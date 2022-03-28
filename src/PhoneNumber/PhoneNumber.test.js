import React from 'react';
import PhoneNumber from './PhoneNumber';
import { fireEvent, render } from '@testing-library/react';

describe('PhoneNumber', () => {
  const defaultProps = {
    countries: [],
    label: 'Phone',
    name: 'phone'
  };

  test('renders an input text', () => {
    const { getByRole } = render(<PhoneNumber {...defaultProps} />);

    expect(getByRole('textbox')).toHaveClass('Input');
    expect(getByRole('textbox')).toHaveProperty('type', 'text');
  });

  describe('set class name according to the length of the prefix', () => {
    const scopeProps = {
      countries: [
        {
          label: 'American Samoa',
          value: 'as',
          dialingCode: '1684'
        },
        {
          label: 'Spain',
          value: 'es',
          dialingCode: '34'
        }
      ],
      label: 'Phone',
      name: 'phone'
    };
    const props = { ...defaultProps, ...scopeProps };

    test('when no prefix value', () => {
      const { container } = render(<PhoneNumber {...props} />);

      expect(container.firstChild).toHaveClass('width-0');
    });

    test('when prefix length is 2', () => {
      const testProps = {
        value: '+34 666666666'
      };
      const ownProps = { ...testProps, ...props };

      const { container } = render(<PhoneNumber {...ownProps} />);

      expect(container.firstChild).toHaveClass('width-2');
    });

    test('when prefix length is 4', () => {
      const testProps = {
        value: '+1684 155555555'
      };
      const ownProps = { ...testProps, ...props };

      const { container } = render(<PhoneNumber {...ownProps} />);

      expect(container.firstChild).toHaveClass('width-4');
    });
  });

  test('handles on blur events in input', () => {
    const onBlur = jest.fn();
    const ownProps = { ...defaultProps, onBlur };

    const { getByRole } = render(<PhoneNumber {...ownProps} />);
    fireEvent.blur(getByRole('textbox'));

    expect(onBlur).toBeCalled();
  });

  test('handles on change event in input', () => {
    const countries = [
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const onChange = jest.fn();
    const name = 'phone';
    const ownProps = { ...defaultProps, countries, name, onChange };

    const { getByRole } = render(<PhoneNumber {...ownProps} />);
    fireEvent.change(getByRole('textbox'), { target: { value: '1' } });

    expect(onChange).toBeCalledWith(name, '1');

    fireEvent.change(getByRole('textbox'), { target: { value: '12' } });

    expect(onChange).toBeCalledWith(name, '12');
  });

  describe('having read-only property', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const ownProps = { ...defaultProps, countries, readOnly: true };

    test('renders a read-only input', () => {
      const { getByRole } = render(<PhoneNumber {...ownProps} />);

      expect(getByRole('textbox')).toHaveProperty('readOnly', true);
    });

    test('passes read-only property to PrefixSelector', () => {
      const { getByRole, container } = render(<PhoneNumber {...ownProps} />);
      fireEvent.click(getByRole('button'));

      expect(
        container.firstChild.firstChild.childNodes[1].firstChild
      ).not.toHaveClass('is-searching');
    });
  });

  describe('ignores invalid countries', () => {
    test('ignores invalid options', () => {
      const countries = [
        {
          label: 'Spain',
          value: 'ES',
          dialingCode: '34'
        },
        {
          label: 'United States',
          value: 'US',
          dialingCode: null
        },
        {
          label: 'Canada',
          value: 'CA',
          dialingCode: undefined
        }
      ];
      const ownProps = { ...defaultProps, countries };

      const { queryAllByRole } = render(<PhoneNumber {...ownProps} />);

      expect(queryAllByRole('option')).toHaveLength(1);
    });
  });

  describe('having disabled property', () => {
    const countries = [
      {
        label: 'Spain (+34)',
        value: 'es',
        dialingCode: '34'
      },
      {
        label: 'United States (+1)',
        value: 'us',
        dialingCode: '1'
      }
    ];
    const ownProps = { ...defaultProps, countries, disabled: true };

    test('renders a disabled input', () => {
      const { getByRole } = render(<PhoneNumber {...ownProps} />);

      expect(getByRole('textbox')).toBeDisabled();
    });

    test('passes disabled property to PrefixSelector', () => {
      const { getByRole } = render(<PhoneNumber {...ownProps} />);

      expect(getByRole('button')).toBeDisabled();
    });
  });

  test('renders a custom attribute', () => {
    const ownProps = { ...defaultProps, 'data-testid': 'a_data' };

    const { getByTestId } = render(<PhoneNumber {...ownProps} />);

    expect(getByTestId('a_data')).toHaveClass('Input');
  });

  describe('when changing prefix selector', () => {
    test('if formatted number then saves the prefix appended with the formatted number as phone number', () => {
      const countries = [
        {
          label: 'Spain (+34)',
          value: 'es',
          dialingCode: '34'
        }
      ];
      const onChange = jest.fn();
      const name = 'phone';
      const formattedNumber = '666666666';
      const expectedPhoneNumber = '+34 666666666';
      const ownProps = { ...defaultProps, countries, name, onChange };

      const { getByRole } = render(<PhoneNumber {...ownProps} />);
      fireEvent.click(getByRole('button'));
      fireEvent.keyDown(getByRole('button'), { keyCode: 83, code: 'KeyS' });
      fireEvent.keyDown(getByRole('button'), { keyCode: 80, code: 'KeyP' });
      fireEvent.keyDown(getByRole('button'), { keyCode: 65, code: 'KeyA' });
      fireEvent.keyDown(getByRole('button'), { keyCode: 13 });
      fireEvent.change(getByRole('textbox'), {
        target: { value: formattedNumber }
      });

      expect(onChange).toHaveBeenCalledWith(name, expectedPhoneNumber);
    });

    test('if no formatted number then saves the prefix as phone number', () => {
      const countries = [
        {
          label: 'Spain (+34)',
          value: 'es',
          dialingCode: '34'
        }
      ];
      const onChange = jest.fn();
      const name = 'phone';
      const expectedPhoneNumber = '+34 ';
      const ownProps = { ...defaultProps, countries, name, onChange };

      const { getByRole } = render(<PhoneNumber {...ownProps} />);
      fireEvent.click(getByRole('button'));
      fireEvent.keyDown(getByRole('button'), { keyCode: 83, code: 'KeyS' });
      fireEvent.keyDown(getByRole('button'), { keyCode: 80, code: 'KeyP' });
      fireEvent.keyDown(getByRole('button'), { keyCode: 65, code: 'KeyA' });
      fireEvent.keyDown(getByRole('button'), { keyCode: 13 });
      fireEvent.change(getByRole('textbox'), {
        target: { value: '' }
      });

      expect(onChange).toHaveBeenCalledWith(name, expectedPhoneNumber);
    });
  });

  test('passes other properties to the inner input field', () => {
    const ownProps = { ...defaultProps, 'aria-required': true };

    const { getByRole } = render(<PhoneNumber {...ownProps} />);

    expect(getByRole('textbox')).toBeRequired();
  });
});
