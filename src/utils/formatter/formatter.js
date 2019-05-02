const FORMATTER_PATTERN_CHARACTER = '.';

export const format = (text, options = {}) => {
  if (!text || text.length === 0) return text;
  const defaults = { ignoreExcedingText: true, allowedCharacters: /.*/g };
  const settings = { ...defaults, ...options };

  const {
    allowedCharacters,
    pattern,
    ignoreExcedingText,
    shouldAddSeparatorBeforeTyping
  } = settings;

  const matchingChars = text.match(allowedCharacters);
  const sanitizedText = matchingChars ? matchingChars.join('') : '';

  if (!pattern) return sanitizedText;

  const formattedObject = pattern.split('').reduce(
    (acc, character) => {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== FORMATTER_PATTERN_CHARACTER) {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText
        };
      }

      return {
        formattedText: acc.formattedText + acc.remainingText[0],
        remainingText: acc.remainingText.slice(1)
      };
    },
    { formattedText: '', remainingText: sanitizedText.split('') }
  );

  let formattedText =
    formattedObject.formattedText + formattedObject.remainingText.join('');

  if (ignoreExcedingText) formattedText = formattedObject.formattedText;

  if (shouldAddSeparatorBeforeTyping)
    formattedText = applyNextSeparator(formattedText, pattern);

  return formattedText;
};

const applyNextSeparator = (text, pattern) => {
  const missingPatternChars = text.length < pattern.length;

  if (missingPatternChars) {
    const nextPatternChar = pattern[text.length];

    if (nextPatternChar !== FORMATTER_PATTERN_CHARACTER)
      text = `${text}${nextPatternChar}`;
  }

  return text;
};
