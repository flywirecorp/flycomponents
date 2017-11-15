export const escape = string => {
  return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const createMarkup = string => {
  return { __html: string };
};
