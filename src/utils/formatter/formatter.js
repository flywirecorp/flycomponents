export const applyPattern = (text, pattern, options = {}) => {
  if (!text || text.length === 0 || !pattern) return text

  const sanitizedText = text.replace(/\D/g, '')
  const defaults = { ignoreExcedingText: true }
  const settings = { ...defaults, ...options }

  const formattedObject = pattern.split('').reduce((acc, character) => {
    if (acc.remainingText.length === 0) {
      return acc
    }

    if (character !== '.') {
      return {
        formattedText: acc.formattedText + character,
        remainingText: acc.remainingText
      }
    }

    return {
      formattedText: acc.formattedText + acc.remainingText[0],
      remainingText: acc.remainingText.slice(1)
    }
  }, { formattedText: '', remainingText: sanitizedText.split('') })

  return settings.ignoreExcedingText
    ? formattedObject.formattedText
    : formattedObject.formattedText + formattedObject.remainingText.join('')
}
