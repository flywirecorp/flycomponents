import useTextField from './useTextField';

describe('useTextField', function() {
  test('return no aria', function() {
    const { inputAreaProps } = useTextField({
      name: 'fuu'
    });

    expect(inputAreaProps).toEqual({});
  });

  test('aria-describedby attribute', function() {
    const { inputAreaProps } = useTextField({
      name: 'fuu',
      hint: 'this is the hint'
    });

    expect(inputAreaProps).toEqual({ 'aria-describedby': 'fuu-hint-msg' });
  });

  test('aria-invalid attribute', function() {
    const { inputAreaProps } = useTextField({
      name: 'fuu',
      hint: 'this is the hint',
      error: 'this is the error'
    });

    expect(inputAreaProps).toEqual({
      'aria-invalid': true,
      'aria-describedby': 'fuu-hint-msg fuu-error-msg'
    });
  });

  test('aria-readonly attribute', function() {
    const { inputAreaProps } = useTextField({
      name: 'fuu',
      readOnly: true
    });

    expect(inputAreaProps).toEqual({
      'aria-readonly': true
    });
  });

  test('aria-describedby', function() {
    const { inputAreaProps } = useTextField({
      'aria-describedby': 'fuu-custom-msg'
    });

    expect(inputAreaProps).toEqual({
      'aria-describedby': 'fuu-custom-msg'
    });
  });

  test('aria-disabled attribute', function() {
    const { inputAreaProps } = useTextField({
      disabled: true
    });

    expect(inputAreaProps).toEqual({
      'aria-disabled': true
    });
  });

  test('aria-required attribute', function() {
    const { inputAreaProps } = useTextField({
      required: true
    });

    expect(inputAreaProps).toEqual({
      'aria-required': true
    });
  });

  test('aria-labelledby attribute', function() {
    const { inputAreaProps } = useTextField({
      name: 'fuu',
      label: 'this is the label'
    });

    expect(inputAreaProps).toEqual({
      'aria-labelledby': 'fuu-label'
    });
  });
});
