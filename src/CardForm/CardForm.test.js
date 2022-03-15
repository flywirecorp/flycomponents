import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import CardForm from './CardForm';

describe('CardForm', () => {
  test('renders a form', () => {
    const { getByText } = render(<CardForm />);

    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('renders a compressed form', () => {
    const { container } = render(<CardForm isCompressed />);

    expect(
      container.getElementsByClassName('CardForm--Compressed').length
    ).toBe(1);
  });

  test('renders the passed children', () => {
    const ChildrenComponent = () => <div data-testid="children_component_id" />;

    const { getByTestId } = render(
      <CardForm>
        <ChildrenComponent />
      </CardForm>
    );

    expect(getByTestId('children_component_id')).toBeInTheDocument();
  });

  describe('onFocus', () => {
    const inputs = [
      ["Cardholder's name"],
      ["Cardholder's surname"],
      ['Card number'],
      ['Expiry date (MM/YY)'],
      ['CVV']
    ];

    test.each(inputs)('removes the field errors from %s', label => {
      const { getByLabelText } = render(<CardForm />);

      const input = getByLabelText(label);
      fireEvent.change(input, { target: { value: '' } });
      input.blur();
      input.focus();

      const errorMessage = screen.queryByText('error');
      expect(errorMessage).toBeNull();
    });
  });

  describe('validations', () => {
    /* eslint-disable */
    describe.each`
      fieldName       | fieldLabel                | fieldValue            | error
      ${'name'}       | ${"Cardholder's name"}    | ${'a_name'}           | ${'invalid_name'}
      ${'surname'}    | ${"Cardholder's surname"} | ${'a_surname'}        | ${'invalid_surname'}
      ${'cardNumber'} | ${'Card number'}          | ${'4111111111111111'} | ${'invalid_card_number'}
      ${'expiryDate'} | ${'Expiry date (MM/YY)'}  | ${'12/99'}            | ${'invalid_expiry_date'}
      ${'cvv'}        | ${'CVV'}                  | ${'555'}              | ${'invalid_cvv'}
    `('$fieldName is required', ({ fieldName, fieldLabel, fieldValue, error }) => {
      const errors = {
        [fieldName]: error
      };

      test('has an error when is empty', () => {
        const { getByText, getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, fieldLabel, '');

        expect(getByText(error)).toBeInTheDocument();
      });

      test('has no error when is not empty', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, fieldLabel, fieldValue);

        expect(screen.queryByText(error)).toBeNull();
      });
    });

    describe('expiry date should be a valid future date', () => {
      let dateNowSpy;
      const currentDate = 1555587222000;
      const errors = {
        expiryDate: 'invalid_expiry_date'
      };

      beforeAll(() => {
        dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(currentDate);
      });

      afterAll(() => {
        dateNowSpy.mockReset();
        dateNowSpy.mockRestore();
      });

      test('has no error if is a valid future date', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, 'Expiry date (MM/YY)', '12/30');

        expect(screen.queryByText('invalid_expiry_date')).toBeNull();

      });

      test('has error if is an invalid date', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, 'Expiry date (MM/YY)', '12/');

        expect(screen.queryByText('invalid_expiry_date')).toBeInTheDocument();
      });

      test('has error if is a past date', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, 'Expiry date (MM/YY)', '12/12');

        expect(screen.queryByText('invalid_expiry_date')).toBeInTheDocument();
      });
    });

    describe('card number should be a valid accepted card', () => {
      const errors = {
        cardNumber: 'invalid_card_number',
        cardType: 'invalid_card_type',
        cvv: 'invalid_cvv'
      };
      const validVisaCardNumber = '4893398714398294';
      const invalidCardNumber = '3111';
      const validAMEXCardNumber = '373968333653142';

      test('has no error if is a valid accepted card', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, 'Card number', validVisaCardNumber);

        expect(screen.queryByText('invalid_card_number')).not.toBeInTheDocument();
      });

      test('has error if has an invalid value', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, 'Card number', invalidCardNumber);

        expect(screen.queryByText('invalid_card_number')).toBeInTheDocument();
      });

      test('has error if has an unnacepted card type', () => {
        const { getByLabelText } = render(<CardForm errors={errors} />);

        blurField(getByLabelText, 'Card number', validAMEXCardNumber);

        expect(screen.queryByText('invalid_card_type')).toBeInTheDocument();
      });
    });

    describe('CVV should be valid for the given card number', () => {
      const errors = { cvv: 'invalid_cvv' };

      describe('when there is no card number', () => {
        test('has no error when the cvv is invalid', () => {
          const { getByLabelText } = render(<CardForm errors={errors} />);
          const invalidCvv = 1;

          blurField(getByLabelText, 'CVV', invalidCvv);

          expect(screen.queryByText('invalid_cvv')).not.toBeInTheDocument();
        });
      });

      describe('when there is a card number', () => {
        test('has no error when the cvv is valid', () => {
          const { getByLabelText } = render(<CardForm errors={errors} />);
          const validCvv = 111;
          const validCardNumber = '4111111111111111';
          fillField(getByLabelText, 'Card number', validCardNumber);

          blurField(getByLabelText, 'CVV', validCvv);

          expect(screen.queryByText('invalid_cvv')).not.toBeInTheDocument();
        });

        test('has error when the cvv is invalid', () => {
          const { getByLabelText } = render(<CardForm errors={errors} />);
          const invalidCvv = 11;
          const validCardNumber = '4111111111111111';

          fillField(getByLabelText, 'Card number', validCardNumber);
          blurField(getByLabelText, 'CVV', invalidCvv);

          expect(screen.queryByText('invalid_cvv')).toBeInTheDocument();
        });
      });
    });
  });

  describe('onValidate', () => {
    test('executes onValidate callback on form validation before submit if no validation errors', () => {
      const onValidate = jest.fn();
      const onSubmit = jest.fn();

      const formValues = {
        name: 'aname',
        surname: 'asurname',
        cardNumber: '4111-1111-1111-1111',
        expiryDate: '12/23',
        cvv: '555',
        cardType: 'VISA'
      };

      const { getByLabelText } = render(<CardForm onSubmit={onSubmit} onValidate={onValidate} />);
      fillField(getByLabelText, "Cardholder's name", formValues.name);
      fillField(getByLabelText, "Cardholder's surname", formValues.surname);
      fillField(getByLabelText, 'Card number', formValues.cardNumber);
      fillField(getByLabelText, 'Expiry date (MM/YY)', formValues.expiryDate);
      fillField(getByLabelText, 'CVV', formValues.cvv);

      submitForm();

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(formValues);
    });

    test('executes onValidate callback on form validtion if validation errors', () => {
      const onValidate = jest.fn();
      const onSubmit = jest.fn();
      const formValues = {
        name: 'a_name',
        surname: 'a_surname',
        expiryDate: '12/23',
        cvv: '555'
      };
      const { getByLabelText } = render(<CardForm onSubmit={onSubmit} onValidate={onValidate} />);
      fillField(getByLabelText, "Cardholder's name", formValues.name);
      fillField(getByLabelText, "Cardholder's surname", formValues.surname);
      fillField(getByLabelText, 'Expiry date (MM/YY)', formValues.expiryDate);
      fillField(getByLabelText, 'CVV', formValues.cvv);

      submitForm();

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    test('renders a submit button', () => {
      render(<CardForm />);

      const submitButton = screen.getAllByRole("button");
      expect(submitButton).toHaveLength(1);
    });

    test('executes onSubmit callback with form values when clicking on submit button', () => {
      const onSubmit = jest.fn();
      const formValues = {
        name: 'a name',
        surname: 'a surname',
        cardNumber: '4111-1111-1111-1111',
        expiryDate: '12/23',
        cvv: '555',
        cardType: 'VISA'
      };
      const { getByLabelText } = render(<CardForm onSubmit={onSubmit} />);
      fillField(getByLabelText, "Cardholder's name", formValues.name);
      fillField(getByLabelText, "Cardholder's surname", formValues.surname);
      fillField(getByLabelText, 'Card number', formValues.cardNumber);
      fillField(getByLabelText, 'Expiry date (MM/YY)', formValues.expiryDate);
      fillField(getByLabelText, 'CVV', formValues.cvv);

      submitForm();

      expect(onSubmit).toHaveBeenCalledWith(formValues);
    });

    test('does not execute onSubmit if validation errors exist due to missing field', () => {
      const onSubmit = jest.fn();
      const formValues = {
        name: 'a_name',
        surname: 'a_surname',
        expiryDate: '12/23',
        cvv: '555'
      };
      const { getByLabelText } = render(<CardForm onSubmit={onSubmit} />);
      fillField(getByLabelText, "Cardholder's name", formValues.name);
      fillField(getByLabelText, "Cardholder's surname", formValues.surname);
      fillField(getByLabelText, 'Expiry date (MM/YY)', formValues.expiryDate);
      fillField(getByLabelText, 'CVV', formValues.cvv);

      submitForm();

      expect(onSubmit).not.toHaveBeenCalled();
    });

    test('does not execute onSubmit if validation errors exist due to field value', () => {
      const onSubmit = jest.fn();
      const formValues = {
        name: 'a_name',
        cardNumber: '4111111111111111',
        surname: 'a_surname',
        expiryDate: '12/23',
        cvv: '55'
      };
      const { getByLabelText } = render(<CardForm onSubmit={onSubmit} />);
      fillField(getByLabelText, "Cardholder's name", formValues.name);
      fillField(getByLabelText, "Cardholder's surname", formValues.surname);
      fillField(getByLabelText, 'Card number', formValues.cardNumber);
      fillField(getByLabelText, 'Expiry date (MM/YY)', formValues.expiryDate);
      fillField(getByLabelText, 'CVV', formValues.cvv);

      submitForm();

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    test('does not render a cancel button if onCancel is not provided', () => {
      render(<CardForm />);

      const buttons = screen.queryAllByText('Cancel');
      expect(buttons).toHaveLength(0);
    });

    test('renders a cancel button if onCancel is provided', () => {
      const onCancel = () => {};
      render(<CardForm onCancel={onCancel} />);

      const buttons = screen.queryAllByText('Cancel');
      expect(buttons).toHaveLength(1);
    });

    test('calls onCancel when clicking on cancel button', () => {
      const onCancel = jest.fn();
      render(<CardForm onCancel={onCancel} />);

      const cancelButton = screen.getByText('Cancel');
      cancelButton.click();

      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    test('executes onChange callback when changing any form value', () => {
      const onChange = jest.fn();
      const fieldLabel = "Cardholder's name";
      const fieldName = "name";
      const fieldValue = 'a name';
      const { getByLabelText } = render(<CardForm onChange={onChange} />);

      fillField(getByLabelText, fieldLabel, fieldValue);

      expect(onChange).toHaveBeenCalledWith(fieldName, fieldValue);
    });
  });

  describe('card number format', () => {
    test('format allows up to 19 digits if accepted card types include UnionPay', () => {
      const acceptedCards = ['VISA', 'MC', 'UNIONPAY'];
      const numberWithSymbolsAndExtraDigits = '1111B2222a3333$4444#555/6666';

      const { getByLabelText } = render(<CardForm acceptedCards={acceptedCards} />);

      fillField(getByLabelText, 'Card number', numberWithSymbolsAndExtraDigits);

      expect(getByLabelText('Card number').value).toEqual('1111-2222-3333-4444-555');
    });

    test('format allows up to 16 digits if accepted cards do not include UnionPay', () => {
      const acceptedCards = ['VISA', 'MC'];
      const numberWithSymbolsAndExtraDigits = '1111B2222a3333$4444#555/6666';

      const { getByLabelText } = render(<CardForm acceptedCards={acceptedCards} />);

      fillField(getByLabelText, 'Card number', numberWithSymbolsAndExtraDigits);

      expect(getByLabelText('Card number').value).toEqual('1111-2222-3333-4444');
    });

    test('updates card number format if acceptedCards prop changes', () => {
      const acceptedCards = ['VISA', 'MC', 'UNIONPAY'];
      const numberWithSymbolsAndExtraDigits = '1111B2222a3333$4444#555/6666';

      const { getByLabelText, rerender } = render(<CardForm acceptedCards={acceptedCards} />);

      fillField(getByLabelText, 'Card number', numberWithSymbolsAndExtraDigits);

      expect(getByLabelText('Card number').value).toEqual('1111-2222-3333-4444-555');

      const updatedCcceptedCards = ['VISA', 'MC'];
      rerender(<CardForm acceptedCards={updatedCcceptedCards} />)

      fillField(getByLabelText, 'Card number', numberWithSymbolsAndExtraDigits);

      expect(getByLabelText('Card number').value).toEqual('1111-2222-3333-4444');
    });
  });

  describe('optional fields', () => {
    test('does not render optional fields', () => {
      const optionalFields = ['expiryDate', 'cvv'];

      render(<CardForm optionalFields={optionalFields} />);

      expect(screen.queryAllByLabelText('Expiry date (MM/YY)')).toHaveLength(0);
      expect(screen.queryAllByLabelText('CVV')).toHaveLength(0);
    });

    test('does not validate optinal fields on submit', () => {
      const optionalFields = ['expiryDate', 'cvv'];
      const onSubmit = jest.fn();
      const props = { onSubmit, optionalFields };
      const expectedSubmittedValues = {
        name: 'a name',
        surname: 'a surname',
        cardNumber: '4111-1111-1111-1111',
        cardType: 'VISA'
      };

      const { getByLabelText } = render(<CardForm {...props} />);

      fillField(getByLabelText, "Cardholder's name", 'a name');
      fillField(getByLabelText, "Cardholder's surname", 'a surname');
      fillField(getByLabelText, 'Card number', '4111-1111-1111-1111');

      submitForm();

      expect(onSubmit).toHaveBeenCalledWith(expectedSubmittedValues);
    });
  });
});

const fillField = (getByLabelText, label, value) => {
  const input = getByLabelText(label);
  fireEvent.change(input, { target: { value: value } });
};

const submitForm = () => {
  const submitButton = screen.getByRole("button");
  submitButton.click();
}

const blurField = (getByLabelText, label, value) => {
  const input = getByLabelText(label);
  fireEvent.change(input, { target: { value: value } });
  input.blur();
  submitForm();
};
