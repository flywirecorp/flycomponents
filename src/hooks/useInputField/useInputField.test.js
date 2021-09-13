import useInputField from './useInputField';

describe('useInputField', function() {
  test('return no aria', function() {
    const { inputAriaProps } = useInputField({
      name: 'fuu'
    });

    expect(inputAriaProps).toEqual({});
  });

  test('aria-describedby attribute', function() {
    const { inputAriaProps } = useInputField({
      name: 'fuu',
      hint: 'this is the hint'
    });

    expect(inputAriaProps).toEqual({ 'aria-describedby': 'fuu-hint-msg' });
  });

  test('aria-invalid attribute', function() {
    expect(
      useInputField({
        name: 'fuu',
        hint: 'this is the hint',
        error: 'this is the error'
      }).inputAriaProps
    ).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'fuu-hint-msg fuu-error-msg'
    });

    expect(
      useInputField({
        name: 'fuu',
        hint: 'this is the hint',
        error: true
      }).inputAriaProps
    ).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'fuu-hint-msg'
    });
  });

  test('aria-readonly attribute', function() {
    const { inputAriaProps } = useInputField({
      name: 'fuu',
      readOnly: true
    });

    expect(inputAriaProps).toEqual({
      'aria-readonly': true
    });
  });

  test('aria-describedby', function() {
    const { inputAriaProps } = useInputField({
      'aria-describedby': 'fuu-custom-msg'
    });

    expect(inputAriaProps).toEqual({
      'aria-describedby': 'fuu-custom-msg'
    });
  });

  test('aria-disabled attribute', function() {
    const { inputAriaProps } = useInputField({
      disabled: true
    });

    expect(inputAriaProps).toEqual({
      'aria-disabled': true
    });
  });

  test('aria-required attribute', function() {
    const { inputAriaProps } = useInputField({
      required: true
    });

    expect(inputAriaProps).toEqual({
      'aria-required': true
    });
  });

  test('aria-labelledby attribute', function() {
    const { inputAriaProps } = useInputField({
      name: 'fuu',
      label: 'this is the label'
    });

    expect(inputAriaProps).toEqual({
      'aria-labelledby': 'fuu-label'
    });
  });
});
