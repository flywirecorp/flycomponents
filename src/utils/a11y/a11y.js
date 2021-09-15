export const getA11yStatusMessage = ({ isOpen, options, selectedOption }) => {
  const optionsClosed = !isOpen;

  if (optionsClosed) {
    return selectedOption ? `You have selected ${selectedOption}` : '';
  }

  const resultCount = options.length;

  if (resultCount === 0) {
    return 'No results are available';
  }

  return `${resultCount} ${
    resultCount === 1 ? 'result is' : 'results are'
  } available, use up and down arrow keys to navigate. Press Enter key to select or Escape key to cancel.`;
};
