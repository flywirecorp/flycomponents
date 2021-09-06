function useTextField({
  'aria-describedby': ariaDescribedBy,
  disabled,
  error,
  hint,
  label,
  name,
  readOnly,
  required
} = {}) {
  return {
    inputAreaProps: {
      ...(hint || error || ariaDescribedBy
        ? {
            'aria-describedby': [
              ...(hint ? [`${name}-hint-msg`] : []),
              ...(error && typeof error === 'string'
                ? [`${name}-error-msg`]
                : []),
              ...(ariaDescribedBy ? [ariaDescribedBy] : [])
            ].join(' ')
          }
        : {}),
      ...(error ? { 'aria-invalid': true } : {}),
      ...(readOnly ? { 'aria-readonly': true } : {}),
      ...(disabled ? { 'aria-disabled': true } : {}),
      ...(required ? { 'aria-required': true } : {}),
      ...(label ? { 'aria-labelledby': `${name}-label` } : {})
    }
  };
}

export default useTextField;
