import React from 'react';
import { shallow } from 'enzyme';
import CardForm from './CardForm';
import Button from '../Button';

describe('CardForm', () => {
  test('renders a form', () => {
    const wrapper = shallow(<CardForm />);

    expect(wrapper.find('form')).toHaveLength(1);
  });

  test('renders a compressed form', () => {
    const wrapper = shallow(<CardForm isCompressed />);

    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('.CardForm-Input--Compressed')).toHaveLength(5);
  });

  test('renders the passed children', () => {
    const ChildrenComponent = () => <div />;

    const wrapper = shallow(
      <CardForm>
        <ChildrenComponent />
      </CardForm>
    );

    expect(wrapper.find(ChildrenComponent)).toHaveLength(1);
  });

  describe('onFocus', () => {
    const inputs = [
      ['name'],
      ['surname'],
      ['cardNumber'],
      ['expiryDate'],
      ['cvv']
    ];

    test.each(inputs)('removes the field errors from %s', name => {
      const wrapper = shallow(<CardForm />);
      const input = wrapper.find(`[name="${name}"]`);
      input.simulate('blur', name, '');

      input.simulate('focus', name);

      expect(wrapper.find(`[name="${name}"]`).prop('error')).toBeUndefined();
    });
  });

  describe('validations', () => {
    describe.each`
      fieldName       | fieldValue            | error
      ${'name'}       | ${'a_name'}           | ${'invalid_name'}
      ${'surname'}    | ${'a_surname'}        | ${'invalid_surname'}
      ${'cardNumber'} | ${'4111111111111111'} | ${'invalid_card_number'}
      ${'expiryDate'} | ${'12/21'}            | ${'invalid_expiry_date'}
      ${'cvv'}        | ${'555'}              | ${'invalid_cvv'}
    `('$fieldName is required', ({ fieldName, fieldValue, error }) => {
      const errors = {
        [fieldName]: error
      };
      test('has an error when is empty', () => {
        const wrapper = shallow(<CardForm errors={errors} />);

        blurField(wrapper, fieldName, '');

        expect(wrapper.find(`[name="${fieldName}"]`).prop('error')).toEqual(
          error
        );
      });

      test('has no error when is not empty', () => {
        const wrapper = shallow(<CardForm />);

        blurField(wrapper, fieldName, fieldValue);

        expect(
          wrapper.find(`[name="${fieldName}"]`).prop('error')
        ).toBeUndefined();
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
        const wrapper = shallow(<CardForm />);

        blurField(wrapper, 'expiryDate', '12/30');

        expect(
          wrapper.find('[name="expiryDate"]').prop('error')
        ).toBeUndefined();
      });

      test('has error if is an invalid date', () => {
        const wrapper = shallow(<CardForm errors={errors} />);

        blurField(wrapper, 'expiryDate', '12/');

        expect(wrapper.find('[name="expiryDate"]').prop('error')).toEqual(
          'invalid_expiry_date'
        );
      });

      test('has error if is a past date', () => {
        const wrapper = shallow(<CardForm errors={errors} />);

        blurField(wrapper, 'expiryDate', '12/12');

        expect(wrapper.find('[name="expiryDate"]').prop('error')).toEqual(
          'invalid_expiry_date'
        );
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
        const wrapper = shallow(<CardForm errors={errors} />);

        blurField(wrapper, 'cardNumber', validVisaCardNumber);

        expect(
          wrapper.find(`[name="cardNumber"]`).prop('error')
        ).toBeUndefined();
      });

      test('has error if has an invalid value', () => {
        const wrapper = shallow(<CardForm errors={errors} />);

        blurField(wrapper, 'cardNumber', invalidCardNumber);

        expect(wrapper.find('[name="cardNumber"]').prop('error')).toBe(
          'invalid_card_number'
        );
      });

      test('has error if has an unnacepted card type', () => {
        const wrapper = shallow(<CardForm errors={errors} />);

        blurField(wrapper, 'cardNumber', validAMEXCardNumber);

        expect(wrapper.find('[name="cardNumber"]').prop('error')).toBe(
          'invalid_card_type'
        );
      });
    });

    describe('CVV should be valid for the given card number', () => {
      const errors = { cvv: 'invalid_cvv' };

      describe('when there is no card number', () => {
        test('has no error when the cvv is invalid', () => {
          const wrapper = shallow(<CardForm errors={errors} />);
          const invalidCvv = 1;

          blurField(wrapper, 'cvv', invalidCvv);

          expect(wrapper.find(`[name="cvv"]`).prop('error')).toBeUndefined();
        });
      });

      describe('when there is a card number', () => {
        test('has no error when the cvv is valid', () => {
          const wrapper = shallow(<CardForm errors={errors} />);
          const validCvv = 111;
          const validCardNumber = '4111111111111111';
          fillField(wrapper, 'cardNumber', validCardNumber);

          blurField(wrapper, 'cvv', validCvv);

          expect(wrapper.find(`[name="cvv"]`).prop('error')).toBeUndefined();
        });

        test('has error when the cvv is invalid', () => {
          const wrapper = shallow(<CardForm errors={errors} />);
          const invalidCvv = 11;
          const validCardNumber = '4111111111111111';
          fillField(wrapper, 'cardNumber', validCardNumber);

          blurField(wrapper, 'cvv', invalidCvv);

          expect(wrapper.find(`[name="cvv"]`).prop('error')).toBe(
            'invalid_cvv'
          );
        });
      });
    });

    describe('allow chinesse characters', () => {
      test.each(['name', 'surname'])('on the %s field', name => {
        const onChange = jest.fn();
        const wrapper = shallow(<CardForm onChange={onChange} />);
        const stringWithChineseCharacters = 'hi 名';

        const target = { value: stringWithChineseCharacters, name };
        wrapper
          .find(`[name="${name}"]`)
          .dive()
          .find('input')
          .simulate('change', { target });

        expect(onChange).toHaveBeenCalledWith(
          name,
          stringWithChineseCharacters
        );
      });
    });
  });

  describe('onValidate', () => {
    test('executes onValidate callback on form validation before submit if no validation errors', () => {
      const onValidate = jest.fn();
      const onSubmit = jest.fn();

      const formValues = {
        name: 'a_name',
        surname: 'a_surname',
        cardNumber: '4111111111111111',
        expiryDate: '12/23',
        cvv: '555',
        cardType: 'VISA'
      };
      const wrapper = shallow(
        <CardForm onSubmit={onSubmit} onValidate={onValidate} />
      );
      fillField(wrapper, 'name', formValues.name);
      fillField(wrapper, 'surname', formValues.surname);
      fillField(wrapper, 'cardNumber', formValues.cardNumber);
      fillField(wrapper, 'expiryDate', formValues.expiryDate);
      fillField(wrapper, 'cvv', formValues.cvv);

      const form = wrapper.find('form');
      form.simulate('submit', { preventDefault: () => {} });

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
      const wrapper = shallow(
        <CardForm onSubmit={onSubmit} onValidate={onValidate} />
      );
      fillField(wrapper, 'name', formValues.name);
      fillField(wrapper, 'surname', formValues.surname);
      fillField(wrapper, 'expiryDate', formValues.expiryDate);
      fillField(wrapper, 'cvv', formValues.cvv);

      const form = wrapper.find('form');
      form.simulate('submit', { preventDefault: () => {} });

      expect(onValidate).toHaveBeenCalledTimes(1);
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    test('renders a submit button', () => {
      const wrapper = shallow(<CardForm />);

      expect(wrapper.find(Button)).toHaveLength(1);
    });

    test('executes onSubmit callback with form values when clicking on submit button', () => {
      const onSubmit = jest.fn();
      const formValues = {
        name: 'a_name',
        surname: 'a_surname',
        cardNumber: '4111111111111111',
        expiryDate: '12/23',
        cvv: '555',
        cardType: 'VISA'
      };
      const wrapper = shallow(<CardForm onSubmit={onSubmit} />);
      fillField(wrapper, 'name', formValues.name);
      fillField(wrapper, 'surname', formValues.surname);
      fillField(wrapper, 'cardNumber', formValues.cardNumber);
      fillField(wrapper, 'expiryDate', formValues.expiryDate);
      fillField(wrapper, 'cvv', formValues.cvv);

      const form = wrapper.find('form');
      form.simulate('submit', { preventDefault: () => {} });

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
      const wrapper = shallow(<CardForm onSubmit={onSubmit} />);
      fillField(wrapper, 'name', formValues.name);
      fillField(wrapper, 'surname', formValues.surname);
      fillField(wrapper, 'expiryDate', formValues.expiryDate);
      fillField(wrapper, 'cvv', formValues.cvv);

      const form = wrapper.find('form');
      form.simulate('submit', { preventDefault: () => {} });

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
      const wrapper = shallow(<CardForm onSubmit={onSubmit} />);
      fillField(wrapper, 'name', formValues.name);
      fillField(wrapper, 'surname', formValues.surname);
      fillField(wrapper, 'cardNumber', formValues.cardNumber);
      fillField(wrapper, 'expiryDate', formValues.expiryDate);
      fillField(wrapper, 'cvv', formValues.cvv);

      const form = wrapper.find('form');
      form.simulate('submit', { preventDefault: () => {} });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    test('does not render a cancel button if onCancel is not provided', () => {
      const wrapper = shallow(<CardForm />);

      expect(wrapper.find('Button [type="button"]')).toHaveLength(0);
    });

    test('renders a cancel button if onCancel is provided', () => {
      const onCancel = () => {};
      const wrapper = shallow(<CardForm onCancel={onCancel} />);

      expect(wrapper.find('Button[type="button"]')).toHaveLength(1);
    });

    test('calls onCancel when clicking on cancel button', () => {
      const onCancel = jest.fn();
      const wrapper = shallow(<CardForm onCancel={onCancel} />);

      const cancelButton = wrapper.find('Button[type="button"]');
      cancelButton.simulate('click');

      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    test('executes onChange callback when changing any form value', () => {
      const onChange = jest.fn();
      const fieldName = 'name';
      const fieldValue = 'a_name';
      const wrapper = shallow(<CardForm onChange={onChange} />);

      fillField(wrapper, fieldName, fieldValue);

      expect(onChange).toHaveBeenCalledWith(fieldName, fieldValue);
    });
  });

  describe('card number format', () => {
    test('format allows up to 19 digits if accepted card types include UnionPay', () => {
      const acceptedCards = ['VISA', 'MC', 'UNIONPAY'];
      const expectedFormat = {
        pattern: '....-....-....-....-...',
        shouldAddSeparatorBeforeTyping: false,
        allowedCharacters: /[0-9]*/g
      };

      const wrapper = shallow(<CardForm acceptedCards={acceptedCards} />);

      expect(wrapper.find(`[name="cardNumber"]`).prop('format')).toEqual(
        expectedFormat
      );
    });

    test('format allows up to 16 digits if accepted cards do not include UnionPay', () => {
      const acceptedCards = ['VISA', 'MC'];
      const expectedFormat = {
        pattern: '....-....-....-....',
        shouldAddSeparatorBeforeTyping: true,
        allowedCharacters: /[0-9]*/g
      };

      const wrapper = shallow(<CardForm acceptedCards={acceptedCards} />);

      expect(wrapper.find(`[name="cardNumber"]`).prop('format')).toEqual(
        expectedFormat
      );
    });

    test('updates card number format if acceptedCards prop changes', () => {
      const acceptedCards = ['VISA', 'MC'];
      const expectedFormat = {
        pattern: '....-....-....-....-...',
        shouldAddSeparatorBeforeTyping: false,
        allowedCharacters: /[0-9]*/g
      };

      const wrapper = shallow(<CardForm acceptedCards={acceptedCards} />);
      wrapper.setProps({ acceptedCards: ['VISA', 'UNIONPAY'] });

      expect(wrapper.find(`[name="cardNumber"]`).prop('format')).toEqual(
        expectedFormat
      );
    });
  });

  describe('optional fields', () => {
    test('does not render optional fields', () => {
      const optionalFields = ['expiryDate', 'cvv'];

      const wrapper = shallow(<CardForm optionalFields={optionalFields} />);

      expect(wrapper.find(`[name="expiryDate"]`)).toHaveLength(0);
      expect(wrapper.find(`[name="cvv"]`)).toHaveLength(0);
    });

    test('does not validate optinal fields on submit', () => {
      const optionalFields = ['expiryDate', 'cvv'];
      const onSubmit = jest.fn();
      const props = { onSubmit, optionalFields };
      const expectedSubmittedValues = {
        name: 'a_name',
        surname: 'a_surname',
        cardNumber: '4111111111111111',
        cardType: 'VISA'
      };

      const wrapper = shallow(<CardForm {...props} />);

      fillField(wrapper, 'name', 'a_name');
      fillField(wrapper, 'surname', 'a_surname');
      fillField(wrapper, 'cardNumber', '4111111111111111');

      const form = wrapper.find('form');
      form.simulate('submit', { preventDefault: () => {} });

      expect(onSubmit).toHaveBeenCalledWith(expectedSubmittedValues);
    });
  });
});

const fillField = (wrapper, name, value) => {
  wrapper.find(`[name="${name}"]`).simulate('change', name, value);
};

const blurField = (wrapper, name, value) => {
  wrapper.find(`[name="${name}"]`).simulate('blur', name, value);
};
