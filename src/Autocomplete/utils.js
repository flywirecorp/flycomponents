export const escape = string => {
  return string.toString().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const createMarkup = string => {
  return { __html: string };
};
