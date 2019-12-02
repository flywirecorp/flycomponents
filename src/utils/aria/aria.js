export const getAriaDescribedBy = (name, ariaDescribedBy = '') => {
  const defaultAriaDescribedBy = `${name}-error-msg ${name}-hint-msg`;

  if (!ariaDescribedBy) return defaultAriaDescribedBy;

  return `${ariaDescribedBy} ${defaultAriaDescribedBy}`;
};
