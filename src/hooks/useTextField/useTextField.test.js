import useTextField from './useTextField';

describe('useTextField', function() {
  test('return no aria', function() {
    const { inputAriaProps } = useTextField({
      name: 'fuu'
    });

    expect(inputAriaProps).toEqual({});
  });

  test('aria-describedby attribute', function() {
    const { inputAriaProps } = useTextField({
      name: 'fuu',
      hint: 'this is the hint'
    });

    expect(inputAriaProps).toEqual({ 'aria-describedby': 'fuu-hint-msg' });
  });

  test('aria-invalid attribute', function() {
    expect(
      useTextField({
        name: 'fuu',
        hint: 'this is the hint',
        error: 'this is the error'
      }).inputAriaProps
    ).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'fuu-hint-msg fuu-error-msg'
    });

    expect(
      useTextField({
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
    const { inputAriaProps } = useTextField({
      name: 'fuu',
      readOnly: true
    });

    expect(inputAriaProps).toEqual({
      'aria-readonly': true
    });
  });

  test('aria-describedby', function() {
    const { inputAriaProps } = useTextField({
      'aria-describedby': 'fuu-custom-msg'
    });

    expect(inputAriaProps).toEqual({
      'aria-describedby': 'fuu-custom-msg'
    });
  });

  test('aria-disabled attribute', function() {
    const { inputAriaProps } = useTextField({
      disabled: true
    });

    expect(inputAriaProps).toEqual({
      'aria-disabled': true
    });
  });

  test('aria-required attribute', function() {
    const { inputAriaProps } = useTextField({
      required: true
    });

    expect(inputAriaProps).toEqual({
      'aria-required': true
    });
  });

  test('aria-labelledby attribute', function() {
    const { inputAriaProps } = useTextField({
      name: 'fuu',
      label: 'this is the label'
    });

    expect(inputAriaProps).toEqual({
      'aria-labelledby': 'fuu-label'
    });
  });
});
