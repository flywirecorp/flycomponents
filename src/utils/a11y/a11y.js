export const getA11yStatusMessage = ({ isOpen, options, selectedOption }) => {
  const optionsClosed = !isOpen;

  if (optionsClosed) {
    return selectedOption ? `You have selected ${selectedOption}` : '';
  }

  const optionCount = options.length;

  if (optionCount === 0) {
    return 'No options are available';
  }

  return `${optionCount} ${
    optionCount === 1 ? 'option is' : 'options are'
  } available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.`;
};
